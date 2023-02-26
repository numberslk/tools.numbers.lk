<template>
  <div class="h-full pb-8 my-2 bg-gray-300 rounded-lg shadow-sm">
    <div style="text-align:center;padding:1em 0;">
      <h3>
        <a
          style="text-decoration:none;"
          href="https://www.zeitverschiebung.net/en/timezone/asia--colombo"
        ><span style="color:gray;">Current local time in</span><br>Asia/Colombo</a>
      </h3> <iframe
        src="https://www.zeitverschiebung.net/clock-widget-iframe-v2?language=en&size=medium&timezone=Asia%2FColombo"
        width="100%"
        height="115"
        frameborder="0"
        seamless
      />
    </div>
    <!-- <div class="pt-4 pl-4 text-sm font-bold">
      COVID-19
    </div>
    <div id="clock">
      <p class="date">
        {{ date }}
      </p>
      <p class="time">
        {{ time }}
      </p>
      <p class="text">
        DIGITAL CLOCK with Vue.js
      </p>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'ClockWidget',

  data() {
    return {
      week: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
      time: '',
      date: ''
    }
  },

  mounted() {
    //generate clock animations
    const timerID = setInterval(this.updateTime, 1000)
    this.updateTime()
  },

  methods: {
    updateTime() {
      var cd = new Date()
      this.time =
        this.zeroPadding(cd.getHours(), 2) +
        ':' +
        this.zeroPadding(cd.getMinutes(), 2) +
        ':' +
        this.zeroPadding(cd.getSeconds(), 2)
      this.date =
        this.zeroPadding(cd.getFullYear(), 4) +
        '-' +
        this.zeroPadding(cd.getMonth() + 1, 2) +
        '-' +
        this.zeroPadding(cd.getDate(), 2) +
        ' ' +
        this.week[cd.getDay()]
    },

    zeroPadding(num, digit) {
      var zero = ''
      for (var i = 0; i < digit; i++) {
        zero += '0'
      }
      return (zero + num).slice(-digit)
    }
  }
}
</script>
<style scoped>
</style>
