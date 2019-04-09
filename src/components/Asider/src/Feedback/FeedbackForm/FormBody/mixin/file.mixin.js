export default {
  data(){
    return{
      file_error:''
    }
  },
  methods: {
    //上传附件
    uploadFile(event){
      const fileObj = event.target.files[0];
      if( this.beforeUpload(fileObj) ){
        const url = `/gw/worksheet/user/file/Upload?worksheetId=${this.worksheetId}`;
        var blob = new Blob([fileObj], {type: fileObj.type});
        let params = {
            file: blob,
            filename:fileObj.name,
            __option: {
                url: url
            }
        };

        this.http$.worksheet.userFileUpload(params).then(res=>{
          if(res.code){
            this.$ctmessage.error('上传失败,请稍后重试!');
          }else{
            this.fileList = res.fileList ;
          }
        });
      }
    },
    //删除完成
    removeDone(list){
      this.fileList = list;
    },
    // 上传之前检查类型和大小
    beforeUpload(file) {
      this.file_error = '';
      const isJPG = file.type === 'image/jpeg' || 
                    file.type === 'image/png' || 
                    file.type === 'image/gif';
      const isLt3M = file.size / 1024 / 1024 < 3.5;

      if (!isJPG) {
        this.file_error = '上传文件只能是 png/jpg/gif 格式!'
      }
      if (!isLt3M) {
        this.file_error = '上传文件大小不能超过 3.5MB!'
      }

      return isJPG && isLt3M;
    },
  },
};
