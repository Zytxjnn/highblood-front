<template>
  <div id="home">
      <Header :title="pageTitle" />
      <div id="charts">
          <div class="charts-item" style="height: 20rem;width: 26rem;" v-for="item in datas">

          </div>
      </div>
      <Sidebar/>
  </div>
</template>

<script>
import Header from "@/components/Header";
import preButton from "./Components/preButton";
import nextButton from "./Components/nextButton";
import Date from '@/components/Date';
import Sidebar from "@/components/Sidebar";


export default {
    components:{
      Header,
      preButton,
      nextButton,
      Date,
      Sidebar
    },
    data(){
      return {
        pageTitle:'全国高血压达标中心质控管理平台',
        colorList:['rgba(178, 242, 181, 0.3)','rgba(53, 186, 255, 0.3)','rgba(73, 126, 234, 0.3)'],
        colorIndex:[],
        datas:[0,1,2,3,4,5,6,7,8,9],
      }
    },
    mounted(){
        this.getChartsData();
    },
    methods:{
      async getChartsData(){
        for(let i in this.datas){
          let options = await this.getOptions();
          let chart = this.echarts.init(document.getElementsByClassName('charts-item')[i]);

          chart.setOption(options)
        }
      },
      async getOptions(){
        // const {data} = await this.$axios.get('https://easy-mock.com/mock/5ddb3ba9f2b7914af934a799/example/options');
        const _this = this;
        // return data.data.options;
        return {
          grid:{
            height:'65%',
            bottom:'10%',
            left:'15%',
          },
          title:{
            show:true,
            text:'1.高血压整治例数',
            textStyle:{
              color:'#FFF',
              fontWeight:'200'
            },
            padding:[
                12.31,1000,10,10
            ],
            backgroundColor:'#3A3D75'
          },
          xAxis: {
            type: 'category',
            name:'月',
            data: ['19.04', '05', '06', '07','08', '09', '10', '11', '12','01', '02','20.04'],
            axisLabel:{
              color:(e) => {
                return e.length > 2 ? '#19B0FF' :'#D6D7ED'
              },
              interval:0,
            },
            axisLine:{
                lineStyle:{
                  color:'#9A9CB8'
                }
            },
            axisTick:{
              show:false
            },
            nameTextStyle:{
              color:'#D6D7ED'
            }
          },
          tooltip:{
            show:true,
            trigger:'axis',
            formatter:(data) => {
              let myColor = `${_this.colorIndex[data[0].dataIndex]}`;
              return `<div style="
                                   display: flex;
                                   flex-direction: column;
                                   align-items: center;
                                  border-radius:10%;border:0.1rem solid ${myColor};
                                  color: ${_this.colorIndex[data[0].dataIndex]};
                                  width: 6rem;text-align: center;
                                  background-image: url("~@/assets/数据概览2/绿框.png")";
                                 >

                    50%</br>
                    标准值:${data[1].value}
                    </div>`;
            }
          },
          yAxis: [
            {
              type: 'value',
              name: '例',
              axisLabel:{
                color:'#D6D7ED'
              },
              axisLine:{
                lineStyle:{
                  color:'#9A9CB8'
                }
              },
              axisTick:{
                show:false
              },
              splitLine:{
                show:false
              },
              nameTextStyle:{
                color:'#D6D7ED'
              }
            },
            {
              show:false,
              max:5000,
              min:0,
              interval:1000,

            }
          ],
          legend: {
            data: ['蒸发量', '平均温度']
          },
          series: [
            {
            data: [1200, 2000, 1500, 800, 700, 1100, 1300,4100, 2000, 3500, 800, 700],
            type: 'bar',
            barWidth:10,
            itemStyle:{
                normal:{
                  color:() => {
                    const colorList = ['rgba(178, 242, 181, 1)','rgba(53, 186, 255, 1)','rgba(73, 126, 234, 1)'];
                    let colorIndex = Math.round(Math.random()*2);
                    _this.colorIndex.push(colorList[colorIndex]);
                    return colorList[colorIndex];

                  },
                  barBorderRadius:[10,10,0,0]
                }
            },
            showBackground: true,
            backgroundStyle: {
              barBorderRadius:[10,10,0,0]
            }
          },
            {
              type: 'line',
              yAxisIndex: 1,
              symbolSize:6,
              data: [1000,1200,1400,1600,1000,2000,1200,3600,1000,2000,1000,2000],
              itemStyle : {
                normal : {
                  color:'#fff',
                  lineStyle:{
                    color:'#fff'
                  }
                }
              }
            }
          ],
          backgroundColor:'#22254C',
        }
      }
    }
}
</script>

<style scoped>
    #home{
        height: 100%;
        overflow-y: scroll;

        background-image: url("~@/assets/数据概览/bj.png");
    }

    #charts{
        padding:0 3.75rem;
        display: flex;
        justify-content: space-between;
        flex-wrap:wrap;
    }

    #charts .charts-item{
        padding-top: 1.88rem;
    }

</style>