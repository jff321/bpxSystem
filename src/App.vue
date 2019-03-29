<template>
  <div id="app">
    <el-container v-if="$route.meta.requireAuth">
      <el-header class="fixed-top">
        <TopNav @listenLoginOut="listenLoginOut" @listenBasicInfo="listenBasicInfo"></TopNav>
      </el-header>
      <el-container style="padding-top: 65px;">
        <el-aside width="200px">
          <LeftNav></LeftNav>
        </el-aside>
        <el-main
          class="main"
          :style={height:leftHeight}
        >
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
    <el-container v-else>
      <router-view></router-view>
    </el-container>
  </div>
</template>

<script>
  import LeftNav from '@/components/LeftNav.vue'
  import TopNav from '@/components/TopNav.vue'
  import {logout} from "@/apis/login";

  export default {
    name: 'App',
    data(){
      return {
        leftHeight: 0,
      }
    },
    components:{
      LeftNav,
      TopNav
    },
    watch: {
    },
    mounted () {
      this.leftHeight = (document.documentElement.clientHeight - 65) + 'px';
      if (!localStorage.getItem('token')){
        this.$router.push({
          name: 'login'
        });
      }
    },
    methods: {
      listenLoginOut (res) {
        if (res) {
          this.$confirm('确定退出?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            logout(res).then(result => {
              // console.log('result:', result);
              if(result.data.code === 200){
                this.$message({
                  type: 'success',
                  message: result.data.msg
                });
                localStorage.clear();
                // location.reload();
                this.$router.push({
                  path: '/login'
                });
              } else {
                this.$status(result.data.msg);
              }
            });

          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消操作'
            });
          });
        }
      },
      listenBasicInfo (data) {
        if (data) {
         this.$router.push({name: 'basicInfo'});
        }
      }
    }
  }
</script>

<style lang="scss">
  .el-header{
    padding: 0px!important;
  }
  .main{
    background-color: #f8f8f8;
    padding: 10px 20px 20px 20px!important;
  }
  .mainMap{
    background-color: #f8f8f8;
    padding: 0px!important;
  }
</style>
