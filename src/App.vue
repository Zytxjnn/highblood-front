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
    width: 100vw;
    /*background-image: url("../static/images/bg2.png");*/
    /*background-size: 100% 100%;*/
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

  /* 覆盖element-ui样式*/

  .el-collapse-item__header{
    background-color: #ebebeb !important;
  }

  .el-collapse-item__header.is-active{
    background-color: #fafafa !important;
  }





  .el-collapse-item__content {
    background-color: #fafafa;
  }




</style>
