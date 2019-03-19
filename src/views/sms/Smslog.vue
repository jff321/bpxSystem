<template>
  <div>
    <div class="navigation">短信管理/信息发送记录</div>
    <div class="mt-3">
      <!--<el-select class="mr-4" v-model="value" placeholder="请选择模板">-->
      <!--<el-option-->
      <!--v-for="item in options"-->
      <!--:key="item.value"-->
      <!--:label="item.label"-->
      <!--:value="item.value">-->
      <!--</el-option>-->
      <!--</el-select>-->
      <el-input
        class="mr-4"
        style="width: 200px"
        placeholder="标题"
        v-model="inputPhone">
      </el-input>
      <el-input
        class="mr-4"
        style="width: 200px"
        placeholder="签名"
        v-model="inputPhone">
      </el-input>
      <el-input
        class="mr-4"
        style="width: 200px"
        placeholder="内容"
        v-model="inputPhone">
      </el-input>
      <el-input
        class="mr-4"
        style="width: 200px"
        placeholder="用户"
        v-model="inputPhone">
      </el-input>
      <el-input
        class="mr-4"
        style="width: 200px"
        placeholder="类型"
        v-model="inputPhone">
      </el-input>
      <el-date-picker
        class="mr-4"
        v-model="date"
        type="daterange"
        range-separator="-"
        start-placeholder="开始发送日期"
        end-placeholder="结束发送日期">
      </el-date-picker>
      <el-date-picker
        class="mr-4 mt-3"
        v-model="date"
        type="daterange"
        range-separator="-"
        start-placeholder="到达/失败日期"
        end-placeholder="到达/失败日期">
      </el-date-picker>
      <el-input
        class="mr-4"
        style="width: 200px"
        placeholder="备注"
        v-model="inputPhone">
      </el-input>
      <el-button class="mx-4" type="primary">查询</el-button>
    </div>
    <!--表格-->
    <div class="mt-3">
      <!--表格-->
      <div class="mt-3">
        <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column
            prop="date"
            label="标题"
            style="width: 25%;"
          >
          </el-table-column>
          <el-table-column
            prop="date"
            label="签名"
            style="width: 25%;"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="内容"
            style="width: 25%;"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="用户"
            style="width: 25%;"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="类型"
            style="width: 25%;"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="发送时间"
            style="width: 25%;"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="到达/失败时间"
            style="width: 25%;"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="备注"
            style="width: 25%;"
          >
          </el-table-column>
          <el-table-column
            style="width: 25%;"
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
    name: "Sms",
    data() {
      return {
        inputPhone: '',
        date: '',
        options: [
          // {
          //   value: '选项1',
          //   label: '黄金糕'
          // },
          // {
          //   value: '选项2',
          //   label: '双皮奶'
          // },
          // {
          //   value: '选项3',
          //   label: '蚵仔煎'
          // },
          // {
          //   value: '选项4',
          //   label: '龙须面'
          // },
          // {
          //   value: '选项5',
          //   label: '北京烤鸭'
          // }
        ],
        value: '',
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
        ]
      }
    }
  }
</script>

<style scoped>

</style>