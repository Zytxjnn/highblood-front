<template>
    <div class="subItem" @click="switchToConsortiumList">
        <div class="info">
            <div class="title">{{index}}.{{data.core_name || data[ikey].core_name }}</div>
            <div class="content" v-if="data.all_count">
                <div>
                    <div style="display:flex;align-items: center" v-if="$store.state.zkRank[ikey]">
                        <span class="highlight">{{$store.state.zkRank[ikey].rank}}</span>
                        <span>/{{$store.state.zkRank[ikey].count}}</span>
                    </div>
                    <div style="display:flex;align-items: center" v-else>
                        /
                    </div>
                    <div>
                        排名
                    </div>
                </div>
                <div>

                    <div style="display:flex;align-items:center;" v-if="$store.state.infoList[ikey].all_count">
                        <span class="highlight">
                            {{$store.state.infoList[ikey].unit === 1 ? $store.state.infoList[ikey].avg_time : $store.state.infoList[ikey].unit===2 ? $store.state.infoList[ikey].pass_percent:$store.state.infoList[ikey].all_count}}
                        </span>
                        <span>{{$store.state.infoList[ikey].unit === 1 ? '分钟' : $store.state.infoList[ikey].unit===2 ? '%' : '例'}}</span>
                    </div>
                    <div v-else>无数据</div>
                    <div>
                        {{this.$store.state.contrast_area}}
                    </div>
                </div>
                <div>
                    <div style="display:flex;align-items:center;" v-if="data.all_count">
                        <span class="highlight">
                            {{data.unit === 1 ? data.avg_time : data.unit===2 ? data.pass_percent:data.all_count}}
                        </span>
                        <span>{{data.unit === 1 ? '分钟' : data.unit===2 ? '%' : '例'}}</span>
                    </div>
                    <div v-else>无数据</div>
                    <div>
                       本地
                    </div>
                </div>
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
import {getCoreDetail} from '@/utils/api'

  export default {
    name: "subItem",
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
      },
      ikey:{
        type:String,
        require:true
      }
    },
    mounted() {

    },
    methods:{
      switchToConsortiumList(){ // 显示医联体列表
        this.$store.state.core_name = this.data.core;
        this.$store.state.isConsortiumList = true;
      }
    },
    watch:{


    }
  }
</script>

<style scoped>
    .subItem{
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        margin: 0 2.5rem 1.88rem 0;
        width:100%;
        height:7.5rem;
        padding:1rem 1.25rem;
        background: #FFFFFF;
        box-shadow: 0.1rem 0.1rem 1rem 0.2rem rgba(111, 111, 111, 0.2);
        border-radius: 1rem;
    }

    .subItem .info{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 70%;
        margin-right: 1rem;
    }

    .subItem .icon{
        width: 4.5rem;
        height: 4.5rem;
        background: #D4ECF2;
        border-radius: 50%;
    }

    .title{
        height: 2.75rem;
        font-size: 1rem;
      font-weight: 800;
    }

    .count{
        color:#323232;
    }

    .count span{
        font-weight: bolder;
        font-size: 1.25rem;
        color: #008599;
    }

    .content{
        font-size: 0.8rem;
        height: 2.5rem;
        display: flex;
        justify-content: space-between;
        padding-left: 0.4rem;
    }

    .content>div{
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: column;

    }

    .content>div:not(:last-child):after{
        content: '';
        right: -1.5rem;
        transform: translateY(50%);

        position: absolute;

        height: 2rem;
        border-right: 1px solid #000;
        /*background-color: #000;*/
    }

    .highlight{
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        color:#008599;
        font-size: 1.25rem;
        font-weight: 800;
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
</style>