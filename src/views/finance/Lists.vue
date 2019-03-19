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
    <div class="mt-3 d-flex">
      <div class="mr-4">
        <span style="font-size: 14px" class="mr-3">业务类型</span>
        <el-select v-model="value1" placeholder="请选择">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="mx-4">
        <span style="font-size: 14px" class="mr-3">操作类型</span>
        <el-select v-model="value2" placeholder="请选择">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="mx-4">
        <span style="font-size: 14px" class="mx-3">时间</span>
        <div class="d-inline-block">
          <el-date-picker
            v-model="date"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
      </div>
      <el-button class="mx-4" type="primary">查询</el-button>
      <el-button class="mx-4" type="info">导出excel</el-button>
    </div>
    <!--表格-->
    <div class="mt-3">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="date"
          label="操作类型"
          style="width: 16.6%;"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="操作来源"
          style="width: 16.6%;"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="操作金额（元）"
          style="width: 16.6%;"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="账户余额（元）"
          style="width: 16.6%;"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="说明"
          style="width: 16.6%;"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="更新时间"
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
        options2: [
          {
            value: '选项1',
            label: '收入'
          },
          {
            value: '选项2',
            label: '支出'
          }
        ],
        value2: '全部',
        date: '',
        tableData: [
          // {
          //   date: '2016-05-01',
          //   name: '王小虎',
          //   address: '上海市普陀区金沙江路 1519 弄'
          // },
          // {
          //   date: '2016-05-03',
          //   name: '王小虎',
          //   address: '上海市普陀区金沙江路 1516 弄'
          // },
          // {
          //   date: '2016-05-02',
          //   name: '王小虎',
          //   address: '上海市普陀区金沙江路 1518 弄'
          // },
          // {
          //   date: '2016-05-04',
          //   name: '王小虎',
          //   address: '上海市普陀区金沙江路 1517 弄'
          // },
          // {
          //   date: '2016-05-01',
          //   name: '王小虎',
          //   address: '上海市普陀区金沙江路 1519 弄'
          // },
          // {
          //   date: '2016-05-03',
          //   name: '王小虎',
          //   address: '上海市普陀区金沙江路 1516 弄'
          // },
          // {
          //   date: '2016-05-02',
          //   name: '王小虎',
          //   address: '上海市普陀区金沙江路 1518 弄'
          // },
          // {
          //   date: '2016-05-04',
          //   name: '王小虎',
          //   address: '上海市普陀区金沙江路 1517 弄'
          // },
          // {
          //   date: '2016-05-01',
          //   name: '王小虎',
          //   address: '上海市普陀区金沙江路 1519 弄'
          // },
          // {
          //   date: '2016-05-03',
          //   name: '王小虎',
          //   address: '上海市普陀区金沙江路 1516 弄'
          // }
        ],
        flow: 0,
      }
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