<template>
  <div id="app">
    <router-view/>
<!--    <Sidebar/>-->
<!--    <OpenOperatePage/>-->
<!--    <OperatePage/>-->
  </div>
</template>


<script>
import OperatePage from "@/components/OperatePage";
import Sidebar from '@/components/Sidebar'
import OpenOperatePage from '@/components/OpenOperatePage'
export default {
  components:{
    Sidebar,
    OperatePage,
    OpenOperatePage
  }
}
</script>
<style>
  #app{
    height: 100vh;
    /*background-image: url("../static/images/bg2.png");*/
    /*background-size: 100% 100%;*/
  }

  div[data-v-a42c59e2]{
    color:#fff;
  }

  .el-progress{
    width: 90% !important;
  }

  .el-progress-bar__inner{
     background: linear-gradient(90deg, #0477D5, #01D9FE) !important;
  }

  .el-progress-bar__outer{
    width: 100% !important;
    background-color: #193F80 !important;
  }

  ::-webkit-scrollbar{
    width: 10px;
    height: 1px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;

    background-color:rgba(0,0,0,0.3);

  }

  ::-webkit-scrollbar-track {
    -webkit-box-shadow: none;

    background:rgba(0,0,0,0.2);
  }
</style>
