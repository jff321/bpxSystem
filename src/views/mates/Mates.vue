<template>
  <div>
    <div class="navigation">匹配列表</div>
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
          <div class="radartext">{{MatesTotal}}</div>
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
    <!--搜索-->
    <div class="mt-3">
      <div>
        <el-input
          class="inputStyle mr-4 mt-3"
          placeholder="请输入匹配名称/用户"
          v-model="input"
          clearable
          @keyup.enter.native="query"
        >
        </el-input>
        <el-date-picker
          class="mr-4"
          v-model="date"
          type="datetimerange"
          range-separator="-"
          :picker-options="pickerOptions"
          start-placeholder="开始创建日期"
          end-placeholder="结束创建日期"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          @change = "changeTimes"
        >
        </el-date-picker>
        <el-button type="primary" @click="query">查询</el-button>
        <el-button type="success" class="ml-4" @click="openAddDialog">新增人群包数据</el-button>
      </div>
    </div>
    <!--表格-->
    <div class="mt-3">
      <el-table
        :loading="loading"
        :data="list"
        stripe
        style="width: 100%">
        <el-table-column
          prop="name"
          label="匹配名称"
        >
        </el-table-column>
        <el-table-column
          prop="box_id"
          label="探知器盒子ID"
        >
        </el-table-column>
        <el-table-column
          prop="uname"
          label="用户"
        >
        </el-table-column>
        <el-table-column
          label="匹配数量"
        >
          <template slot-scope="scope">
            <span>{{scope.row.t_nums}}/{{scope.row.y_nums}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="距离范围"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.range_id===0">不限制</span>
            <span v-if="scope.row.range_id===1">50米内</span>
            <span v-if="scope.row.range_id===2">30米内</span>
            <span v-if="scope.row.range_id===3">10米内</span>
            <span v-if="scope.row.range_id===4">5米内</span>
          </template>
        </el-table-column>
        <el-table-column
          label="匹配状态"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.status===1">计算中</span>
            <span v-else>计算完成</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="money"
          label="扣费金额"
        >
        </el-table-column>
        <el-table-column
          prop="times"
          label="创建时间"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="update_time"
          label="完成时间"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="start_date"
          label="开始时间"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="end_date"
          label="结束时间"
          width="100"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          width="150"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleDetails(scope.row.id)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页-->
    <div class="float-right mt-3">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 40, 60, 80, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <!--新增对话框-->
    <el-dialog title="新增匹配" status-icon :visible.sync="addVisible" width="700px" center :before-close="handleAddClose">
      <el-form :model="addForm" :rules="addRules" ref="addForm">
        <el-form-item label="匹配名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="addForm.name" autocomplete="off" class="w-75"></el-input>
        </el-form-item>
        <el-form-item label="探知器盒子ID" :label-width="formLabelWidth" class="w-75">
          <el-select v-model="addForm.code" placeholder="请选择" @change="changeCode">
            <el-option
              v-for="item in addForm.codes"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="距离范围" :label-width="formLabelWidth" class="w-75">
          <el-select v-model="addForm.range" placeholder="请选择" @change="changeRange">
            <el-option
              v-for="item in addForm.ranges"
              :key="item.range"
              :label="item.label"
              :value="item.range"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="驻留时间" :label-width="formLabelWidth">
          <el-input placeholder="请输入最短时间" @change="changeMin" v-model="addForm.min_time" autocomplete="off" style="width: 42%;margin-right: 10px;">
            <template slot="prepend">最短(分)</template>
          </el-input>
          <el-input placeholder="请输入最长时间" @change="changeMax" v-model="addForm.max_time" autocomplete="off" style="width: 42%;">
            <template slot="prepend">最长(分)</template>
          </el-input>
        </el-form-item>
        <el-form-item label="筛选日期" :label-width="formLabelWidth" prop="date">
          <el-date-picker
            v-model="addForm.date"
            type="datetimerange"
            range-separator="-"
            :picker-options="pickerOptions"
            start-placeholder="开始筛选日期"
            end-placeholder="结束筛选日期"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            @change = "changeDate"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="预计匹配数量" :label-width="formLabelWidth" prop="y_nums">
          <span>{{addForm.y_nums}}</span>
        </el-form-item>
        <el-form-item label="预计扣费" :label-width="formLabelWidth" prop="y_nums">
          <span>{{addForm.money}}元(备注：实际扣费按匹配数量计算)</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addClose('addForm')">取 消</el-button>
        <el-button type="primary" @click="submitAdd('addForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Maps from '@/components/map/maps.vue'
  import {
    mates,
    boxs,
    addMates,
    getMayNums,
  } from '@/apis/mates'
  export default {
    components: {
      Maps
    },
    data(){
      return{
        MatesTotal:0,
        list: [],
        loading: true,
        id: '',
        input: '',
        date: [],
        start_date: '',
        end_date: '',
        currentPage: 1,
        pageSize: 10,
        total: 0,
        pickerOptions: {
          shortcuts: [
            {
              text: '最近一周',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
              }
            },
            {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
              }
            },
            {
              text: '最近三个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
              }
            }
          ]
        },
        formLabelWidth: '180px',
        addVisible: false,
        addForm: {
          name: '',
          min_time: 0,
          max_time: '不限',
          codes: [],
          code: '0',
          ranges: [
            {
              label: '不限',
              range: 0
            },
            {
              label: '50米内',
              range: 1
            },
            {
              label: '30米内',
              range: 2
            },
            {
              label: '10米内',
              range: 3
            },
            {
              label: '5米内',
              range: 4
            },
          ],
          range: 0,
          date: [],
          start_date: '',
          end_date: '',
          y_nums: 0,
          money: '0.00'
        },
        addRules: {
          name: [
            { required: true, message: '请输入匹配名称', trigger: 'blur' }
          ],
          date: [
            { required: true, message: '请输入筛选日期', trigger: 'blur' }
          ]
        }
      }
    },
    watch: {
      // 'addForm.date':function(newVal, oldVal) {
      //   console.log(newVal, oldVal);
      //   if(newVal === null) {
      //     this.addForm.date = [];
      //   }
      // },
    },
    async mounted(){
      this.getMatesList();
      this.getBoxs();
    },
    methods: {
      // 匹配列表
      async getMatesList(){
        const result = await mates(this.id, this.start_date, this.end_date, this.input, this.currentPage, this.pageSize);
        this.loading = false;
        if(result.data.code === 200){
          this.list = result.data.data.list;
          this.total = result.data.data.count;
        } else {
          this.$status(result.data.msg);
        }
      },
      // 获取盒子
      async getBoxs(){
        const result = await boxs();
        if(result.data.code === 200){
          result.data.data.forEach((item) => {
            this.addForm.codes.push({
              code: item.code,
              name: item.name
            })
          });
        } else {
          this.$status(result.data.msg);
        }
      },
      // 分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.getMatesList()
      },
      handleCurrentChange(val) {
        console.log(`当前 ${val} 页`);
        this.currentPage = val;
        this.getMatesList()
      },
      // 新增对话框
      openAddDialog(){
        this.addVisible = true;
        this.addForm.name = '';
        this.addForm.min_time = 0;
        this.addForm.max_time = '不限';
        this.addForm.date = [];
        this.addForm.y_nums = 0;
        this.addForm.money = '0.00';
      },
      // 新增确认框
      submitAdd(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = {
              name: this.addForm.name,
              box_id: this.addForm.code,
              range_id: this.addForm.range,
              min_time: this.addForm.min_time,
              max_time: this.addForm.max_time,
              start_date: this.addForm.start_date,
              end_date: this.addForm.end_date,
              y_nums: this.addForm.y_nums,
              money: this.addForm.money
            };
            addMates(params).then((result)=>{
              // console.log('result:', result);
              if(result.data.code === 200){
                this.getMatesList();
                this.$message({
                  message: result.data.msg,
                  type: 'success'
                });
                this.addVisible = false;
              } else {
                this.$status(result.data.msg);
              }
            });
          } else {
            return false;
          }
        });
      },
      // 新增弹框取消按钮
      addClose(formName){
        this.addVisible = false;
        this.$refs[formName].clearValidate();
      },
      // 新增弹框关闭按钮
      handleAddClose(){
        this.addClose('addForm');
      },
      async getMayData(){
        if(this.addForm.max_time === '不限'){
          this.addForm.max_time = ''
        }
        const result = await getMayNums(this.addForm.code, this.addForm.range, this.addForm.min_time, this.addForm.max_time, this.addForm.start_date, this.addForm.end_date);
        if(result.data.code === 200){
          this.addForm.y_nums = result.data.data.count;
        } else {
          this.$status(result.data.msg);
        }
        this.addForm.money = result.data.data.total;
      },
      // 筛选创建时间
      changeTimes(val){
        if(val.length > 0){
          this.start_date = val[0];
          this.end_date = val[1];
        }
      },
      // 新增筛选日期选择完之后触发
      changeDate(val){
        if(val.length > 0){
          this.addForm.start_date = val[0];
          this.addForm.end_date = val[1];
        }
        this.getMayData();
      },
      // 新增筛选感知器选择完之后触发
      changeCode(){
        if(this.addForm.date.length > 0){
          this.getMayData();
        } else {
          this.addForm.y_nums = 0;
          this.addForm.money = '0.00';
        }
      },
      // 新增筛选距离选择完之后触发
      changeRange(){
        if(this.addForm.date.length > 0){
          this.getMayData();
        } else {
          this.addForm.y_nums = 0;
          this.addForm.money = '0.00';
        }
      },
      // 新增最短时间填完之后触发
      changeMin(){
        if(this.addForm.date.length > 0){
          this.getMayData();
        } else {
          this.addForm.y_nums = 0;
          this.addForm.money = '0.00';
        }
      },
      // 新增最长时间填完之后触发
      changeMax(){
        if(this.addForm.date.length > 0){
          this.getMayData();
        } else {
          this.addForm.y_nums = 0;
          this.addForm.money = '0.00';
        }
      },
      // 查询
      async query(){
        this.getMatesList();
      },
      async handleDetails(id){
        this.$router.push({
          name: `details`,
          query: {
            id: id
          }
        })
      }
    }
  };
</script>

<style scoped>
  .inputStyle{
    width: 15%;
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