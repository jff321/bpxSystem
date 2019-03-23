<template>
  <div>
    <div class="navigation">财务管理/财务明细</div>
    <div class="d-flex text-center">
      <!--账户余额-->
      <div class="mt-3 w-25 mr-4">
        <div class="shadow p-5">
          <p class="font-weight-bold">
            <img src="../../assets/purse.png" alt="" style="width: 35px;height: 35px;">
            账户余额
          </p>
          <p class="flow">{{flow}}</p>
        </div>
      </div>
      <!--累计充值金额-->
      <div class="mt-3 w-25">
        <div class="shadow p-5">
          <p class="font-weight-bold">
            <img src="../../assets/money.png" alt="" style="width: 35px;height: 35px;">
            累计充值金额
          </p>
          <p class="flow">{{flow}}</p>
        </div>
      </div>
    </div>
    <div class="mt-4">
      <el-select v-model="type" placeholder="请选择操作类型" class="mr-4">
        <el-option
          v-for="item in types"
          :key="item.type"
          :label="item.label"
          :value="item.type"
        >
        </el-option>
      </el-select>
      <el-date-picker
        class="mr-4"
        v-model="date"
        type="datetimerange"
        range-separator="-"
        :picker-options="pickerOptions"
        start-placeholder="开始提交日期"
        end-placeholder="结束提交日期"
        format="yyyy-MM-dd HH:mm:ss"
        value-format="yyyy-MM-dd HH:mm:ss"
        @change = "changeDate"
      >
      </el-date-picker>
      <el-button class="mx-4" type="primary">查询</el-button>
      <el-button class="mx-4" type="info">导出excel</el-button>
    </div>
    <!--表格-->
    <div class="mt-4">
      <el-table
        :data="list"
        stripe
        :loading="loading"
        style="width: 100%">
        <el-table-column
          prop="uname"
          label="用户"
        >
        </el-table-column>
        <el-table-column
          label="操作类型"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.types === 1">充值</span>
            <span v-else-if="scope.row.types === 2">退款</span>
            <span v-else-if="scope.row.types === 3">匹配</span>
            <span v-else-if="scope.row.types === 4">拨号</span>
            <span v-else-if="scope.row.types === 5">短信</span>
            <span v-else>闪信</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="b_money"
          label="操作前余额"
        >
        </el-table-column>
        <el-table-column
          prop="a_money"
          label="操作后余额"
        >
        </el-table-column>
        <el-table-column
          label="标识"
        >
          <template slot-scope="scope">
            <span>{{model = 1 ? '增加' : '减少'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
        >
        </el-table-column>
        <el-table-column
          prop="times"
          label="更新时间"
        >
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
  </div>
</template>

<script>
  import {
    finance
  } from '@/apis/finance'
  export default {
    name: "BoxList",
    data(){
      return{
        options1: [
          {
            value: '选项1',
            label: '余额充值'
          },
          {
            value: '选项2',
            label: '余额扣除'
          },
          {
            value: '选项3',
            label: '外呼扣款'
          },
          {
            value: '选项4',
            label: '短信扣款'
          },
          // {
          //   value: '选项5',
          //   label: '月租扣费'
          // },
          {
            value: '选项5',
            label: '线索匹配扣款'
          },
          {
            value: '选项6',
            label: '失败短信返还'
          },
          {
            value: '选项7',
            label: '失败线索返还'
          }
        ],
        value1: '全部',
        flow: 0,
        input: '',
        types: [
          {
            type: 1,
            label: '收入'
          },
          {
            type: 0,
            label: '支出'
          },
        ],
        type: '',
        start_time: '',
        end_time: '',
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
        date: '',
        currentPage: 1,
        pageSize: 10,
        total: 0,
        loading: true,
        list: [],
        editIndex: 0,
        editId: 0
      }
    },
    mounted(){
      this.getMoneyList();
    },
    methods: {
      async getMoneyList () {
        const result = await finance(this.input, this.type, this.start_time, this.end_time, this.currentPage, this.pageSize);
        this.loading = false;
        if(result.data.code === 200){
          this.list = result.data.data.list;
          this.total = result.data.data.count;
        } else {
          this.$status(result.data.msg);
        }
      },
      changeDate(val){
        this.start_time = val[0];
        this.end_time = val[1];
      },
      // 分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.getMoneyList()
      },
      handleCurrentChange(val) {
        console.log(`当前 ${val} 页`);
        this.currentPage = val;
        this.getMoneyList()
      },
    }
  }
</script>

<style scoped>
  .flow{
    font-weight: 400;
    color: rgb(0, 172, 214);
    font-size: 28px;
  }
</style>