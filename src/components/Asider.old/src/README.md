# ctcloud-share-ui

## 安装
```
npm install ctcloud-share-ui@0.2.3 --save
npm install element-ui --save
npm install alogic-http@0.1.13 --save
```

## 使用
```js
import http from 'alogic-http';
import 'ctcloud-share-ui/dist/ctclolud-share-ui.css';
import 'ctcloud-share-ui/dist/static/css/e-ui.scss';//element的css
import ct from 'ctcloud-share-ui';
Vue.use(ct,{ http: http });
```

```html
<ct-asider></ct-asider>
```

## 说明
改变element-ui其主题色
 ```css
 /*e-ui.scss */
$--color-primary: #f77f36;
$--font-path: '~element-ui/lib/theme-chalk/fonts';
@import "~element-ui/packages/theme-chalk/src/index";
```