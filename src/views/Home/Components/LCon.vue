<template>
    <div id="lcon">
       <div class='zuoshang'>
          <Title title="标准版认证情况" />
        <div class="normal-info">
            <normal-info :normal-data="normalData"/>
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
                <div :class="[currentDataIndex === 0 ? 'active' : '']" @click="updataRankInfo('province')">省</div>
                <div :class="[currentDataIndex === 1 ? 'active' : '']" @click="updataRankInfo('city')">市</div>
            </div>
          </div>
            <rank/>
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
        normalData:[
          {
            name:'通过认证牵头医院',
            count:'90'
          },
          {
            name:'认证中牵头医院',
            count:'23'
          },
          {
            name:'通过认证卫星医院',
            count:'132'
          },
          {
            name:'认证中卫星医院',
            count:'12'
          }
        ]
      }
    },
    created(){
        // 初始请求rank数据
    },
    methods:{
      // 更新排行数据
      updataRankInfo(area){
        this.isrankLoading = true;  // 显示加载框
        this.currentDataIndex = area === 'province' ? 0 : 1;  // 按钮样式切换

        this.$axios.get(`https://easy-mock.com/mock/5f8bbcd9b260f247acdf2c06/gaoxueya/${area}`).then(res => {
          //   this.$store.commit('setlRank',res.data.lRank);
          this.isrankLoading = false; //  隐藏加载框
          this.$store.dispatch('setlRank',res.data.lRank);
        })
      }
    }
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

    .methods{
        display: flex;
        border: 1px solid #00FFFF;
    }

    .methods div{
        text-align: center;
        cursor: pointer;
        width: 4rem;
        height: 1.25rem;
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
      background-image: url('../../../assets/数据概览/左下.png');
      background-size:100% 100%;
    }

</style>