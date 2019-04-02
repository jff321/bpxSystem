let commonFun = {};

commonFun.install = function (Vue) {
  // 未登录跳转
  Vue.prototype.$status = function (msg) {
    this.$message.error(msg);
  };

  Vue.prototype.$noAuth = function (msg) {
    this.$alert(msg, '提示', {
      confirmButtonText: '确定',
      type: 'warning',
      callback: () => {
        localStorage.clear();
        this.$router.push({
          name: 'login'
        })
      }
    });
  }
};

export default commonFun;