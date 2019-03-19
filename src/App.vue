<template>
  <div id="app">
    <el-container v-if="$route.meta.requireAuth">
      <el-header class="fixed-top">
        <TopNav @listenLoginOut="listenLoginOut"></TopNav>
      </el-header>
      <el-container style="padding-top: 65px;">
        <el-aside width="200px">
          <LeftNav></LeftNav>
        </el-aside>
        <!--<el-main-->
          <!--v-if="$route.path==='/index'"-->
          <!--class="mainMap"-->
          <!--:style={height:leftHeight}-->
        <!--&gt;-->
          <!--<router-view></router-view>-->
        <!--</el-main>-->
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
    <!--<login v-else v-on:listenToLogin="showLogin"></login>-->
  </div>
</template>

<script>
  import LeftNav from '@/components/LeftNav.vue'
  import TopNav from '@/components/TopNav.vue'

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
    computed: {
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
      console.log('路径', this.$route.meta);
    },
    methods: {
      listenLoginOut (res) {
        if (res === true) {
          this.$confirm('确定退出?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            localStorage.clear();
            // location.reload();
            this.$router.push({
              path: '/login'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消操作'
            });
          });
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
