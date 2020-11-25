<template>
    <div id="container">
        <el-row>
            <el-col :span="6">
                <l-con></l-con>
            </el-col>
            <el-col :span="12">
                <c-con></c-con>
            </el-col>
            <el-col :span="6">
                <r-con></r-con>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import LCon from "./LCon";
import CCon from "./CCon";
import RCon from "./RCon";

  export default {
    name: "Container",
    components:{
      LCon,
      CCon,
      RCon
    }
  }
</script>

<style scoped>
    #container{
        padding:2rem 2rem 0 2rem;
    }
</style>