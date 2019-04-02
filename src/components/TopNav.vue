<template>
  <div class="w-100 head d-flex justify-content-center align-items-center">
    <div class="d-flex flex-grow-1">
      <div class="headLogo d-flex justify-content-center align-items-center border-right" @click="toIndex">
        <img class="logo rounded" src="@/assets/logo.png" alt="LOGO">
      </div>
      <div class="company fontColor">
        <span>成都霸屏熊科技有限公司</span>
      </div>
    </div>
    <div class="mx-5">
      <el-dropdown>
        <span class="el-dropdown-link d-inline-block d-flex align-items-center fontColor" style="height: 65px;cursor: pointer">
         <i class="fa fa-rmb icon"></i> 账户余额 : {{balance}}元
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>短信单价：0.09元/条</el-dropdown-item>
          <el-dropdown-item>闪信单价：0.20元/分</el-dropdown-item>
          <el-dropdown-item>通话单价：0.12元/条</el-dropdown-item>
          <el-dropdown-item>匹配单价：0.10元/条</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="mr-5">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link d-inline-block d-flex align-items-center fontColor" style="height: 65px;cursor: pointer">
          <i class="fa fa-address-book-o icon"></i>{{mobile}}
        </span>
        <el-dropdown-menu slot="dropdown">
          <!--el-dropdown-item没有自定义click事件, 两个解决办法:
            1. 使用原生click事件 @click.native = "logout"
            2. 使用菜单项的指令事件
              @command="handleCommand"
              command="logout"
              handleCommand(command) {
                if (command === 'logout') {
                    this.logout()
                }
              }
          -->
          <el-dropdown-item command="basicInfo">基本信息</el-dropdown-item>
          <!--<el-dropdown-item>安全设置</el-dropdown-item>-->
          <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'topNav',
    data(){
      return {
        loginOutStatus : localStorage.getItem('token'),
        mobile: localStorage.getItem('mobile'),
        balance: localStorage.getItem('balance')
      }
    },
    methods: {
      handleCommand(command) {
        if (command === 'logout') {
          this.logout()
        }
        if (command === 'basicInfo') {
          this.basicInfo()
        }
      },
      logout () {
        this.$emit('listenLoginOut', this.loginOutStatus);
      },
      basicInfo () {
        this.$emit('listenBasicInfo', '基本信息');
      },
      toIndex(){
        this.$router.push({
          name: 'index'
        })
      }
    }
  };
</script>

<style scoped>
  .head{
    width: 100vw;
    background-color: #374254;
    color: #bfcbd9;
  }
  .headLogo{
    width: 200px;
    height: 35px;
    padding: 15px 0px;
  }
  .company{
    width: 200px;
    height: 35px;
    line-height: 35px;
    margin-left: 30px;
    font-size: 14px;
  }
  .logo{
    width: 50px;
    height: 50px;
  }
</style>