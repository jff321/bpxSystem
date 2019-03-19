let commonFun = {};

commonFun.install = function (Vue) {
  // 未登录跳转
  Vue.prototype.$status = function (msg) {
    this.$message.error(msg);
  };
};

export default commonFun;