<template>
    <div id="index">
        <Header :title="$store.state.zkTitle + '高血压达标中心'"/>
        <Container/>
<!--        <Legend/>-->
        <Sidebar/>

    </div>
</template>

<script>
import Header from './components/Header'
import Container from "./components/Container";
import Legend from "./components/Legend";
import Sidebar from "@/components/Sidebar";
// import ControlRange from "./components/ControlRange";

import {getCoreDetail} from '@/utils/api'

  export default {
    name: "ControlIndex",
    components:{
      Header,
      Container,
      Legend,
      Sidebar,
      // ControlRange
    },
    data(){
      return {

      }
    },
    created() {
      this.$store.state.zkTitle = '全国'
    },
    watch:{
      '$store.state.city'(){
        if(!this.$store.state.city){
          this.$store.state.contrast_area = '全国'
          console.log(this.$store.state.area_type)
          const params = new URLSearchParams();
          params.append('area_type',1);
          params.append('start',this.$store.state.start);

          this.$axios.post(getCoreDetail,params).then(res => {
            this.$store.state.infoList = res.data.data;
          })
        }
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