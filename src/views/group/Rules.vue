<template>
  <div class="mt-4">
    <!--表格-->
    <tree-table :data="data" :columns="columns" border/>
  </div>
</template>

<script>
  import treeTable from "@/components/treeTable/index";
  import {
    rules
  } from '@/apis/rules'
  export default {
    name: "rules",
    components: { treeTable },
    data() {
      return {
        columns: [
          {
            text: "ID",
            value: "id"
          },
          {
            text: "权限名称",
            value: "title"
          },
          {
            text: "图标",
            value: "ico"
            // width: 200
          },
          {
            text: "地址",
            value: "name"
          },
          {
            text: "等级",
            value: "level"
          },
          {
            text: "排序",
            value: "order_number"
          },
          {
            text: "菜单显示",
            value: "show"
          },
          {
            text: "状态",
            value: "status"
          }
          // {
          //   text: "操作",
          //   value: "order_number"
          // }
        ],
        data: [
          // {
          //   id: 0,
          //   event: "事件1",
          //   timeLine: 50,
          //   comment: "无"
          // },
          // {
          //   id: 1,
          //   event: "事件1",
          //   timeLine: 100,
          //   comment: "无",
          //   child: [
          //     {
          //       id: 2,
          //       event: "事件2",
          //       timeLine: 10,
          //       comment: "无"
          //     },
          //     {
          //       id: 3,
          //       event: "事件3",
          //       timeLine: 90,
          //       comment: "无",
          //       child: [
          //         {
          //           id: 4,
          //           event: "事件4",
          //           timeLine: 5,
          //           comment: "无"
          //         },
          //         {
          //           id: 5,
          //           event: "事件5",
          //           timeLine: 10,
          //           comment: "无"
          //         },
          //         {
          //           id: 6,
          //           event: "事件6",
          //           timeLine: 75,
          //           comment: "无",
          //           child: [
          //             {
          //               id: 7,
          //               event: "事件7",
          //               timeLine: 50,
          //               comment: "无",
          //               child: [
          //                 {
          //                   id: 71,
          //                   event: "事件71",
          //                   timeLine: 25,
          //                   comment: "xx"
          //                 },
          //                 {
          //                   id: 72,
          //                   event: "事件72",
          //                   timeLine: 5,
          //                   comment: "xx"
          //                 },
          //                 {
          //                   id: 73,
          //                   event: "事件73",
          //                   timeLine: 20,
          //                   comment: "xx"
          //                 }
          //               ]
          //             },
          //             {
          //               id: 8,
          //               event: "事件8",
          //               timeLine: 25,
          //               comment: "无"
          //             }
          //           ]
          //         }
          //       ]
          //     }
          //   ]
          // }
        ],
      };
    },
    mounted(){
      this.getRulesList();
    },
    methods: {
      // 短信列表
      async getRulesList(){
        const result = await rules();
        if(result.data.code === 200){
          this.data = result.data.data;
          console.log('this.data:', this.data);
        } else {
          this.$status(result.data.msg);
        }
      },
    }
  }
</script>

<style scoped>

</style>