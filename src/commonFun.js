let commonFun = {};

commonFun.install = function (Vue) {
  // 未登录跳转
  Vue.prototype.$status = function (msg) {
    this.$message.error(msg);
  };
  // Vue.prototype.$confirmDialog = function () {
  //   this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
  //     confirmButtonText: '确定',
  //     cancelButtonText: '取消',
  //     type: 'warning'
  //   }).then(() => {
  //     this.$message({
  //       type: 'success',
  //       message: '删除成功!'
  //     });
  //   }).catch(() => {
  //     this.$message({
  //       type: 'info',
  //       message: '已取消删除'
  //     });
  //   });
  // }
};

export default commonFun;