<template>
    <div id="container">
        <el-row>
            <el-col :span="12">
                <zk-map/>
            </el-col>
            <el-col :span="12">
                <zk-info/>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import zkMap from "./zkMap";
    import zkInfo from "./zkInfo";
  export default {
    name: "Container",
    components:{
      zkMap,
      zkInfo
    }
  }
</script>

<style scoped>
    #container{
        padding: 2rem;
        background-color: #fafafa;
    }
</style>