<template>
  <div>
    <div class="navigation">短信管理/信息发送记录</div>
    <!--表格-->
    <div class="mt-3">
      <div class="mt-3">
        <el-table
          :loading="loading"
          :data="list"
          stripe
          style="width: 100%">
          <el-table-column
            prop="uname"
            label="用户"
          >
          </el-table-column>
          <el-table-column
            prop="content"
            label="内容"
          >
          </el-table-column>
          <el-table-column
            label="类型"
          >
            <template slot-scope="scope">
              <span>{{scope.row.types ? '短信' : '闪信'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="times"
            label="提交时间"
          >
          </el-table-column>
          <el-table-column
            label="审核状态"
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
  </div>
</template>

<script>
  import {smsLog} from "@/apis/smsLog";

  export default {
    name: "SmsLog",
    data() {
      return {
        input: '',
        types: [
          {
            type: 1,
            label: '短信'
          },
          {
            type: 0,
            label: '闪信'
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
        list: [],
        loading: true,
        currentPage: 1,
        pageSize: 10,
        total: 0,
      }
    },
    mounted(){
      this.getSmsLogList();
    },
    methods: {
      // 短信列表
      async getSmsLogList(){
        const result = await smsLog(this.input, this.type, this.start_time, this.end_time, this.currentPage, this.pageSize);
        // console.log('RESULT:', result);
        this.loading = false;
        if(result.data.code === 200){
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
        this.getSmsLogList()
      },
      handleCurrentChange(val) {
        console.log(`当前 ${val} 页`);
        this.currentPage = val;
        this.getSmsLogList()
      },
    }
  }
</script>

<style scoped>

</style>