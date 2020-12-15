<template>
    <div class="chinaItem" @click="switchToConsortiumList">
        <div class="info">
            <div class="title">{{index}}.&nbsp;{{data.core_name}}</div>
            <div class="count" v-if="data.all_count">
                全国
                <span v-if="data.unit === 3"> <span class="highlight">{{data.all_count}}</span> 例</span>
                <span v-if="data.unit === 2"><span class="highlight">{{data.pass_percent}}</span> %</span>
                <span v-if="data.unit === 1"><span class="highlight">{{data.avg_time}}</span> 分钟</span>
            </div>
            <div v-else>无数据</div>
        </div>
        <div class="icon">
            <img :src='"~@/assets/质控指标/icons/"+index+".png"' alt="">
        </div>
        <div class="iconfont icon-gengduo"></div>
    </div>
</template>

<script>
  export default {
    name: "chinaItem",
    props:{
      data:{
        type:Object,
        default:() => {
          return {}
        }
      },
      index:{
        type: Number,
        default:0
      }
    },
    mounted() {

    },
    methods:{
      switchToConsortiumList(){ // 显示医联体列表
        this.$store.state.isConsortiumList = true;
        this.$store.state.core_name = this.data.core;

      }
    }
  }
</script>

<style scoped>
    .chinaItem{
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items:space-between;
      box-sizing: border-box;
      margin: 0 2.5rem 1.88rem 0;
      width:100%;
      height:7.5rem;
      padding:1rem 1.25rem;
      background: #FFFFFF;
      box-shadow: 0.1rem 0.1rem 1rem 0.2rem rgba(111, 111, 111, 0.2);
      border-radius: 1rem;
    }

    .chinaItem .info{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 70%;
    }

    .chinaItem .icon{
        width: 4.5rem;
        height: 4.5rem;
        background: #D4ECF2;
        border-radius: 50%;
    }

    .count{
        color:#323232;
    }

    .count .highlight{
        font-weight: bolder;
        font-size: 1.25rem;
        color: #008599;
    }

    .icon-gengduo{
        position: absolute;
        right: 0.2rem;
        top: 0.25rem;
        color:#008599;
        font-size: 1.5rem;
    }

    .icon{
        width: 2rem;
        height: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .info .title{
        font-size: 1rem;
        font-weight:bold;
    }
</style>