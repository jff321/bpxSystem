<template>
  <div>
    <div class="navigation">匹配列表</div>
    <div class="w-100 mt-3 d-flex justify-content-between">
      <!--数据营销余额-->
      <div class="w-25 mr-3">
        <div class="shadow p-5 text-center">
          <p class="font-weight-bold">
            累计匹配线索
            <el-tooltip
              effect="dark"
              placement="bottom"
            >
              <div slot="content">
                线索/短信收费标准：线索匹配0.13，
                <br/>
                元/条，短信发送0.05元/条
                <br/>
                <br/>
                外呼收费标准：月租费用15元/月，外
                <br/>
                呼费用0.12元/分钟
              </div>
              <i class="fa fa-tags icon text-secondary"></i>
            </el-tooltip>
          </p>
          <p class="flow">{{flow}}</p>
        </div>
      </div>
      <!--累计发送闪信-->
      <div class="w-25 mx-3">
        <div class="shadow p-5 text-center">
          <p class="font-weight-bold">
            累计发送闪信
          </p>
          <p class="flow">{{flow}}</p>
        </div>
      </div>
      <!--累计发送短信-->
      <div class="w-25 mx-3">
        <div class="shadow p-5 text-center">
          <p class="font-weight-bold">
            累计发送短信
          </p>
          <p class="flow">{{flow}}</p>
        </div>
      </div>
      <!--累计通话时长(分)-->
      <div class="w-25 ml-3">
        <div class="shadow p-5 text-center">
          <p class="font-weight-bold">
            累计通话时长(分)
          </p>
          <p class="flow">{{flow}}</p>
        </div>
      </div>
    </div>
    <!--搜索-->
    <div class="mt-3">
      <div>
        <el-input
          class="inputStyle mr-4 mt-3"
          placeholder="人群包名称"
          v-model="inputMac"
          clearable>
        </el-input>
        <el-input
          class="inputStyle mr-4 mt-3"
          placeholder="数据来源"
          v-model="inputMac"
          clearable>
        </el-input>
        <el-input
          class="inputStyle mr-4 mt-3"
          placeholder="代理商"
          v-model="inputMac"
          clearable>
        </el-input>
        <el-input
          class="inputStyle mr-4 mt-3"
          placeholder="用户"
          v-model="inputMac"
          clearable>
        </el-input>
        <el-input
          class="inputStyle mr-4 mt-3"
          placeholder="匹配状态"
          v-model="inputMac"
          clearable>
        </el-input>
        <el-input
          class="inputStyle mr-4 mt-3"
          placeholder="覆盖人数"
          v-model="inputMac"
          clearable>
        </el-input>
        <el-date-picker
          class="mr-4 mt-3"
          v-model="date"
          type="daterange"
          range-separator="-"
          start-placeholder="开始创建日期"
          end-placeholder="结束创建日期">
        </el-date-picker>
        <el-button type="primary">查询</el-button>
        <el-button type="success" class="ml-4" @click="addClues">新增人群包数据</el-button>
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
          label="人群包名称"
          style="width: 16.6%;"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="数据来源"
          style="width: 16.6%;"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="代理商"
          style="width: 16.6%;"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="用户"
          style="width: 16.6%;"
        >
        </el-table-column>
        <el-table-column
          style="width: 16.6%;"
          prop="address"
          label="匹配状态"
        >
        </el-table-column>
        <el-table-column
          style="width: 16.6%;"
          prop="address"
          label="覆盖人数"
        >
        </el-table-column>
        <el-table-column
          style="width: 16.6%;"
          prop="address"
          label="创建时间"
        >
        </el-table-column>
        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
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
  import { mates } from '@/apis/agents'
  export default {
    name: "CluesList",
    data(){
      return{
        flow: 0,
        inputMac: '',
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
        ]
      }
    },
    async mounted(){
    },
    methods: {
      addClues () {
        this.$router.push({
          name: 'addClues'
        })
      }
    }
  };
</script>

<style scoped>
  .flow{
    font-weight: 400;
    color: rgb(0, 172, 214);
    font-size: 28px;
  }
  .inputStyle{
    width: 15%;
  }
</style>