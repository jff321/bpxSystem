<template>
  <div>
    <div class="my-3">
      <el-input class="w-25" v-model="input" placeholder="请输入登录账号/公司名称/联系人" @keyup.enter.native="query"></el-input>
      <el-button type="primary" class="mx-3" @click="query">查询</el-button>
    </div>
    <!--代理列表-->
    <el-table
      class="mt-3"
      v-loading="loading"
      :data="list"
      :default-sort = "{prop: 'date', order: 'descending'}"
      style="width: 100%">
      <el-table-column
        prop="mobile"
        label="登录账号"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="balance"
        label="账户余额"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="company"
        label="公司名称"
        sortable
        >
      </el-table-column>
      <el-table-column
        prop="contact"
        label="联系人"
        sortable
        >
      </el-table-column>
      <el-table-column
        prop="contact"
        label="短信"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="contact"
        label="闪信"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="contact"
        label="外呼"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="contact"
        label="拨号"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="times"
        label="创建时间"
        sortable
        width="180"
      >
      </el-table-column>
      <el-table-column
        label="状态"
        sortable
      >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            :active-value= "1"
            :inactive-value= "0"
            @change="changeStatus(scope.row.id, scope.row.status)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250">
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
    <!--代理分页-->
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
    <!--编辑对话框-->
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {agents, change} from "../../apis/agents";

  export default {
    name: "agents",
    data(){
      return {
        tempList: [],
        list: [],
        loading: true,
        currentPage: 1,
        pageSize: 10,
        total: 0,
        input: '',
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px'
      }
    },
    async mounted(){
      this.getDataList();
    },
    methods: {
      async getDataList(){
        const result = await agents(this.input, this.currentPage, this.pageSize);
        this.loading = false;
        if(result.data.code === 200){
          this.list = result.data.data.list;
          this.tempList = result.data.data.list;
          this.total = result.data.data.count;
        } else {
          this.$status(result.data.msg);
        }
      },
      async query(){
        this.getDataList()
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.getDataList()
      },
      handleCurrentChange(val) {
        console.log(`当前 ${val} 页`);
        this.currentPage = val;
        this.getDataList()
      },
      handleEdit(index, row) {
        console.log(index, row);
        this.dialogFormVisible = true
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      async changeStatus(id, status){
        let params = {
          id: id,
          types: status
        };
        const result = await change(params);
        if(result.data.code === 200){
        } else {
          this.$status(result.data.msg);
        }
      }
    }
  }
</script>

<style scoped>

</style>