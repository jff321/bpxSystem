<template>
  <div>
    <div class="navigation">客户管理/客户列表</div>
    <!--搜索-->
    <div class="mt-3">
      <div>
        <el-input
          class="w-25 mr-5"
          placeholder="商户名称/商户电话/商户联系人"
          v-model="inputName"
          clearable>
        </el-input>
        <el-button type="primary">查询</el-button>
        <el-button type="success" class="mx-4" @click="dialogFormVisible = true">新增</el-button>
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
          label="商户名称"
          style="width: 14.2%;"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="账户类型"
          style="width: 14.2%;"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="联系人"
          style="width: 14.2%;"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="联系方式"
          style="width: 14.2%;"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          style="width: 14.2%;"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="创建时间"
          style="width: 14.2%;"
        >
        </el-table-column>
        <el-table-column
          label="状态/操作"
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
      <el-dialog title="添加商户" :visible.sync="dialogFormVisible" width="550px">
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item label="联系人" prop="linkman" :label-width="formLabelWidth">
            <el-input v-model="form.linkman" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item label="账号" prop="phone" :label-width="formLabelWidth">
            <el-input v-model="form.phone" style="width: 300px"></el-input>
          </el-form-item>
          <!--<el-form-item label="账号类型" :label-width="formLabelWidth">-->
          <!--<el-radio-group v-model="form.radio">-->
          <!--<el-radio-button label="商户"></el-radio-button>-->
          <!--<el-radio-button label="普通代理商"></el-radio-button>-->
          <!--<el-radio-button label="高级代理商"></el-radio-button>-->
          <!--</el-radio-group>-->
          <!--</el-form-item>-->
          <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
            <el-input type="password" v-model="form.password" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item label="商户名称" prop="name" :label-width="formLabelWidth">
            <el-input v-model="form.name" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item label="所在地区" :label-width="formLabelWidth">
            <el-cascader
              size="large"
              :options="form.options"
              v-model="form.selectedOptions"
              @change="handleChange">
            </el-cascader>
          </el-form-item>
          <el-form-item label="详细地址" :label-width="formLabelWidth">
            <el-input v-model="form.address" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item label="是否外呼" :label-width="formLabelWidth">
            <!--<el-input v-model="form.address" style="width: 300px"></el-input>-->
            <el-switch
              v-model="form.isCall"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </el-form-item>
          <el-form-item label="短信单价" prop="message" :label-width="formLabelWidth">
            <el-input v-model="form.message" style="width: 300px"></el-input><span> 元/条</span>
          </el-form-item>
          <el-form-item label="外呼单价" prop="outCall" :label-width="formLabelWidth">
            <el-input v-model="form.outCall" style="width: 300px"></el-input><span> 元/分</span>
          </el-form-item>
          <el-form-item label="匹配单价" prop="match" :label-width="formLabelWidth">
            <el-input v-model="form.match" style="width: 300px"></el-input><span> 元/条</span>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitCostomer('form')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import { regionData } from 'element-china-area-data'
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
          linkman: '',
          phone: '',
          radio: '商户',
          password: '',
          name: '',
          options: regionData,
          selectedOptions: [],
          address: '',
          isCall: true,
          message: '',
          outCall: '',
          match: '',
          rent: ''
        },
        formLabelWidth: '120px',
        rules: {
          linkman: [
            { required: true, message: '请输入联系人', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入手机号码', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入账号密码', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入商户名称', trigger: 'blur' }
          ],
          message: [
            { required: true, message: '请输入短信单价', trigger: 'blur' }
          ],
          outCall:[
            { required: true, message: '请输入外呼单价', trigger: 'blur' }
          ],
          match:[
            { required: true, message: '请输入匹配单价', trigger: 'blur' }
          ],
          rent:[
            { required: true, message: '请输入号码月租价格', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      submitCostomer (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dialogFormVisible = false
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      handleChange (value) {
        console.log(value)
      }
    }
  }
</script>

<style scoped>
</style>