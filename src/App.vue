<template>
<div id="app">
  <router-view />
</div>
</template>

<script>
export default {
  data () {
    return {}
  },
  beforeMount () {
    const ua = window.navigator.userAgent.toLowerCase()
    if (ua.match(/micromessenger/i) || ua.match(/iphone/i) || ua.match(/ipad/i) || ua.match(/android/i) || ua.match(/mobile/i)) {
      // 开启移动端视图
      let pix = 1
      const width = document.documentElement.clientWidth || window.screen.availWidth || document.body.clientWidth
      pix = parseFloat(width / 375).toFixed(3)
      this.$store.commit('setPix', pix)
      pix = (pix * 12).toFixed(3)
      const $html = document.getElementsByTagName('html')
      if (!!$html && $html.length > 0) $html[0].style.fontSize = `${pix}px`
    } else {
      const $html = document.getElementsByTagName('html')
      const width = document.documentElement.clientWidth || window.screen.availWidth || document.body.clientWidth
      if (width > 1024 && !!$html && $html.length > 0) $html[0].style.fontSize = '24px'
    }
  }
}
</script>

<style>
#app {
  font-family: PingFang SC, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
