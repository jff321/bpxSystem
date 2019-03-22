let commonFun = {};

commonFun.install = function (Vue) {
  // 未登录跳转
  Vue.prototype.$status = function (msg) {
    this.$message.error(msg);
  };
  // 上传文件
  // Vue.prototype.$uploadFile = function (result) {
  //   if (result.code === 200) {
  //     this.addForm.licenceUrl = result.data.biz_url;
  //   } else {
  //     this.$status(result.msg);
  //   }
  // }
};

export default commonFun;