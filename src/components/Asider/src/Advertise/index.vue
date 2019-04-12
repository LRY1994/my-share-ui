/**
* @author: linruiyu;
* @date: 2019-4-1;
* @description: 广告位
*/
<template>
 <div class="ct-asider-ad"  v-if="expandURL!==''" @click="gotoHref">   
     <div class="ad-thumbnail">
         <img :src="data.iconPath">
     </div>
     <div class="ad-whole">
        <img :src="expandURL">
     </div>
 </div>

</template>
<script>
// 解析properties里面的json成对象
const parseResponse = (list) => {
  const result = [];
  list.forEach((element) => {
    const obj = element;
    let properties = {};
    try {
      properties = JSON.parse(obj.properties);
    } catch (e) { console.log(e); }

    Object.assign(obj, properties);
    result.push(obj);
  });
  return result;
};

import { HTTP$ } from '@/main.js'

export default {
  data() {
    return {
      data: {},
      expandURL: '',
      http$:HTTP$
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      const params = {
        topicId: 'ad',
        domainId: 'ad-banner',
      };
      this.http$.topic.getDomain(params).then((res) => {
        if(res.list.length>0){
          const tmp = parseResponse(res.list);     
          this.data = tmp[0];
          this.expandURL = `/gw/cms/material/icon/GetByFileId?fileId=${this.data.expand} `;
        }            
      });
    },
    gotoHref(){
      window.open(this.data.href);
    }
  },
};
</script>

<style lang="scss" scoped>
@import '../_var.scss';
$ad-whole-width:200;
.ct-asider-ad{
    margin-top: #{$margin-top}px;
    position: relative;
    height:#{$ad-height}px;
    box-shadow: 0px 8px 18px 1.44px rgba(0, 0, 0, 0.1);
    
    .ad-thumbnail{
      width:#{$asider-width}px;
      height:#{$ad-height}px;
      background: #fff;
      position: absolute;
      right: 0;
      img{
        width:100%;
        height: 100%;
      }
     }
     .ad-whole{
      width:0;
      height:#{$ad-height}px;
      position: absolute;
      right:0;
      overflow: hidden;
      transition: all 0.3s;
      
        img{
          width:#{$ad-whole-width}px;
          height:#{$ad-height}px;
        }
     }
      &:hover{
         cursor: pointer;
        .ad-whole{
          width:#{$ad-whole-width}px;
        }
      }
}
</style>
