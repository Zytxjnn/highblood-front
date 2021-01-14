<template>
  <div id="home">
    <Header :title='this.$store.state.sjTitle+ "高血压达标中心质控管理平台"' />
    <div id="container">
      <el-row>
        <el-col :span="6">
          <preButton/>
          <div class="blChart"  v-loading='BlisLoding'
               element-loading-text="拼命加载中"
               element-loading-spinner="el-icon-loading"
               element-loading-background="rgba(0, 0, 0, 0)">
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
                    <div :class="[this.$store.state.currentDataIndex1 === 0 ? 'active1' : '']" @click="LupdataRankInfo(1)">省</div>
                    <div :class="[this.$store.state.currentDataIndex1 === 1 ? 'active1' : '']" @click="LupdataRankInfo(2)">市</div>
                    <div :class="[this.$store.state.currentDataIndex1 === 2 ? 'active1' : '']" @click="LupdataRankInfo(3)">医联体</div>
                </div>
            </div>
            <Rank3  />
          </div>
        </el-col>
        <el-col :span="12" >
          <div class="container">
             <div class="list">
            <div class="item" v-for="(item,i) in data"
                 v-loading='isCountLoding'
                 element-loading-text="拼命加载中"
                 element-loading-spinner="el-icon-loading"
                 element-loading-background="rgba(0, 0, 0, 0)">
                <div class="icon">
                    <img src="@/assets/数据概览/医院总数.png">
                </div>
                <div class="info">
                  <div class="name">{{item.name}}</div>
                  <div class="number"><span>{{item.number}}</span>{{i === 2 || i === 0 ? '例' : '家'}}</div>
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
                    <div :class="[currentDataIndex2 === 0 ? 'active2' : '']" @click="RupdataRankInfo(0)">省</div>
                    <div :class="[currentDataIndex2 === 1 ? 'active2' : '']" @click="RupdataRankInfo(1)">市</div>
                    <div :class="[currentDataIndex2 === 2 ? 'active2' : '']" @click="RupdataRankInfo(2)">医联体</div>
                </div>
            </div>
             <Rank2 :index="currentDataIndex2" />
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
    import Rank3 from  './Components/Rank3'
    import Rank2 from  './Components/Rank2'
    import Title from  './Components/Title'
    import Map from '@/components/Map2'
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
    Rank3,
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
      currentDataIndex1:0,
      currentDataIndex2:0,
      isCountLoding:true,
      LisrankLoading:false,  // 左下角数据是否正在加载
      RisrankLoading:false, // 右边数据是否正在加载
      BlisLoding:true, // 病例填报状态
      pageTitle:'全国高血压质控管理平台',
      scoreList:[],
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
              color:'#fff',
              fontSize:16
            },
            itemGap:20
          },
          graphic:{
            type:"text",
              // left:"30%",
            left:'31%',
            top:'center',
              // top:"45%",
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
              labelLine: {
                show: true
              },
              data: [
                {value: 1136, name: '填报中'},
                {value: 1113, name: '填报完成'},
                {value: 1136, name: '已审核'},
                {value: 736, name: '已归档'},
                {value: 536, name: '诊断中'}
              ],
               label: {
                normal: {
                    position:'inner',
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
            name:'累计填报病例总数',
            number:''
          },
          {
            name:'今日填报医院数量',
            number:''
          },
          {
            name:'今日填报病例总数',
            number:''
          }
      ],
      rankData:[]
    }
  },
  mounted(){
    this.$store.state.province = '';
    this.$store.state.city = '';
    this.$store.state.area_type = 1;
    this.$store.state.sjTitle = '全国';

     this.initBlChart();
     this.getScoreList(1)

    // this.getAllCount();
  },
  methods:{
    // 初始化 病例填报状态
    async initBlChart(province,city){
        let chart = this.echarts.init(document.getElementById('blChart'));

        const {data} = await this.$axios.get(`http://newhyper.chinahc.org.cn/api/v1/qc/count`);

        this.BlisLoding = false;

        for(let i in data.data.count){
          this.option.series[0].data[i].value =data.data.count[i].count;
          this.option.series[0].data[i].name =data.data.count[i].name;
        }

        this.option.graphic.style.text = ` 填报总数

${data.data.all_count}例`;

//       this.option.graphic.style.text = `填报总数
//
// 12365例`

      chart.setOption(this.option);


      this.data[0].number = data.data.all_count;
      this.data[1].number = data.data.today_org;
      this.data[2].number = data.data.today_count;
      this.isCountLoding = false;

    },
    LupdataRankInfo(i){
      this.$store.state.currentDataIndex1 = i-1;
      this.getScoreList(i)
    },
    RupdataRankInfo(index){
        this.RisrankLoading = true;
        this.currentDataIndex2 = index; // 切换高亮
        this.RisrankLoading = false;
    },
    getScoreList(data_type){

      const params = new URLSearchParams();
      const area_type = this.$store.state.area_type;
      const province = this.$store.state.province;
      const city = this.$store.state.city;
      // 1省 2市 3医联体
      switch (data_type){
        case 1:
          params.append('area_type',1);
          params.append('data_type',1);
          break;
        case 2:
          params.append('data_type',2);
          if(area_type === 1){
            params.append('area_type',1);
          }else if(area_type === 2 || area_type === 3){
            params.append('area_type',2);
            params.append('province',province);
          }
          break;
        case 3:
          params.append('area_type',area_type);
          params.append('data_type',3);
          if(area_type === 2){
            params.append('province',province);
          }else if(area_type === 3){
            params.append('city',city);
          }


      }
      this.$axios.post('http://hbqc.ccpmc.org/QualityControlScore/getScoreList',params).then(res => {
        this.$store.state.scoreList = res.data.data;
      });
    },
    getAllCount(){
      this.$axios.get('http://newhyper.chinahc.org.cn/api/v1/qc/count').then(res => {
        this.data[0].number = res.data.data.all_count;
        this.data[1].number = res.data.data.today_org;
        this.data[2].number = res.data.data.today_count;
        this.isCountLoding = false;
      })


    }
  },
  watch:{
    '$store.state.province'(val){
      this.BlisLoding = true;
      this.isCountLoding = true;
      const url = val ? `http://newhyper.chinahc.org.cn/api/v1/qc/count?province=${val}` : `http://newhyper.chinahc.org.cn/api/v1/qc/count`
      this.$axios.get(url).then(res => {
         this.data[0].number = res.data.data.all_count;
        this.data[1].number = res.data.data.today_org;
        this.data[2].number = res.data.data.today_count;

        let chart = this.echarts.init(document.getElementById('blChart'));

        for(let i in res.data.data.count){
          this.option.series[0].data[i].value =res.data.data.count[i].count;
          this.option.series[0].data[i].name =res.data.data.count[i].name;
        }

        this.option.graphic.style.text = `填报总数
 ${res.data.data.count.reduce((pre,next) => pre + next.count, 0)}例`;

        chart.setOption(this.option);

        this.BlisLoding = false;
        this.isCountLoding = false;
      })



    },
    '$store.state.city'(val){
      this.BlisLoding = true;
      const url = val ? `http://newhyper.chinahc.org.cn/api/v1/qc/count?city=${val}` : `http://newhyper.chinahc.org.cn/api/v1/qc/count?province=${this.$store.state.province}`

        this.isCountLoding = true;
        this.$axios.get(url).then(res => {
          this.data[0].number = res.data.data.all_count;
          this.data[1].number = res.data.data.today_org;
          this.data[2].number = res.data.data.today_count;
          let chart = this.echarts.init(document.getElementById('blChart'));

          for(let i in res.data.data.count){
            this.option.series[0].data[i].value =res.data.data.count[i].count;
            this.option.series[0].data[i].name =res.data.data.count[i].name;
          }

          this.option.graphic.style.text = `填报总数
 ${res.data.data.count.reduce((pre,next) => pre + next.count, 0)}例`;

          chart.setOption(this.option);

          this.BlisLoding = false;
          this.isCountLoding = false;
        })


    }
  }
}
</script>

<style scoped>
  #home{
    height: 100%;
    width: 100%;
    overflow-y: scroll;
    background-image: url('~@/assets/数据概览/bj.png');
    background-size: 100% 100%;
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
        font-weight: bolder;
        font-size: 3rem;
        color:#FCFF0C;
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
      height: 98vh;
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
        height: 1.25rem;
    }

    .methods div{
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        width: 3rem;
        height: 100%;
        box-sizing: border-box;
        
        
        opacity: 0.6;
        font-size: .88rem;
        color:#fff;
    }

    .active1{
      background-color: #084ecc;
    }

      .active2{
          background-color: #084ecc;
      }
    .el-col{
        padding-top: 2rem;
    }

  .title{
    display: flex;
    line-height: 2rem;
    justify-content: space-between;
    align-items: center;
  }

</style>