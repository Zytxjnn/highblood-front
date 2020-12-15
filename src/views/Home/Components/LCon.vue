<template>
    <div id="lcon">
       <div class='zuoshang'>
          <Title title="标准版认证情况" />
        <div class="normal-info">
            <normal-info/>
        </div>
       </div>
       <preButton/>
        <div class="certification-number"
         v-loading='isrankLoading'
         element-loading-text="拼命加载中"
         element-loading-spinner="el-icon-loading"
         element-loading-background="rgba(0, 0, 0, 0.8)" >
            <div class="title" >
                <Title title="通过认证数量排名" >
                </Title>
            <div class="methods">
                <div :class="[currentDataIndex === 0 ? 'active' : '']" @click="updataRankInfo(true)">省</div>
                <div :class="[currentDataIndex === 1 ? 'active' : '']" @click="updataRankInfo(false)">市</div>
            </div>
          </div>
            <rank :showProvince="showProvince" />
        </div>
    </div>
</template>

<script>
    import Title from "./Title";
    import Rank from "./Rank";
    import NormalInfo from "@/components/NormalInfo";
    import preButton from "./preButton";

  export default {
    name: "LCon",
    components:{
      NormalInfo,
      Title,
      Rank,
      preButton
    },
    data(){
      return{
        isrankLoading:false,
        currentDataIndex:0,
        showProvince: true
      }
    },
    created(){

    },
    methods:{
      // 更新排行数据
      updataRankInfo(bool){
        this.showProvince = bool;   // 省/市 显示

        this.currentDataIndex = this.currentDataIndex === 0 ? 1 : 0;    // 省/市高亮
      },

    },

  }
</script>

<style scoped>
    .zuoshang{
      box-sizing: border-box;
      width: 100%;
      height: 15.63rem;
      padding: 0.625rem 1.25rem;

      background-image: url('../../../assets/数据概览/左上.png');
      background-size: 100% 15.63rem;
    }

    .title{
        display: flex;
        justify-content: space-between;
    }
    .methods{
        display: flex;
        border: 1px solid #00FFFF;
        height: 1.25rem;
    }

    .methods div{
        text-align: center;
        cursor: pointer;
        width: 4rem;
        height: 100%;
        box-sizing: border-box;
        opacity: 0.6;
        font-size: .88rem;
        color:#fff;
    }

    .active{
      background-color: #00FFFF;
    }

    .certification-number{
      box-sizing: border-box;
      padding:.3rem 1.13rem;
      margin-top: 2rem;
      width: 100%;
      height: 58vh;
      background-image: url('~@/assets/数据概览/左下.png');
      background-size:100% 100%;
    }

</style>