<template>
    <div id="rcon">
       <div class="youshang">
          <Title title="智享版认证情况" />
          <Wisdom />
       </div>
      <nextButton/>
        <div class="youxia">
          <Title title="注册医院分类统计"  />
          <div id="main" style="width: 100%;height:100%;"
               v-loading='isLoading'
               element-loading-text="拼命加载中"
               element-loading-spinner="el-icon-loading"
               element-loading-background="rgba(0, 0, 0, 0.8)" >
          </div>
        </div>
    </div>
</template>

<script>
    import Title from "./Title";
    import Wisdom from "./Wisdom";
    import nextButton from "./nextButton";
  export default {
    name: "RCon",
    components:{
      Title,
      Wisdom,
      nextButton
    },
    data(){
      return {

        isLoading:true,
        option:{
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
            bottom:-20,
            y:'bottom',
            textStyle:{
              fontSize:20,
              color:'#fff'
            }

          },
          color:['#1792E6','#94D4FF','#2B71FF'],
          series: [
            {
              name: '医院分类',
              type: 'pie',
              radius: '55%',
              avoidLabelOverlap: false,
              label: {
                normal:{
                  position:'outer',
                  formatter:'{d}%',
                  fontSize: 20
                }
              },
              labelLine: {
                show: true
              },
              data: [
                {value: 465, name: '一级医院'},
                {value: 1465, name: '二级医院'},
                {value: 165, name: '三级医院'},
              ]
            }
          ]
        }
      }
    },
    async mounted() {
        this.updataBing_content();
    },
    methods:{
      updataNormalInfoData(){
        this.normalData[0].count = this.$store.state.content.sum_pass_unit_2;
        this.normalData[1].count = this.$store.state.content.sum_build_unit_2;
        this.normalData[2].count = this.$store.state.content.sum_pass_hospital_2;
        this.normalData[3].count = this.$store.state.content.sum_build_hospital_2;
      },
      updataBing_content(){

        var myChart = this.echarts.init(document.getElementById('main'));

        const {bing_content} = this.$store.state.content;



        for(let i in bing_content){   // 获取数据后改变options

          this.option.series[0].data[i].value = bing_content[i].y;
          this.option.series[0].data[i].name = bing_content[i].x;
        }

        this.isLoading = false;   // 数据请求成功，隐藏加载框

        myChart.setOption(this.option);
      }
    },
    watch:{
      "$store.state.content": function() {
        console.log('content update')

        this.updataBing_content();

        this.updataNormalInfoData();
      }
    }
  }
</script>

<style scoped>
    #main{
        display: flex;
        margin-top: 0.6875rem;
    }

    .youshang{
        box-sizing: border-box;
        width: 100%;
        height: 15.63rem;
        padding: 0.625rem 1.25rem;
        background-image: url('../../../assets/数据概览/左上.png');
        background-size: 100% 15.63rem;
    }

    .youxia{
      display: flex;
      flex-direction: column;
      align-items: center;
      box-sizing: border-box;
      padding:.3rem 1.13rem;
      margin-top: 2rem;
      width: 100%;
      height: 58vh;
      background-image: url('../../../assets/数据概览/右下.png');
      background-size:100% 100%;
    }

    .youxia #title{
      width: 100%;
      text-align: left;
      display: flex;
      line-height: 1.6rem;
      justify-content: space-between;
    }

    .title{
      display: flex;
      line-height: 1.6rem;
      justify-content: space-between;
    }

</style>