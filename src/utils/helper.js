export function formatPix (rpx) {
  let px = rpx
  const ua = window.navigator.userAgent.toLowerCase()
  if (ua.match(/micromessenger/i) || ua.match(/iphone/i) || ua.match(/ipad/i) || ua.match(/android/i) || ua.match(/mobile/i)) {
    // 开启移动端视图
    const width = document.documentElement.clientWidth || window.screen.availWidth || document.body.clientWidth
    // pix = parseFloat(width / 375).toFixed(3)
    px = Number(rpx) / 750 * width
  }
  return px
}
