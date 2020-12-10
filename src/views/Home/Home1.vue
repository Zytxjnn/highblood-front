<template>
  <div class="home">
    <Header :title='$store.state.sjTitle + "高血压达标中心质控管理平台"'>
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
  async created() {
    await this.getContent();
  },
  beforeDestroy() {

  },
  methods:{
    async getContent(){   // 获取首页全部数据
        const {data} = await this.$axios('http://highblood.chinacpc.mobi/apidata/getNumInfoByProvince');
        this.$store.state.content = data.content;
    },
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
