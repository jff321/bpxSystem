<template>
  <div>
    <div class="navigation">盒子管理/盒子列表</div>
    <!--搜索-->
    <div class="mt-3">
      <div>
        <el-input
          class="inputStyle mr-4 mt-3"
          placeholder="盒子名称"
          v-model="inputName"
          clearable>
        </el-input>
        <el-input
          class="inputStyle mr-4 mt-3"
          placeholder="用户"
          v-model="inputName"
          clearable>
        </el-input>
        <el-input
          class="inputStyle mr-4 mt-3"
          placeholder="探针编号"
          v-model="inputName"
          clearable>
        </el-input>
        <el-input
          class="inputStyle mr-4 mt-3"
          placeholder="探针sim编号"
          v-model="inputName"
          clearable>
        </el-input>
        <el-input
          class="inputStyle mr-4 mt-3"
          placeholder="探针sim编号"
          v-model="inputName"
          clearable>
        </el-input>
        <div class="d-inline-block mr-4">
          <el-date-picker
            v-model="date"
            type="daterange"
            range-separator="-"
            start-placeholder="开始创建日期"
            end-placeholder="结束创建日期">
          </el-date-picker>
        </div>
        <el-button class="mt-3" type="primary">查询</el-button>
        <el-button type="success" class="mx-4 mt-3" @click="dialogFormVisible = true">新增</el-button>
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
          label="盒子编号"
          style="width: 20%;"
        >
        </el-table-column>
        <el-table-column
          prop="date"
          label="盒子名称"
          style="width: 20%;"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="用户"
          style="width: 20%;"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="探针编号"
          style="width: 20%;"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="探针sim编号"
          style="width: 20%;"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="状态"
          style="width: 20%;"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="创建时间"
          style="width: 20%;"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作"
          style="width: 20%;"
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
    <!--新增对话框-->
    <div>
      <el-dialog title="添加盒子" :visible.sync="dialogFormVisible" width="500px">
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item label="盒子名称" prop="name" :label-width="formLabelWidth">
            <el-input v-model="form.name" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item label="盒子ID" prop="code" :label-width="formLabelWidth">
            <el-input v-model="form.code" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item label="探针sim编号" prop="code" :label-width="formLabelWidth">
            <el-input v-model="form.code" style="width: 300px"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitBox('form')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    name: "BoxList",
    data(){
      return{
        inputName: '',
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
        dialogFormVisible: false,
        form: {
          name: '',
          code: '',
          address: '',
          remark: ''
        },
        formLabelWidth: '120px',
        rules: {
          name: [
            { required: true, message: '请输入盒子名称', trigger: 'blur' }
          ],
          code: [
            { required: true, message: '请输入设备码', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      submitBox (formName) {
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