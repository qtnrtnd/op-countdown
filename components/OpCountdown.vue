<template>
  <div id="op-countdown" :style="{'--card-bg-color': cardBgColor, '--card-txt-color': cardTxtColor, '--txt-color': txtColor, '--label-bg-color-1': labelBgColor1, '--label-bg-color-2': labelBgColor2 }">
    <p class="title">
      {{ title }}
    </p>
    <div class="countdown">
      <div v-for="(cardType, i) in cardTypes" :key="i" class="card-container">
        <op-number-card :type="cardType" :countdown="countdown" :animate="animate" :bus="bus" />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'CountdownComponent',
  props: {
    title: {
      type: String,
      default: 'Powered by Optic Performance 👓'
    },
    template: {
      type: String,
      default: 'dhms'
    },
    deadline: {
      type: Date,
      default: () => { return new Date(Date.now() + 10 * 24 * 60 * 60 * 1000) }
    },
    animate: {
      type: Boolean,
      default: true
    },
    cardBgColor: {
      type: String,
      default: '#2D475A'
    },
    cardTxtColor: {
      type: String,
      default: 'whitesmoke'
    },
    txtColor: {
      type: String,
      default: '#2D475A'
    },
    labelBgColor: {
      type: String,
      default: '#bababa'
    }
  },
  data: function () {
    return {
      cardTypes: this.template.split(''),
      countdown: Math.round((new Date(this.deadline).getTime() - Date.now()) / 1000),
      documentHidden: false,
      paused: false,
      ended: false,
      launchPause: null,
      mobile: null,
      bus: new Vue()
    }
  },
  computed: {
    labelBgColor1 () {
      return this.labelBgColor + '33'
    },
    labelBgColor2 () {
      return this.labelBgColor + '17'
    }
  },
  created () {
    if (process.browser) {
      this.worker = this.$worker.createTimerWorker()
      this.worker.addEventListener('message', this.workerResponseHandler)
      this.worker.postMessage({ subject: 'start', value: this.countdown })
    }
  },
  mounted () {
    const that = this
    document.addEventListener('visibilitychange', function () {
      if (!that.ended) {
        that.documentHidden = document.visibilityState !== 'visible'
        if (that.documentHidden) {
          function pause () {
            that.paused = true
            that.worker.postMessage({ subject: 'pause' })
          }
          that.mobile ? pause() : that.launchPause = setTimeout(pause, 1000)
        } else if (that.paused) {
          that.paused = false
          that.worker.postMessage({ subject: 'start' })
        } else {
          clearTimeout(that.launchPause)
        }
      }
    })
    // eslint-disable-next-line no-useless-escape
    this.mobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(navigator.userAgent || navigator.vendor || window.opera) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test((navigator.userAgent || navigator.vendor || window.opera).substr(0, 4))
  },
  methods: {
    workerResponseHandler: function (e) {
      if (e.data.subject === 'update') {
        this.countdown = e.data.value
      } else if (e.data.subject === 'immediate_render') {
        this.bus.$emit('immediate_render', e.data.value)
      } else if (e.data.subject === 'end') {
        this.bus.$emit('immediate_render', 0)
        this.ended = true
        this.$emit('countdownend')
      }
    }
  }
}
</script>

<style lang="scss">

  #op-countdown{
    display: flex;
    flex-direction: column;
    align-items: center;

    .countdown{
    display: flex;
    font-size: max(min(1.2vw, 1.1rem), 0.3rem);
  }

  .semi-card{
    p{
      color: var(--card-txt-color)
    }
    &.top{
      background-color: var(--card-bg-color);
      .p-container{
        opacity: 0.75;
      }
    }
    &.bottom{
      background: linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)),
      linear-gradient(var(--card-bg-color), var(--card-bg-color));
      .p-container{
        opacity: 0.9;
      }
    }
  }

  .label{
    color: var(--txt-color);
    background: linear-gradient(180deg, var(--label-bg-color-1), var(--label-bg-color-2));
  }

  .title{
    font-weight: 500;
    margin-bottom: 2rem;
    font-size: 3rem;
    color: var(--txt-color);
    margin-top: -2rem;
    text-align: center;
  }

  @media (max-width: 1180px) {
    .countdown{
      .label{
        text-transform: none;
        span{
          display: none;
        }
      }
    }
  }
  }

</style>
