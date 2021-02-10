<template>
<div class="container">
  <!-- 俄罗斯大转盘 -->
  <div v-if="type=='roulette'">
    <div class="roulette">
      <div class="turntable" :style="{'height':`${_2r}rem`}">
        <div class="btn" @click="beginRotate()" v-if="prizeList.length>0">
          <img :src="btn" class="image" />
        </div>
        <div class="wrapper" :style="rotateStyle">
          <div class="item" v-for="(item,ind) in prizeList" :key="ind"
            :style="{'height':`${_2r}rem`,'transform':`rotate(-${(parseFloat(360/prizeList.length).toFixed(2))*parseFloat(ind + 1)}deg)`,'width':`${_r}rem`,'borderRadius':`0 ${_r}rem ${_r}rem 0`,'borderColor':openBorder?border:'rgba(0,0,0,0)'}">
            <div class="item-inner" :style="[{'height':`${_2r}rem`,'transform':`translateX(-${_r}rem) ${crotate('z')}`,'width':`${_r}rem`,'borderRadius':`${_r}rem 0 0 ${_r}rem`,'background':(ind+1)!=0 && (ind+1)%2!=0?odd:even}]">
              <div class="text" :style="[{'bottom':`${_pixr}rem`,'right':distance,'transform':`translate(${prizeList.length>=6?'47%':'43%'},${parseFloat(360/prizeList.length).toFixed(2)}%) ${crotate('f')}`}]">
                <div class="prize-pic">
                  <img :src="item.icon" class="img" />
                </div>
                <div class="prize-type">{{ item.prize_name }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 结果框 -->
  <div class="result-box">
  </div>
</div>
</template>

<script>
/**
type:抽奖类型 默认值：roulette(俄罗斯大转盘)
total:结果选项，该值必须为能整除360且大于1的整数 默认值：8
rotate:转动类型，默认为转盘转动
btn:抽奖按钮
r:半径
pl:原始奖品列表
even:偶数选项背景色
odd:奇数选项背景色
**/
// import { formatPix } from '@/utils/helper.js'
export default {
  name: 'LuckDraw',
  props: {
    type: {
      type: String,
      default: 'roulette'
    },
    total: {
      type: Number,
      default: 8
    },
    rotate: {
      type: Boolean,
      default: true
    },
    btn: {
      type: String,
      default: require('../assets/btn.png')
    },
    r: {
      type: Number,
      default: 240
    },
    pl: {
      type: Array,
      default: () => {}
    },
    even: {
      type: String,
      default: '#7DB9DE'
    },
    odd: {
      type: String,
      default: '#51A8DD'
    },
    border: {
      type: String,
      default: '#51A8DD'
    },
    openBorder: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      pix: 1.6,
      CIRCLE_ANGLE: 360,
      config: {
        // 总旋转时间
        duration: 4000,
        // 旋转圈数
        circle: 8,
        mode: 'ease-in-out'
      },
      isRotating: false,
      prize: null,
      ing: false,
      draw_id: 0,
      index: 0,
      duration: 3000, // 转盘旋转时间
      rotateAngle: 0, // 旋转角度
      angleList: [],
      prizeList: [],
      style: {}
    }
  },
  computed: {
    _r () {
      return this.r / 24
    },
    _2r () {
      return this.r * 2 / 24
    },
    _pixr () {
      return this.getPix * this.r / 24
    },
    crotate (type) {
      return (type) => {
        const deg = parseFloat(360 / this.prizeList.length).toFixed(2)
        if (type === 'z') {
          return `rotate(${deg}deg)`
        } else {
          return `rotate(-${(deg / 2).toFixed(2)}deg)`
        }
      }
    },
    distance () {
      // let z = parseFloat(this.r) - parseFloat(this.r / 4).toFixed(4);
      let z
      if (this.pLength < 4) {
        z = parseFloat(this.r * 0.32).toFixed(4)
      } else {
        z = parseFloat(this.r * 0.6).toFixed(4)
      }
      const pi = 0.01745
      let horn = parseFloat(parseFloat(360 / this.prizeList.length).toFixed(4) * pi).toFixed(4)
      horn = (parseFloat(horn) / 2).toFixed(4)
      let x
      if (this.prizeList.length >= 4) {
        x = parseFloat(z) * Math.sin(horn).toFixed(4)
      } else {
        x = parseFloat(z) * Math.tan(horn).toFixed(4)
      }
      // x = formatPix(x)
      return `${x / 24}rem`
    },
    pLength () {
      return this.prizeList.length
    },
    getPix () {
      return this.pix
    },
    rotateStyle () {
      const h = this.r * 2 / 24
      return `-webkit-transition: transform ${this.config.duration}ms ${this.config.mode};
      transition: transform ${this.config.duration}ms ${this.config.mode};
      -webkit-transform: rotate(${this.rotateAngle}deg);
      transform: rotate(${this.rotateAngle}deg);height:${h}rem;`
    }
  },
  created () {},
  mounted () {
    // do something after mounting vue instance
    this.initPrizeList(this.pl)
  },
  methods: {
    // 获取奖品信息准备旋转
    async beginRotate () {
      // ing，判断是否在抽奖中，如果抽奖中不允许点击
      if (!this.ing) {
        this.ing = true
        // 可以返回下标，也可以返回奖品 id，通过查询 奖品列表，最终得到下标
        // 随机获取下标
        this.index = this.random(this.prizeList.length - 1)
        // 开始旋转
        this.rotating()
      } else {
        alert('抽奖中，请稍后再试')
      }
    },
    random (max, min = 0) {
      return parseInt(Math.random() * (max - min + 1) + min)
    },
    // 旋转
    rotating () {
      // 计算角度
      const angle =
        // 初始角度
        this.rotateAngle +
        // 多旋转的圈数
        this.config.circle * this.CIRCLE_ANGLE +
        // 奖项的角度
        this.angleList[this.index] -
        (this.rotateAngle % this.CIRCLE_ANGLE)

      this.rotateAngle = angle
      // 旋转结束后，允许再次触发
      setTimeout(() => {
        this.rotateOver()
      }, this.config.duration + 1000)
    },
    rotateOver () {
      this.ing = false
      this.prize = this.prizeList[this.index]
      if (this.prize.isPrize) alert(`恭喜获得${this.prize.prize_name}`)
      else alert('肥肠抱歉，您没有获得奖项')
    },
    // 关闭弹窗
    closeToast () {
      this.prize = null
    },
    // 获取奖品
    async initPrizeList (list) {
      if (list.length <= 0) alert('暂无抽奖，敬请期待！')
      else {
        let a = []
        for (const val of list) {
          val.isPrize = 1
          // 目前分为3类奖品
          if (val.prize_type === 1) {
            val.icon = require('../assets/ssr.png')
          } else if (val.prize_type === 2) {
            val.icon = require('../assets/sr.png')
          } else if (val.prize_type === 3) {
            val.icon = require('../assets/r.png')
          }
          a.push(val)
        }
        // 自动填充谢谢惠顾
        a = this.pushThanks(a.length, a)
        this.prizeList = this.formatPrizeList(a)
      }
    },
    // 填充“谢谢惠顾”
    pushThanks (l, arr) {
      const a = JSON.parse(JSON.stringify(arr))
      if (l === 1 || l === 4 || l === 6) {
        for (let i = 0; i < 2; i++) {
          const no = {
            draw_id: '1',
            num: '-1',
            prize_id: '0',
            prize_name: '谢谢惠顾',
            prize_type: '-1',
            probable: (parseFloat(l + 2) / 100).toFixed(2),
            isPrize: 0
          }
          a.splice(a.length / (i + 1), 0, JSON.parse(JSON.stringify(no)))
        }
      } else if (l === 2 || l === 3 || l === 5 || l === 7) {
        for (let i = 0; i < 1; i++) {
          const no = {
            draw_id: '1',
            num: '-1',
            prize_id: '0',
            prize_name: '谢谢惠顾',
            prize_type: '-1',
            probable: (parseFloat(l + 1) / 100).toFixed(2),
            isPrize: 0
          }
          a.splice(a.length / (i + 1), 0, JSON.parse(JSON.stringify(no)))
        }
      }
      return a
    },
    // 格式化奖品列表，计算每个奖品的位置
    formatPrizeList (list) {
      // 记录每个奖的位置
      const angleList = []
      const l = list.length
      // 计算单个奖项所占的角度
      const average = this.CIRCLE_ANGLE / l
      const half = average / 2
      // 循环计算给每个奖项添加style属性
      list.forEach((item, i) => {
        // 每个奖项旋转的位置为 当前 i * 平均值 + 平均值 / 2
        const angle = -(i * average + half)
        // 增加 style
        item.style = `-webkit-transform: rotate(${angle}deg);
                  transform: rotate(${angle}deg);`
        // 记录每个奖项的角度范围
        angleList.push(i * average + half)
      })
      this.angleList = angleList
      return list
    },
    // 去领奖
    myPrize () {
      this.$emit('myPrize')
    }
  }
}
</script>

<style lang="scss" scoped>
$font-color-base:#E4E7ED;
*{
  box-sizing: border-box;
}
.roulette {
  width: 100%;
  overflow: hidden;
  .image{
    width: 100%;
  }
    .turntable {
        display: block;
        width: 100%;
        position: relative;
        .btn {
            position: absolute;
            top: calc(50% - 0.4583rem);
            left: 50%;
            transform: translate(-50%,-50%);
            width: 6.666rem;
            height: 6.666rem;
            z-index: 99;
        }
        .wrapper {
            position: relative;
            transform-origin: center;
            width: 100%;
        }
        .odd {
            background-color: #00A6AE;
        }
        .even {
            background-color: #ffffff;
        }
        .item {
            position: absolute;
            left: 50%;
            transform-origin: left center;
            overflow: hidden;
            border-right: 2px solid;
            .item-inner {
                text-align: center;
                transform-origin: right center;
                box-sizing: border-box;
                font-size: 1rem;
                color: #fff;
                position: relative;
                &::after {
                    content: "";
                    width: 100%;
                    height: 50%;
                    position: absolute;
                    left: 0;
                    top: 0;
                    border-right: 2px solid rgba(255,255,255,.2);
                    box-sizing: border-box;
                }
                .text {
                    display: block;
                    transform-origin: center;
                    height: 3.41666rem;
                    text-align: center;
                    position: absolute;
                    width: 100%;
                    .prize-pic .img {
                        width: 1.9166rem;
                        height: 1.9166rem;
                    }
                    .prize-type {
                        font-size: 1rem;
                    }
                }
            }
        }
    }
}
.result-box {
}
.martix-container {
    width: 100%;
    text-align: center;
}
img[src=""],img:not([src]){
      opacity:0;
 }
</style>
