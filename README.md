# luck-draw

一个简单的vue转盘抽奖。适配特定范围内的奖品数量。目前仅允许添加不小于1且不大于8个的奖品数量，同时8个以下数量的奖品将自动添加不少于一个的“谢谢惠顾”奖项。

因为之前工作项目里需要去实现这样一个功能，于是乎参考了网上各位大佬们的思路，然后自己去做了一个整合处理，仅供交流学习使用。

可以调优的地方很多，现在水平太菜所以就随缘更新吧。

代码思路来源于github上的 [lucky_wheel](https://github.com/landluck/lucky_wheel)

做了根据奖品动态绘制转盘的处理。转盘绘制参考了掘金里面这位大佬的思路。 [教程|在微信小程序实现一个幸运转盘小游戏](https://juejin.cn/post/6893705980085796872)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
