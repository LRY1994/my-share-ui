export default {
  methods: {
    // 上传附件
    fileSetter() {
      return `/gw/worksheet/user/file/Upload?worksheetId=${this.worksheetId}`;
    },
    // 下载附件
    fileGetter(fileId) {
      return `/gw/worksheet/user/file/Download?worksheetFileId=${fileId}`;
    },
    // 文件列表信息
    getFileList() {
      return Promise.resolve(this.fileList);
    },
    // 删除附件
    handleRemove(fileId) {
      return this.http$.worksheet.userFileDelete({
        worksheetId: this.worksheetId,
        worksheetFileId: fileId,
      });
    },
    // 上传之前检查类型和大小
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
      const isLt3M = file.size / 1024 / 1024 < 3.5;

      if (!isJPG) {
        this.$message.error('上传文件只能是 png/jpg/gif 格式!');
      }
      if (!isLt3M) {
        this.$message.error('上传文件大小不能超过 3.5MB!');
      }
      return isJPG && isLt3M;
    },
  },
};
