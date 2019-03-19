<template>
  <div>
    <div class="navigation">首页</div>
    <!--人群采集-->
    <div class="mt-3">
      <div class="maps">
        <!--<img src="https://s1.ax1x.com/2018/06/20/CzTjVs.png" alt="" style="width: 100%;height: 100%;">-->
        <maps :showBusiness="false" :showSearchBox="false" :model="false" :number="1"></maps>
        <!--
        changeData map组件传值必须
        showSearchBox   是否显示搜索框
        model      是否是显示模式 或者点击模式
        makers      参数形式
           [
             {
                 position: [121.5273285, 31.21515044]
             }
           ]
        number   每调用一次必须不同的数值
        lnglat   点击模式必须的参数，才能正常的传值 与 changeData组合
        -->
        <div class="maptop"></div>
        <div class="radar">
          <div class="radartext">{{total}}</div>
          <!--<transition-group tag="ul" name="fade">-->
          <!--<li  v-for="(items, index) in dataset" :key="index">-->
          <!--<div class="dot" :style="{left: items.left + 'px', top: items.right + 'px'}"></div>-->
          <!--</li>-->
          <!--</transition-group>-->

          <div class="circleone circle">
            <div class="circletwo circle"></div>
          </div>
        </div>
      </div>
    </div>
    <!--人流量-->
    <div class="mt-3 d-flex">
      <div class="shadow p-5 w-25 mr-4">
        <p class="font-weight-bold">
          今日访客(人)
          <el-tooltip
            effect="dark"
            placement="right"
          >
            <div slot="content">设备所探测到的所有数据，<br/>同一顾客同一天多次经过按一次计算</div>
          <i class="fa fa-tags icon text-secondary"></i>
          </el-tooltip>
        </p>
        <p class="flow">{{todayCustomer}}</p>
      </div>

      <div class="shadow p-5 w-25 mr-4">
        <p class="font-weight-bold">
          新访客(人)
          <el-tooltip
            effect="dark"
            placement="right"
          >
            <div slot="content">设备所探测到的所有数据，<br/>同一顾客同一天多次经过按一次计算</div>
            <i class="fa fa-tags icon text-secondary"></i>
          </el-tooltip>
        </p>
        <p class="flow">{{newCustomer}}</p>
      </div>

      <div class="shadow p-5 w-25">
        <p class="font-weight-bold">
          老访客(人)
          <el-tooltip
            effect="dark"
            placement="right"
          >
            <div slot="content">设备所探测到的所有数据，<br/>同一顾客同一天多次经过按一次计算</div>
            <i class="fa fa-tags icon text-secondary"></i>
          </el-tooltip>
        </p>
        <p class="flow">{{oldCustomer}}</p>
      </div>
    </div>
    <!--搜索-->
    <div class="mt-3">
      <div>
        <el-input
          class="w-25 mr-5"
          placeholder="请输入手机mac"
          v-model="inputMac"
          clearable>
        </el-input>
        <el-button type="primary">查询</el-button>
        <el-button type="info" disabled class="ml-3">导出</el-button>
      </div>
    </div>
    <!--表格-->
    <div class="mt-3">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          style="width: 33.3%;"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          style="width: 33.3%;"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="MAC地址"
        >
        </el-table-column>
      </el-table>
      <div class="mt-3 float-right">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="1000">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
// import {
//   test
// } from '@/apis/Index'
// import router from "../router";
import Maps from '../components/map/maps.vue'
export default {
  name: 'index',
  components: {
    Maps
  },
  data(){
    return{
      radio: '昨日',
      date: '',
      todayCustomer: 0,
      newCustomer: 0,
      oldCustomer: 0,
      inputMac: '',
      tableData: [],
      saveBinding:[], //首次保存的marker值
      markers:[], // 地图多点标记
      // {
      //     position: [121.5273285, 31.21515044]
      // }
      lnglat:[104.090933, 30.621318],
      dataset:[],
      total:0
    }
  },
  async mounted() {
  },
  methods: {
    // changeData(value){
    //   console.log('传过来的值:', value)
    // }
  }
};
</script>

<style scoped>
  .flow{
    font-weight: 400;
    color: rgb(0, 172, 214);
    font-size: 28px;
  }
  .maps{
    width:100%;
    height: 435px;
    /*padding: 10px 0;*/
    /*background-color:#EEEDDB ;*/
    /*background：url("http://picuser.city8.com/news/image/20141014/%B3%C9%B6%BC%BD%BB%CD%A8%B5%D8%CD%BC2014%B0%E6.jpg");*/
    /*overflow: hidden;*/
    position: relative;
  }
  .maptop{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.1);
  }
  .dot{
    position: absolute;
    z-index: 14;
    /*top: 100px;*/
    /*left: 100px;*/
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #29ea26;
  }
  .circleone{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 260px;
    height: 260px;
    margin: -130px 0 0 -130px;

  }
  .circletwo{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100px;
    height: 100px;
    margin: -50px 0 0 -50px;

  }
  .circle{
    border: 2px solid #169414;
    border-radius: 50%;
  }
  .radar {
    box-shadow: 0px 0px 30px #00ff33;
    background:-webkit-linear-gradient(90deg, rgba(12, 77, 11, 0.5) 49.5%, #4CA44B 50%, #4CA44B 50%, rgba(12, 77, 11, 0.5) 50.2%), -webkit-linear-gradient(0deg, rgba(12, 77, 11, 0.5) 49.5%, #29ea26 50%, #29ea26 50%, rgba(12, 77, 11, 0.5) 50.2%);
    /*background: linear-gradient(90deg, rgba(0, 128, 0, 0.6) 49.5%, #fff 50%, #fff 50%, rgba(0, 128, 0, 0.6) 50.2%), linear-gradient(0deg, rgba(0, 128, 0, 0.6) 49.5%, #fff 50%, #fff 50%, rgba(0, 128, 0, 0.6) 50.2%);*/
    width: 400px;
    height: 400px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    overflow: hidden;
  }
  .radartext{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 15;
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 400px;
    color: #fff;
    font-size: 70px;

  }
  .radar:after {
    content: ' ';
    display: block;
    background-image: linear-gradient(50deg, rgba(0, 255, 51, 0) 50%, #00ff33 100%);
    width: 50%;
    height: 50%;
    position: absolute;
    top: 0;
    left: 0;
    animation: radar-beam 5s infinite;
    animation-timing-function: linear;
    transform-origin: bottom right;
    border-radius: 100% 0 0 0;
    z-index: 16;
  }

  @keyframes radar-beam {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes blips {
    14% {
      background: radial-gradient(2vmin circle at 75% 70%, #ffffff 10%, #20ff4d 30%, rgba(255, 255, 255, 0) 100%);
    }
    14.0002% {
      background: radial-gradient(2vmin circle at 75% 70%, #ffffff 10%, #20ff4d 30%, rgba(255, 255, 255, 0) 100%), radial-gradient(2vmin circle at 63% 72%, #ffffff 10%, #20ff4d 30%, rgba(255, 255, 255, 0) 100%);
    }
    25% {
      background: radial-gradient(2vmin circle at 75% 70%, #ffffff 10%, #20ff4d 30%, rgba(255, 255, 255, 0) 100%), radial-gradient(2vmin circle at 63% 72%, #ffffff 10%, #20ff4d 30%, rgba(255, 255, 255, 0) 100%), radial-gradient(2vmin circle at 56% 86%, #ffffff 10%, #20ff4d 30%, rgba(255, 255, 255, 0) 100%);
    }
    26% {
      background: radial-gradient(2vmin circle at 75% 70%, #ffffff 10%, #20ff4d 30%, rgba(255, 255, 255, 0) 100%), radial-gradient(2vmin circle at 63% 72%, #ffffff 10%, #20ff4d 30%, rgba(255, 255, 255, 0) 100%), radial-gradient(2vmin circle at 56% 86%, #ffffff 10%, #20ff4d 30%, rgba(255, 255, 255, 0) 100%);
      opacity: 1;
    }
    100% {
      background: radial-gradient(2vmin circle at 75% 70%, #ffffff 10%, #20ff4d 30%, rgba(255, 255, 255, 0) 100%), radial-gradient(2vmin circle at 63% 72%, #ffffff 10%, #20ff4d 30%, rgba(255, 255, 255, 0) 100%), radial-gradient(2vmin circle at 56% 86%, #ffffff 10%, #20ff4d 30%, rgba(255, 255, 255, 0) 100%);
      opacity: 0;
    }
  }
</style>