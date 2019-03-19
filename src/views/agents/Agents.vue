<template>
  <div>代理列表</div>
</template>

<script>
  import {agents} from "../../apis/agents";

  export default {
    name: "agents",
    data(){
      return {

      }
    },
    async mounted(){
      const result = await agents();
      console.log('RESULT:', result);
    }
  }
</script>

<style scoped>

</style>