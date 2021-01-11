<template>
    <div class="normal-info">
        <div class="normal-item" v-for="(item,i) in normalData">
            <div class="normal-title">
                <img src="../assets/数据概览/通过.png" v-if="i % 2==0">
                <img src="../assets/数据概览/建设中.png" v-else>
               <span> {{item.name}}</span></div>
            <div class="normal-count"><span>{{item.count}}</span>家</div>
        </div>
    </div>
</template>

<script>
  import Logs from "./Logs";

  export default {
    name: "NormalInfo",
    data(){
      return {
        normalData:[
          {
            name:'通过认证牵头医院',
            count:100
          },
          {
            name:'认证中牵头医院',
            count:100
          },
          {
            name:'通过认证卫星医院',
            count:100
          },
          {
            name:'认证中卫星医院',
            count:100
          }
        ]
      }
    },
    created() {
      this.updataNormalInfoData();
    },
    methods:{
      updataNormalInfoData(){
        this.normalData[0].count = this.$store.state.content.sum_pass_unit_1;
        this.normalData[1].count = this.$store.state.content.sum_build_unit_1;
        this.normalData[2].count = this.$store.state.content.sum_pass_hospital_1;
        this.normalData[3].count = this.$store.state.content.sum_build_hospital_1;
      }
    },
    watch:{
      "$store.state.content": function() {
        this.updataNormalInfoData();
      }
    }
  }
</script>

<style scoped>
    .normal-info{
      box-sizing: border-box;
      /*background-image:url('~@/assets/数据概览/线框.png') ;*/
      display: flex;
      height: 11.31rem;
      width:100%;
      flex-wrap: wrap;
      padding: 0 1.25rem;
      margin-top: 1rem;

      justify-content: space-between;
      background-size: 100% 100%;
    }

    .normal-item{
        display: flex;
        width: 50%;
        text-align: center;
        flex-direction: column;        
    }

    .normal-item .normal-title{
        display: flex;
        align-items: center;
        margin-top: 1rem;
        font-size: 1rem;
        color:#64B7F7;
    }

    .normal-title span{
    }

    .normal-title img{
        margin-right: .63rem;
    }

     .normal-item .normal-count{

       display: flex;
       padding-left: 4rem;
       align-items: flex-end;
        color:#fff;

    }

    .normal-count span{
      font-weight: 800;
      font-size: 3rem;
      margin-right: 0.2rem;
    }
</style>