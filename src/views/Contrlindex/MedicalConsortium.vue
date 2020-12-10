<template>
    <div id="medicalconsortium">
        <Header :isConsortium="true" :title="name" />
        <div class="container">
            <el-row>
                <el-col :span="12">
                    <div class="rank">
<!--                        <div class="rank-item" v-for="item in rank" :style="{backgroundImage:'url(../../assets/MedicalConsortium/' + item.bcgImg + '.png)'}":style="{backgroundImage:'url(../../assets/MedicalConsortium/' + item.bcgImg + '.png)'}" >-->
                        <div class="rank-item" v-for="item in rank" :class="item.bcgImg">
                            <div class="item-name">{{item.name}}</div>
                            <div class="item-value">{{item.value}}</div>
                        </div>
                    </div>
                    <div class="date">
                        <div class="date-item">
                            <div class="item-icon">
                                <img src="~@/assets/MedicalConsortium/注册.png" alt="">
                            </div>
                            <div class="item-info">
                                <div class="item-title">{{date[0].title}}</div>
                                <div class="item-value">
                                    <span class="value">{{date[0].value}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="date-item">
                            <div class="item-icon">
                                <img src="~@/assets/MedicalConsortium/通过.png" alt="">
                            </div>
                            <div class="item-info">
                                <div class="item-title">{{date[1].title}}</div>
                                <div class="item-value">
                                    <span class="value">{{date[1].value}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="date-item">
                            <div class="item-icon">
                                <img src="~@/assets/MedicalConsortium/倒计时.png" alt="">
                            </div>
                            <div class="item-info">
                                <div class="item-title">{{date[2].title}}</div>
                                <div class="item-value">
                                    <span class="value">{{date[2].value}}</span>/天
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="charts">
                        <div class="score-comp">
                            <div id="score-comp-chart" style="height:100%;width:100%"></div>
                        </div>
                        <div class="score-trend">
                            <div class="trend-title">
                                近六月填报趋势
                            </div>
                            <div class="progress" v-for="(item,i) in scoreTrendData">
                                <div class="progress-month">
                                    {{item.month}}月
                                </div>
<!--                                <el-progress :class="'progress'+i"-->
<!--                                             :stroke-width="20"-->
<!--                                             :percentage="item.value"-->
<!--                                             :format="format"-->
<!--                                />-->
                            </div>
                            <div class="filled-amount">
                                <div class="filled-amount-icon">
                                    <img src="~@/assets/MedicalConsortium/累计.png" alt="">
                                    <div class="filled-amount-text">累计填报量</div>
                                </div>
                                <div class="filled-amount-up">
                                    <div class="filled-amount-count">456</div>
                                    <div class="filled-amount-upIcon">
                                        <img src="~@/assets/MedicalConsortium/上升.png" alt="">
                                    </div>
                                </div>
                            </div>
                            <div class="filled-amount-cate">
                                <div class="filled-amount-today" v-for="item in filledAmountCate">
                                    <div class="today-icon">
                                        <img src="~@/assets/MedicalConsortium/填报.png" alt="">
                                    </div>
                                    <div class="today-info">
                                        <div class="today-info-value" :style="{color:item.color}">{{item.value}}</div>
                                        <div class="today-info-name">{{item.name}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="infoList">
<!--                        <sub-item  v-for="(item,key,i) in data" :data="item" :index="i+1" v-loading='isLoading'-->
<!--                                   element-loading-text="拼命加载中"-->
<!--                                   element-loading-spinner="el-icon-loading"-->
<!--                                   element-loading-background="rgba(0, 0, 0, 0.2)"  />-->
<!--                        <div v-for="(item,i) in data">-->
<!--                           -->
<!--                        </div>-->
                        <sub-item v-for="(item,key,i) in $store.state.subItem"  :ikey="key" :data="item" :index="i+1" v-loading='isLoading'
                                  element-loading-text="拼命加载中"
                                  element-loading-spinner="el-icon-loading"
                                  element-loading-background="rgba(0, 0, 0, 0.2)"  />
<!--                        <div  v-for="(item,key,i) in $store.state.subItem" >-->
<!--                            {{item.all_count}}-->
<!--                        </div>-->
                        <div class="none"></div>
                        <div class="none"></div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <ControlRange2 :type="2"/>
    </div>
</template>

<script>
  import Header from "./components/Header";
  import subItem from "./components/subItem";
  import ControlRange2 from "./components/ControlRange2";
  import echarts from 'echarts'

import { getHospitalJoinedList,getCoreDetail,getHospitalList} from '@/utils/api'

  export default {
    name: "MedicalConsortium",
    components:{
      Header,
      subItem,
      ControlRange2
    },
    data(){
      return {
        isLoading:false,
        name:'',
        rank:[
          {
            name:'质控评分',
            value:'123分',
            bcgImg:'controlScore'
          },
          {
            name:'市排名',
            value:'123分',
            bcgImg:'rank1'
          },
          {
            name:'省排名',
            value:'123分',
            bcgImg:'rank1'
          },
          {
            name:'全国排名',
            value:'123分',
            bcgImg:'rank2'
          }
        ],  // 质控评分，市排名……
        date:[
          {
            title:'注册时间',
            value:'2016-12-05',

          },
          {
            title:'通过认证时间',
            value:'2017-12-05',

          },
          {
            title:'再认证倒计时',
            value:'644',

          },
        ],  // 注册时间，通过认证时间……
        scoreTrendData:[
          {
            month:'10',
            value:120
          },
          {
            month:'10',
            value:80
          },
          {
            month:'10',
            value:100
          },
          {
            month:'10',
            value:60
          },
          {
            month:'10',
            value:90
          },
          {
            month:'10',
            value:50
          }
        ],
        filledAmountCate:[
          {
            value:15,
            name:'今日填报量',
            color:'#4AB6D6'
          },
          {
            value:48,
            name:'近六日填报量',
            color:'#AB4ED7'
          },
        ],
        data: [
          {
            "title": "高血压诊治例数",
            "count1": 2151,
            "rank1":16,
            "rank2":51,
            "count2":200
          },
          {
            "title": "继发性高血压和（或）难治性高血压例数占比",
            "count1": 2151,
            "rank1":16,
            "rank2":51,
            "count2":200
          },
          {
            "title": "诊断使用心电图",
            "count1": 2151,
            "rank1":16,
            "rank2":51,
            "count2":200
          },
          {
            "title": "诊断尿白蛋白/肌酐比检测率",
            "count1": 2151,
            "rank1":16,
            "rank2":51,
            "count2":200
          },
          {
            "title": "高血压随访率",
            "count1": 2151,
            "rank1":16,
            "rank2":51,
            "count2":200
          },
          {
            "title": "牵头医院对卫星医院的学术培训，召开次数与质量",
            "count1": 2151,
            "rank1":16,
            "rank2":51,
            "count2":200
          },
          {
            "title": "对高血压患者对健康教育，召开次数与质量",
            "count1": 2151,
            "rank1":16,
            "rank2":51,
            "count2":200
          },
          {
            "title": "中心建设质量分析会，召开次数与质量",
            "count1": 2151,
            "rank1":16,
            "rank2":51,
            "count2":200
          },
          {
            "title": "高血压转诊率",
            "count1": 2151,
            "rank1":16,
            "rank2":51,
            "count2":200
          },
          {
            "title": "高血压转诊率",
            "count1": 2151,
            "rank1":16,
            "rank2":51,
            "count2":200
          },
          {
            "title": "高血压转诊率",
            "count1": 2151,
            "rank1":16,
            "rank2":51,
            "count2":200
          },
          {
            "title": "高血压转诊率",
            "count1": 2151,
            "rank1":16,
            "rank2":51,
            "count2":200
          },
          {
            "title": "高血压转诊率",
            "count1": 2151,
            "rank1":16,
            "rank2":51,
            "count2":200
          }
        ],
        hospital_joined_info:[]
      }
    },
    mounted() {

      this.name = this.$route.query.name;

      // 初始化图表
      const compChart = this.echarts.init(document.getElementById('score-comp-chart'));
      compChart.setOption(this.getCompOption());


        this.getInfoList();
        this.getData();


    },
    methods:{
       getData(){    // 请求医联体信息
        const params1 = new URLSearchParams();
        // params.area_type = this.$store.state.area_type;
        // params.hospital_joined_name = this.name;
        params1.append('area_type',this.$store.state.area_type);
        params1.append('hospital_joined_name',this.name);
        this.$axios.post(getHospitalJoinedList,params1).then(res => {
          this.hospital_joined_info =  res.data.data;   // 保存医联体信息;
          this.$store.state.hospital_joined_id = this.hospital_joined_info[0].hospital_id;

          // const params = new URLSearchParams();
          // params.append('area_type',1);
          // params.append('hospital_joined_id',this.$store.state.hospital_joined_id);
          // this.$axios.post(getHospitalList,params).then(res => {
          //   this.hospitalList = res.data.data;
          // })

          this.getRank(3)
          // this.getRank(4);
          // 请求质控指标信息
          const params2 = new URLSearchParams();
          params2.append('area_type',4);
          params2.append('hospital_joined_id',this.hospital_joined_info[0].hospital_id);
          params2.append('start',this.$store.state.start);
          params2.append('end',this.$store.state.start);
          this.$axios.post(getCoreDetail,params2).then( res => {
            this.$store.state.subItem = res.data.data;
          })
        })

      },
      getInfoList(){
        const params = new URLSearchParams();
        params.append('area_type',this.$store.state.area_type);
        params.append('start',this.$store.state.start);
        params.append('end',this.$store.state.end);
        this.$axios.post(getCoreDetail,params).then(res => {
          this.$store.state.infoList = res.data.data;
        })
      },
      getRank(data_type){
        const params = new URLSearchParams();
        params.append('area_type',1);
        params.append('data_type',data_type);
        switch (data_type) {
          case 1:
            params.append('province',this.$store.state.province);
            break;
          case 3:
            params.append('hospital_joined_id',this.hospital_joined_info[0].hospital_id);
            break;
        }
        params.append('start',this.$store.state.start);
        params.append('end',this.$store.state.end);


        this.$axios.post('http://gxyzkend.ccpmc.org/QualityControlIndex/getCoreRank',params).then(res => {
          this.$store.state.zkRank = res.data.data;
        })

      },
      getCompOption(){  // 返回环比图options
        return {
          backgroundColor:'',
          tooltip:{
            show:true,
            trigger:'axis'
          },
          title:{
            show:true,
            text:'2019第四季度质控分数同比/环比图',
            textStyle:{
              fontSize:'16',
              fontWeight:500
            },
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['一季度', '二季度', '三季度', '四季度'],
            axisTick:{
              show:false
            },
            axisLine:{
              show:false
            }
          },
          yAxis: {
            type: 'value',
            axisLine:{
              show:false
            },
            axisTick:{
              show:false
            }
          },
          series: [{
            data: [25,60,42,56],
            type: 'line',
            areaStyle: {},
            smooth:0.3,
            itemStyle:{
              normal:{
                color:new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#4A75D6" },
                  { offset: 0.5, color: "rgba(58, 167, 255,0.4)" },
                  { offset: 1, color: "rgba(58, 167, 255,0)" }
                ])
              }
            }
          }]
        };
      },
      format(percentage) {
        return percentage;
      }
    },
    watch:{
      '$store.state.subItem'(){
        this.getInfoList();
      }
    }
  }
</script>

<style scoped>
    .container{
        background-color: #fafafa;
        padding: 2.5rem 3.1rem;
    }

    .rank{
        display: flex;
    }

    .rank-item{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 1.5rem 0.75rem 1rem 1.25rem;
        width: 12rem;
        height: 7rem;
        background-size: 100% 100%;
    }

    .rank-item .item-value{
        text-align: right;
        font-size: 1.80rem;
    }

    .controlScore{
        background-image: url("../../assets/MedicalConsortium/controlScore.png");
    }
    .rank1{
        background-image: url("../../assets/MedicalConsortium/rank1.png");
    }
    .rank2{
        background-image: url("../../assets/MedicalConsortium/rank2.png");
    }

    .date{
        display: flex;
        justify-content: space-between;
        margin-top: 3rem;
    }

    .date-item{
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        padding:0.75rem 1.31rem 0.75rem 0;
        align-items:center;;
        width: 12rem;
        height: 5rem;
        border-radius:3rem;
        background: linear-gradient(270deg, rgba(74, 182, 214, 0.6) 0%, rgba(255, 255, 255, 0) 100%);

    }

    .date-item:nth-child(1) .value{
        color:#008599;
    }

    .date-item:nth-child(2){
        background: linear-gradient(270deg, rgba(74, 117, 214, 0.6) 0%, rgba(255, 255, 255, 0) 100%);
    }
    .date-item:nth-child(2) .value{
        color:#4A75D6;
    }

    .date-item:nth-child(3){
        background: linear-gradient(270deg, rgba(170, 74, 214, 0.6) 0%, rgba(255, 255, 255, 0) 100%);
    }
    .date-item:nth-child(3) .value{
        color:#AC4ED7;
    }



    .date-item .item-info{
        display: flex;
        text-align: right;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
    }

    .item-title{
        font-size: 1rem;
    }

    .item-info .value{
        font-weight: bold;
    }

    .item-icon img{
        width: 2.5rem;
        height: 2.6rem;
    }

    .charts{
        display: flex;
        justify-content: space-between;
        margin-top: 3rem;
    }

    .score-comp,.score-trend{
        box-sizing: border-box;
        padding: 1.5rem 0 0 1rem;
        height: 25rem;
        width: 48%;
        background: #FFFFFF;
        box-shadow: 0rem 0rem 1rem 0rem rgba(74, 182, 214, 0.23);
        border-radius: 1rem;
    }

    /deep/ .el-progress{
        width:85%;
        margin-bottom: 1.25rem;
    }

    /deep/ .el-progress__text{
        font-size: 1rem !important;
        color:#484848;
    }

    /deep/ .progress0 .el-progress-bar__inner{
        background: linear-gradient(90deg, #38A0D6, #6DCDE6);
    }
    /deep/ .progress1 .el-progress-bar__inner{
        background: linear-gradient(90deg, #4366F3, #1D43F3);
    }
    /deep/ .progress2 .el-progress-bar__inner{
        background: linear-gradient(90deg, #4721CA, #8651F4);
    }
    /deep/ .progress3 .el-progress-bar__inner{
        background: linear-gradient(90deg, #9837DD, #E23AF5);
    }
    /deep/ .progress4 .el-progress-bar__inner{
        background: linear-gradient(90deg, #4721CA, #8651F4);
    }
    /deep/ .progress5 .el-progress-bar__inner{
        background: linear-gradient(90deg, #9837DD, #E23AF5);
    }


    /deep/ .el-progress-bar__outer{
        /*background: linear-gradient(90deg, #4366F3, #1D43F3);*/
    }

    .trend-title{
        text-align: center;
        margin-bottom: 1rem;
    }

    .progress{
        display: flex;
        justify-content: space-between;
    }

    .filled-amount{
        display: flex;
        align-items: center;
    }

    .filled-amount-icon{
        width: 50%;
        display: flex;
        align-items: center;
    }

    .filled-amount-icon img{
        width: 2rem;
        height: 2rem;
        margin-right: 0.5rem;
    }

    .filled-amount-count{
        color:#F39317;
        font-size: 1.25rem;
        margin-right: 0.5rem;
    }

    .filled-amount-up{
        width: 50%;
        display: flex;
        align-items: center;
    }

    .today-icon img{
        height: 2rem;
        width: 2rem;
    }

    .filled-amount-cate{
        display: flex;
        margin-top: 1.5rem;
    }

    .filled-amount-today{
        width: 50%;
        display: flex;
        align-items: center;
    }

    .today-icon{
        margin-right: 0.2rem;
    }

    .today-info-name{
        font-size: 0.8rem;
    }

    .today-info-value{
        font-weight: 800;
    }

    .infoList{
        padding-left: 2rem;
        box-sizing: border-box;
        height: 43rem;
        overflow-y: scroll;
        display: grid;
        grid-template-columns:45% 45%;
        grid-template-rows: repeat(7.5rem);
        grid-row-gap: 0.44rem;
        grid-column-gap: 1.88rem;

    }



    .infoList::-webkit-scrollbar { width: 0 !important };
</style>