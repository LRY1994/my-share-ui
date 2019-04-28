# ctcloud-share-ui

## 安装
```
npm install ctcloud-share-ui --save
```

## 使用
一、侧边悬浮栏
```
import 'ctcloud-share-ui/dist/ctcloud-share-ui.css';
import ShareUI from 'ctcloud-share-ui';

Vue.use(ShareUI);

/* 如果有用到el-scrollbar,需指定容器选择器,例如 */
Vue.use(ShareUI,{
    container:"#app>.scrollbar-all>.el-scrollbar__wrap"
});

/*全局组件*/
<ct-asider></ct-asider>
```

二、建议与反馈模态框挂载

```
import 'ctcloud-share-ui/dist/ctcloud-share-ui.css';
import { Feedback } from 'ctcloud-share-ui';

<button @click="handleClick"></button>

 handleClick(){
    Feedback.init()
}
```