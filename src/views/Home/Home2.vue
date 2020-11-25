<template>
  <div id="home">
    <Header :title="pageTitle" />
    <div id="container">
      <el-row>
        <el-col :span="6">
          <preButton/>
          <div class="blChart">
            <Title title='病例填报状态' style="margin-bottom:0.5rem" />
            <div id="blChart" style="width: 95%;height:95%;"></div>
          </div>
          <div class="zuoxia"
          v-loading='LisrankLoading'
         element-loading-text="拼命加载中"
         element-loading-spinner="el-icon-loading"
         element-loading-background="rgba(0, 0, 0, 0.8)" >
             <div class="title">
                <Title title="质控分数排名" >
                </Title>
                <div class="methods">
                    <div :class="[currentDataIndex === 0 ? 'active' : '']" @click="LupdataRankInfo('province')">省</div>
                    <div :class="[currentDataIndex === 1 ? 'active' : '']" @click="LupdataRankInfo('city')">市</div>
                    <div :class="[currentDataIndex === 2 ? 'active' : '']" @click="LupdataRankInfo('lianti')">医联体</div>
                </div>
            </div>
            <Rank/>
          </div>
        </el-col>
        <el-col :span="12" >
          <div class="container">
             <div class="list">
            <div class="item" v-for="item in data">
                <div class="icon">
                    <img src="@/assets/数据概览/医院总数.png" alt="">
                </div>
                <div class="info">
                  <div class="name">{{item.name}}</div>
                  <div class="number"><span>{{item.number}}</span>家</div>
                </div>
          </div>
          </div>
          <Map/>
          </div>
            <Logs/>
        </el-col>
        <el-col :span="6">
          <div class="you"
          v-loading='RisrankLoading'
         element-loading-text="拼命加载中"
         element-loading-spinner="el-icon-loading"
         element-loading-background="rgba(0, 0, 0, 0.8)" >
            <div class="title">
                <Title title="填报总数排名" >
                </Title>
                <div class="methods">
                    <div :class="[currentDataIndex === 0 ? 'active' : '']" @click="RupdataRankInfo('province')">省</div>
                    <div :class="[currentDataIndex === 1 ? 'active' : '']" @click="RupdataRankInfo('city')">市</div>
                    <div :class="[currentDataIndex === 2 ? 'active' : '']" @click="RupdataRankInfo('lianti')">医联体</div>
                </div>
            </div>
             <Rank2/>
          </div>
          <nextButton/>
        </el-col>
      </el-row>
    </div>
    <Sidebar/>
  </div>
</template>

<script>
import OperatePage from "@/components/OperatePage";
import Header from "@/components/Header";
import DouChart from "@/components/DoughnutChart";
import {DoughnutChart,NormalInfo} from '@/utils/api.js';
import Rank from  './Components/Rank'
import Rank2 from  './Components/Rank2'
import Title from  './Components/Title'
import Map from '@/components/Map'
 import preButton from "./Components/preButton";
 import nextButton from "./Components/nextButton";
 import Logs from "@/components/Logs";
 import Sidebar from "@/components/Sidebar";

export default {
  name:'home2',
  components:{
    Header,
    OperatePage,
    DouChart,
    Rank,
    Title,
    Map,
    Rank2,
    preButton,
    nextButton,
    Logs,
    Sidebar
  },
  data(){
    return {
      currentDataIndex:0,
      LisrankLoading:false,  // 左下角数据是否正在加载
      RisrankLoading:false, // 右边数据是否正在加载
      pageTitle:'全国高血压质控管理平台',
      normalInfoData:[],
      option:{
         
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
            x:'right',
            y:'center',
            orient: 'vertical',
            textStyle:{
              color:'#fff'
            }

          },
          graphic:{
            type:"text",
                left:"30%",
                top:"45%",
                style:{
                text:`填报总数
12365例`,
                fill:"#fff",
                fontSize:16
              }
          },
          color:['#1792E6','#94D4FF','#2B71FF'],
          series: [
            {
              name: '病例填报状态',
              type: 'pie',
              center: ["40s%", "50%"],
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              label: {
                normal:{
                  position:'outer',
                  formatter:'{d}%'
                }
              },
              labelLine: {
                show: true
              },
              data: [
                {value: 1136, name: '填报中'},
                {value: 1113, name: '填报完成'},
                {value: 1136, name: '已审核'},
                {value: 736, name: '已归档'},
                {value: 536, name: '诊断中'},
                {value: 1136, name: '死亡'},
              ],
               label: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: true
                }
              },
              lableLine: {
                  normal: {
                      show: false
                  },
                  emphasis: {
                      show: true
                  }
              },
            }
          ]
      },
       data:[
          {
            name:'通过认证医联体',
            number:'1321'
          },
          {
            name:'通过认证医院总数',
            number:'232'
          },
          {
            name:'注册医院总数',
            number:'32'
          }
      ],
      logs:[
        {
          name:'苏州附属医院',
          info:'新增病例'
        }
      ]
    }
  },
  mounted(){
    this.initBlChart();
  },
  methods:{
    // 初始化 病例填报状态
    initBlChart(){
        let chart = this.echarts.init(document.getElementById('blChart'));
        chart.setOption(this.option);
    },
    LupdataRankInfo(area){
        this.LisrankLoading = true;  // 显示加载框
        this.currentDataIndex = area === 'province' ? 0 : 1;  // 按钮样式切换

        this.$axios.get(`https://easy-mock.com/mock/5f8bbcd9b260f247acdf2c06/gaoxueya/${area}`).then(res => {
          //   this.$store.commit('setlRank',res.data.lRank);
          this.LisrankLoading = false; //  隐藏加载框
          this.$store.dispatch('setlRank',res.data.lRank);
        })
    },
    RupdataRankInfo(area){
        this.RisrankLoading = true;  // 显示加载框
        this.currentDataIndex = area === 'province' ? 0 : 1;  // 按钮样式切换

        this.$axios.get(`https://easy-mock.com/mock/5f8bbcd9b260f247acdf2c06/gaoxueya/${area}`).then(res => {
          //   this.$store.commit('setlRank',res.data.lRank);
          this.RisrankLoading = false; //  隐藏加载框
          this.$store.dispatch('setlRank',res.data.rRank);
        })
    }
  }
}
</script>

<style scoped>
  #home{

    height: 100%;
    overflow-y: scroll;
    background-image: url('../../assets/数据概览/bj.png');
  }

  .el-col-12,.el-col-6{
    padding: 0 1.25rem 0 2rem;
  }

  .container{
      box-sizing: border-box;
      padding: 1.25rem 0.88rem;
      height: 36vw;
      width: 100%;
      background-image: url('~@/assets/数据概览/中上.png');
      background-size: 100% 100%;
  }

  .list{
        display: flex;
        justify-content: space-between;
    }

    .item{
        background-image: url('~@/assets/数据概览/矩形.png');
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        text-align: center;
        box-sizing: border-box;
        padding: 0.94rem;
        width: 30%;
    }

    .item .icon{
      width: 2.88rem;
      height: 2.88rem;
      margin-right: .56rem;
    }

    .item .info{
      flex:1;
    }

    .item .name{
        color:#02D9FD;
        font-size: 1rem;
        font-weight: 800;
    }

    .item .number{
        
        color:#fff;
        margin-top: .31rem;
        font-size: 0.88rem;
    }

    .item .number span{
        font-size: 1.5rem;
    }

    .blChart{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        box-sizing: border-box;
        width: 100%;
        height: 20rem;
        padding: 0.6rem 1.25rem;
        background-image: url('~@/assets/数据概览2/左上2.png');
        background-size: 100% 20rem;
      }

    .zuoxia{
      box-sizing: border-box;
        padding:.3rem 1.13rem;
        margin-top: 2rem;
        width: 100%;
        height: 58vh;
        background-image: url('~@/assets/数据概览2/左下.png');
        background-size:100% 100%;
    }

    .you{
      color:#fff;
      box-sizing: border-box;
      padding:.3rem 1.13rem;
      background-image: url('~@/assets/数据概览2/右下.png');
      width: 100%;
      background-size:100% 100%;
    }

    .title{
      padding: 0;
      display: flex;
      justify-content: space-between;
    }

    .methods{
        display: flex;
        border: 0.0625rem solid #00FFFF;
        border-radius: 0.1875rem;
    }

    .methods div{
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        width: 4rem;
        height: 1.25rem;
        box-sizing: border-box;
        
        
        opacity: 0.6;
        font-size: .88rem;
        color:#fff;
    }

    .active{
      background-color: #084ecc;
    }

    .el-col{
        padding-top: 2rem;
    }


</style>