<template>
  <div>
    <!--搜索-->
    <div class="mt-3">
      <div>
        <el-input
          class="inputStyle mr-4 mt-3"
          placeholder="请输入MAC/手机号"
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
          @change = "changeDate"
        >
        </el-date-picker>
        <el-button type="primary" @click="query">查询</el-button>
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
          prop="mac"
          label="MAC"
        >
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号"
        >
        </el-table-column>
        <el-table-column
          prop="phone_name"
          label="机型"
        >
        </el-table-column>
        <el-table-column
          prop="range"
          label="距离"
        >
        </el-table-column>
        <el-table-column
          label="停留时间(分)"
        >
          <template slot-scope="scope">{{Math.floor(scope.row.stoptime / 60)}}</template>
        </el-table-column>
        <el-table-column
          label="是否通话"
        >
          <template slot-scope="scope">
            <span>{{scope.row.is_call ? '有' : '没有'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="times"
          label="创建时间"
        >
        </el-table-column>
        <el-table-column
          prop="update_time"
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
    details
  } from "@/apis/mates";
  export default {
    name: "Details",
    data(){
      return {
        list: [],
        loading: true,
        input: '',
        date: '',
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
        currentPage: 1,
        pageSize: 10,
        total: 0,
        start_date: '',
        end_date: ''
      }
    },
    mounted(){
      this.getDetailList();
    },
    methods: {
      async getDetailList(){
        const result = await details(this.$route.query.id, this.input, this.currentPage, this.pageSize);
        this.loading = false;
        if(result.data.code === 200){
          result.data.data.list.forEach(function (item) {
            let date = new Date(item.update_time * 1000);
            let Y = date.getFullYear() + '-';
            let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            let D = (date.getDate()+1 < 10 ? '0'+(date.getDate()+1) : date.getDate()+1) + ' ';
            let h = (date.getHours()+1 < 10 ? '0'+(date.getHours()+1) : date.getHours()+1) + ':';
            let m = (date.getMinutes()+1 < 10 ? '0'+(date.getMinutes()+1) : date.getMinutes()+1) + ':';
            let s = (date.getSeconds()+1 < 10 ? '0'+(date.getSeconds()+1) : date.getSeconds()+1);
            item.update_time =  Y+M+D+h+m+s;
          });
          this.list = result.data.data.list;
          this.total = result.data.data.count;
        } else {
          this.$status(result.data.msg);
        }
      },
      // 分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.getDetailList()
      },
      handleCurrentChange(val) {
        console.log(`当前 ${val} 页`);
        this.currentPage = val;
        this.getDetailList()
      },
      // 查询筛选日期
      changeDate(val){
        if(val.length > 0){
          this.start_date = val[0];
          this.end_date = val[1];
        }
        this.getDetailList();
      },
      // 查询
      query(){
        this.getDetailList();
      }
    }
  }
</script>

<style scoped>
  .inputStyle{
    width: 15%;
  }
</style>