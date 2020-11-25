<template>
    <div id="rcon">
       <div class="youshang">
          <Title title="智享版认证情况" />
          <normal-info :normalData="normalData" />
       </div>
      <nextButton/>
        <div class="youxia">
          <Title title="注册医院分类统计"  />
          <div id="main" style="width: 85%;height:85%;">
          </div>
        </div>
    </div>
</template>

<script>
    import Title from "./Title";
    import NormalInfo from "@/components/NormalInfo";
    import nextButton from "./nextButton";
  export default {
    name: "RCon",
    components:{
      Title,
      NormalInfo,
      nextButton
    },
    data(){
      return {
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
        ],
        option:{
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
            bottom:-20,
            y:'bottom',
            textStyle:{
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
                  formatter:'{d}%'
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
    mounted() {
      var myChart = this.echarts.init(document.getElementById('main'));
      myChart.setOption(this.option)
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
    }
</style>