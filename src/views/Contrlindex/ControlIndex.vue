<template>
    <div id="index">
        <Header :title="$store.state.zkTitle"/>
        <Container/>
<!--        <Legend/>-->
        <Sidebar/>
        <ControlRange v-show="$store.state.city" :type="1" />
    </div>
</template>

<script>
import Header from './components/Header'
import Container from "./components/Container";
import Legend from "./components/Legend";
import Sidebar from "@/components/Sidebar";
import ControlRange from "./components/ControlRange";


  export default {
    name: "ControlIndex",
    components:{
      Header,
      Container,
      Legend,
      Sidebar,
      ControlRange
    },
    data(){
      return {

      }
    }
  }
</script>

<style scoped>
    #index{
        height: 100vh;
        overflow-y: scroll;
    }



</style>