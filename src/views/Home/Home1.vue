<template>
  <div class="home">
    <Header :title='pageTitle'>
    </Header>
    <Container />
<!--    <switch-pages/>-->
<!--    <OperatePage/>-->
<!--    <OpenOperatePage/>-->
    <Sidebar></Sidebar>
  </div>
</template>

<script>     
import Header from "@/components/Header";
import Container from "./Components/Container";
// import OperatePage from "@/components/OperatePage";
// import OpenOperatePage from '@/components/OpenOperatePage'
import Sidebar from '@/components/Sidebar'
import SwitchPages from "@/components/SwitchPage";


export default {
  name: 'Home',
  components: {
    Header,
    Container,
    // OperatePage,
    // OpenOperatePage,
    Sidebar,
    SwitchPages
  },
  data(){
    return {
      pageTitle:'全国高血压达标中心质控管理平台'
    }
  },
  mounted() {

  },
  methods:{

  }
}
</script>


<style scoped>
  .home{
    height: 100%;
    overflow-y: scroll;
    background-image: url('../../assets/数据概览/bj.png');
  }
</style>
