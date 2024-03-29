# 开始写代码

## 准备工作

在 index.html 中增加一个容器，即`<div id="app"></div>`

安装 jQuery `npm install jquery -save`

## 入口文件

新建`src/index.js`作为入口文件，内容如下

```js
import App from './demo/App.js'

let app = new App('app')
app.init()
```

## App.js

参考 App.js 的内容，注意要引入 jQuery

## ShoppingCart.js

参考 ShoppingCart.js 的内容。一开始`showCart`方法内容可不写，待`Cart`类创建完之后再补充

## GetCart.js

参考 GetCart.js 的内容，要说明这是一个单例。创建完之后，完善 ShoppingCart.js 的内容。

## List.js

参考 List.js 的内容。

在写`loadData`之前要先：

- 要先创建好`api/list.json`
- webpack-dev-server 的 proxy
- 另外要介绍 fetch 的使用
- 创建`config/config.js`

在没有`createItem`之前，可先不写`initItemList`的内容。

## Item.js

参考 Item.js 的内容。CreateItem.js 一开始可先不考虑折扣的功能，后面再补充。

完成之后补充 List.js 的遗留内容。

状态管理和增加日志，可先不写，后面单独讲。
****
## 状态管理

按钮状态管理，以及增加、删除购物车。记得`npm i javascript-state-machine --save`

## 模拟日志

增加、删除购物车时，增加日志功能。代码写在`util/log.js`中。

nodejs v6 及一下的需要`npm i babel-plugin-transform-decorators-legacy --save-dev`，以及修改`.babelrc`增加`plugin`配置。

## 补充折扣功能

完善 CreateItem.js 补充折扣功能
****