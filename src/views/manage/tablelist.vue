<template>
  <div class="tablelist">
      TableList view
      <el-input v-model="input" placeholder="请输入内容"></el-input>
  </div>
</template>

<script>
export default {
  data () {
      return {
        input: ''
      }
  },
  mounted () {
    console.log('TableList8888')
  }
}
</script>

