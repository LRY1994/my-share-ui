const SERVICE = {
  gw: {
    auth: ['Current'],
    user: [
      'VerifyImageCode', // 验证图片验证码 loginId(当前登录用户邮箱，必传)，code(验证码)
    ],
    worksheet: [
      'user/workflow/ListType', // 查看建议与反馈类型
      'user/ListAdvice', // 查询用户的建议与反馈草稿单信息
     // 上传用户附件
      {name: 'user/file/Upload', option: {method: 'post', transferType: 'multipart/form-data'}},
      'user/file/Delete', // 删除用户附件
      'user/from/Advice', // 新增反馈建议
      'user/extend/Update', // 更新用户反馈建议中每个属性
      'user/flow/Submit', // 提交建议
      'user/UpdateAdviceType', // 更新建议与反馈类型
      'ctyun/ListYun', // 查询关联工单
    ],
    topic: ['GetDomain'], // 获取广告位
  },
};


export default {
  SERVICE
}