<template>
  <div>
    <div class="navigation">短信闪信</div>
    <div>
      <el-input
        class="inputStyle mr-4 mt-3"
        placeholder="标题"
        v-model="inputMac"
        clearable>
      </el-input>
      <el-input
        class="inputStyle mr-4 mt-3"
        placeholder="签名"
        v-model="inputMac"
        clearable>
      </el-input>
      <el-input
        class="inputStyle mr-4 mt-3"
        placeholder="内容"
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
        placeholder="类型"
        v-model="inputMac"
        clearable>
      </el-input>
      <el-input
        class="inputStyle mr-4 mt-3"
        placeholder="状态"
        v-model="inputMac"
        clearable>
      </el-input>
      <el-date-picker
        class="mr-4 mt-3"
        v-model="date"
        type="daterange"
        range-separator="-"
        start-placeholder="开始提交日期"
        end-placeholder="结束提交日期">
      </el-date-picker>
      <el-date-picker
        class="mr-4 mt-3"
        v-model="date"
        type="daterange"
        range-separator="-"
        start-placeholder="开始修改日期"
        end-placeholder="结束修改日期">
      </el-date-picker>
      <el-button type="primary" class="mr-3 mt-3">查询</el-button>
      <el-button type="success" class="mt-3" @click="dialogFormVisible = true">新增短信模板</el-button>
    </div>
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
          style="width: 25%;"
          prop="address"
          label="状态"
        >
        </el-table-column>
        <el-table-column
          style="width: 25%;"
          prop="address"
          label="提交时间"
        >
        </el-table-column>
        <el-table-column
          style="width: 25%;"
          prop="address"
          label="修改时间"
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
    <!--新增对话框-->
    <div>
      <el-dialog title="添加短信模板" :visible.sync="dialogFormVisible" width="500px">
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item label="短信签名" prop="name" :label-width="formLabelWidth">
            <el-input v-model="form.name" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item label="短信标题" prop="title" :label-width="formLabelWidth">
            <el-input v-model="form.title" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item label="短信内容" prop="content" :label-width="formLabelWidth">
            <el-input
              type="textarea"
              :rows="4"
              style="width: 300px"
              v-model="form.content">
            </el-input>
            <p class="notice">营销内容发送格式：【短信签名】+短信内容+回复TD退订。营销内容不超过66个字符，支持英文格式的,.!?</p>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitSms('form')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Template",
    data(){
      return{
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
        ],
        dialogFormVisible: false,
        form: {
          name: '',
          title: '',
          content: ''
        },
        formLabelWidth: '120px',
        rules: {
          name: [
            { required: true, message: '请输入短信签名', trigger: 'blur' }
          ],
          title: [
            { required: true, message: '请输入短信标题', trigger: 'blur' }
          ],
          content: [
            { message: '营销内容发送格式：【短信签名】+短信内容+回复TD退订。营销内容不超过66个字符，支持英文格式的,.!?' },
            { required: true, message: '请输入短信内容', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      submitSms (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dialogFormVisible = false
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>

<style scoped>
  .notice{
    color: #f56c6c;
    font-size: 12px;
    line-height: 1.7;
    margin-bottom: 0px!important;
    padding-top: 4px;
    width: 300px;
  }
  .inputStyle{
    width: 15%;
  }
</style>