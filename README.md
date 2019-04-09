# ctcloud-share-ui

## 安装
```
npm install ctcloud-share-ui --save
```

## 使用
```js
import 'ctcloud-share-ui/dist/ctcloud-share-ui.css';
import ShareUI from 'ctcloud-share-ui';
Vue.use(ShareUI);
/* 如果有用到el-scrollbar,需指定容器选择器 */
Vue.use(ShareUI,{
    container:"#app>.scrollbar-all>.el-scrollbar__wrap"
});
```

```html
<ct-asider></ct-asider>
```
