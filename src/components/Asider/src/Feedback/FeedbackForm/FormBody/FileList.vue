<template>
  <div>
    <div >
      <transition-group name="list" tag="ul">
       <li  v-for="(file,index) in list" :key="index" class="ct-upload-list__item-name">
           <span @click="handlePreview(file)"><i class="el-icon-document"></i>{{file.fileName}}</span>
           <span class="operation">
              <span @click="handlePreview(file)">预览</span>
              <a :href="file.url" :download="file.fileName">下载</a>
              <span @click="handleRemove(file)" >x</span>
           </span>
        </li>
      </transition-group>
            
         
     </div>

     <ct-dialog title="图片预览" v-show="previewing"
     width="600px"
     @before-close="previewing = false">
      <div class="preview-body">
        <img :src="previewingURL"/>
      </div>
    </ct-dialog>
  </div>
</template>

<script>
import CtDialog from '@/components/Dialog/index.vue'
export default { 
  components:{CtDialog},
  props:{
    fileList :{
      type:Array,
    },
    worksheetId:{type:String}
  },
  data(){
    return {
       http$:this.$root.http$,
      list:[],
      previewing:false,
      previewingURL:''
    }
  },
  watch :{
    fileList(){
      this.handle();
    }

  },
  created() {
    this.handle();
  },
  methods: {
    handle(){
      this.list  = this.fileList;
      this.list.forEach((item)=>{
        item.url = this.makeFileURL(item.worksheetFileId);
      })
    },
    // 下载附件
    makeFileURL(fileId) {
      return `/gw/worksheet/user/file/Download?worksheetFileId=${fileId}`;
    },
    handlePreview(file) {
      this.previewingURL="";
      this.previewing = true;
      this.previewingURL = file.url;
    },
    // 删除附件
    handleRemove(file) {
      this.http$.worksheet.userFileDelete({
        worksheetId: this.worksheetId,
        worksheetFileId: file.worksheetFileId,
      }).then(res=>{
        this.$emit('remove-done',res.fileList);
      });
    },
  },
 
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/_var.scss';
ul{
  margin:0;
  padding:0;
  p{
    margin:0;
    padding:0;
  }
  li{
    list-style: none;
    padding:5px 2px;
    &:hover{
      cursor: pointer;
      background:#ebeef5;  
      border-radius: 4px;
    }

  }
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to{
  opacity: 0;
  transform: translateY(-30px);
}
.ct-upload-list__item-name{
  .operation{
    float: right;

  >span,>a{
    font-size: 12px;
    text-decoration: none;
    padding: 6px;
    color:$ct-yellow;
    &:hover{
        cursor: pointer;
    }
  }
  }
}
.preview-body{
  width:100%;
  height: 400px;
  text-align: center;
  img{
    max-height:100%;
    max-width:100%;
    position: relative;
    top: 50%; 
    transform: translateY(-50%);
  }

}

</style>