<template>
    <div id="index">
        <Header :title="title"/>
        <Container/>
        <Legend/>
    </div>
</template>

<script>
import Header from './components/Header'
import Container from "./components/Container";
import Legend from "./components/Legend";

  export default {
    name: "ControlIndex",
    components:{
      Header,
      Container,
      Legend
    },
    data(){
      return {
        title:'全国高血压达标中心质控指标',
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