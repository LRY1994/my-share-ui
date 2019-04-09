<template>
  <el-form-item v-if="display"
  :label="label"
  :prop="prop"
  :rules="rules"
  :ref="formItemRef">

    <div v-if="!disabled">
      <el-upload :ref="prop"  multiple
          :action="config.setter()"
          :before-upload="config.beforeUpload"
          :on-success="handleSuccess"
          :on-remove="handleRemove"
          :on-preview="handlePreview">
          <el-button size="small" type="primary">选择附件</el-button>
          <div slot="tip" class="el-upload__tip">{{item[KEYS.TOOLTIPS]}}</div>
      </el-upload>
    </div>

     <ul class="el-upload-list el-upload-list--text" :class="{'plain':disabled}">
       <li tabindex="0" class="el-upload-list__item"
       v-for="(file,index) in fileList" :key="index">
         <span class="el-upload-list__item-name">
           <i class="el-icon-document"></i>{{file.name}}
           <span class="operation">
              <span @click="handlePreview(file)">预览</span>
              <a :href="file.url" :download="file.name">下载</a>
              <span @click="handleRemove(file)" v-if="!disabled"><i class="el-icon-close"></i></span>
           </span>
        </span>
        </li>
     </ul>

     <el-dialog title="图片预览" :visible.sync="previewing"
     append-to-body
     @close="previewing = false">
      <div class="preview-body">
        <img :src="previewingURL"/>
      </div>
    </el-dialog>
  </el-form-item>

</template>

<script>
import mixin from '../editor.mixin';

export default {
  mixins: [mixin],
  name: 'alogic-filelist',
  data() {
    return {
      fileList: [],
      previewing: false, // 正在预览
      previewingURL: '',
    };
  },
  watch: {
    previewing(val) {
      if (val === false) {
        this.previewingURL = '';
      }
    },
  },
  methods: {
    setFileList(data) {
      const tmp = [];
      data.forEach((ele) => {
        tmp.push({
          name: ele.fileName,
          url: this.config.getter(ele.worksheetFileId),
          id: ele.worksheetFileId,
        });
      });
      this.fileList = tmp;
    },
    handleSuccess(res) {
      if (res.code === 'core.ok') {
        // 清除上传的队列
        this.$refs[this.prop].clearFiles();

        this.setFileList(res.data.fileList);

        this.emitChange(res.data.fileList);

        if (this.config.setterCallback) {
          this.config.setterCallback(this.item);
        }

        if (this.$refs[this.formItemRef]) {
          this.$refs[this.formItemRef].clearValidate();
        }
      } else {
        this.setFileList(this.fileList);
        this.$message.error('上传失败，请稍后再试！');
      }
    },
    handleRemove(file) {
      this.config.handleRemove(file.id).then((res) => {
        this.setFileList(res.fileList);
      });
    },
    handlePreview(file) {
      this.previewing = true;
      this.previewingURL = file.url;
    },
    getValue() {
      // item.value即fileId存在，再获取fileId的信息
      if (this.item.value) {
        this.config.getFileList().then((res) => {
          this.setFileList(res);
          this.emitChange(res);
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/_var.scss';
/deep/ .el-upload__tip{
  position: absolute;
    top: -5px;
    left: 100px;
}
.el-upload-list__item-name{
  margin-right: 0;
  .operation{
    float: right;

  >span,>a{
    font-size: 0.9em;
    text-decoration: none;
    padding: 6px;
    color:$ct-yellow;
    &:hover{
        cursor: pointer;
    }
    i{
      color: inherit;
      display: inline;
      position: relative;
      top:0;
      right: 0;
    }
  }
  }
}
.preview-body{
  width:100%;
  text-align: center;
  img{
    max-height:100%;
    max-width:100%
  }

}
</style>
