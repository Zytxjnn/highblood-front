<template>
  <div id="home">
      <Header :title="this.$store.state.sjTitle+ '高血压达标中心质控管理平台'" />
      <div id="charts">
          <div class="charts-item" style="height: 100%;width:100%;" v-for="item in datas">

          </div>
      </div>
      <Sidebar/>
      <pre-button/>
      <next-button/>
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
        options:[]
      }
    },
   async mounted() {
     console.log(this.$store.state.province)
     await this.getChartsData();
   },
    methods:{
        async getChartsData(){
          const params = new URLSearchParams();
          params.append('area_type',this.$store.state.area_type);
          switch (this.$store.state.area_type) {
            case 2:
              params.append('province',this.$store.state.province);
              break;
            case 3:
              params.append('city',this.$store.state.city);
              break;
          }
          this.$axios.post('http://gxyzkend.ccpmc.org/QualityControlIndex/getCoreDetailForDataView',params)
            .then(res => {
              this.options =  res.data.data;
              for(let i in this.datas){
                let options =   this.setOptions(i);
                let chart = this.echarts.init(document.getElementsByClassName('charts-item')[i]);
                chart.setOption(options)
              }
            });


      },
      setOptions(i){
        const _this = this;

        let option = {
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
                fontWeight:'200',
                fontSize:14
            },
            padding:[
              5,1000,5,20
            ],
              backgroundColor:'#3A3D75'
          },
          xAxis: {
            type: 'category',
              name:'月',
              data: ['19.04', '05', '06', '07','08', '09', '10', '11', '12','01', '02','20.04'],
              axisLabel:{
              interval:0,
               
                color:(e) => {
                return e.length > 2 ? '#19B0FF' :'#D6D7ED'
              },

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
              formatter:''
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
              },
            },
            {
              show:false,
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
        };



        // 处理option start
        option.title.text = this.options[i].core_name;
        option.xAxis.data = this.options[i].x_list;
        option.series[0].data = this.options[i].y_left_list;
        option.series[1].data = this.options[i].y_right_list;
        option.yAxis[0].name = this.options[i].core_unit.left;

        var Min = this.calMin([this.options[i].y_left_list, this.options[i].y_right_list]),
          Max = this.calMax([this.options[i].y_left_list, this.options[i].y_right_list])

        option.yAxis[0].max = Max;
        option.yAxis[0].min = Min;
        option.yAxis[0].interval = (Max-Min) / 5;

        var Min2 = this.calMin([this.options[i].y_left_list, this.options[i].y_right_list]),
          Max2 = this.calMax([this.options[i].y_left_list, this.options[i].y_right_list])
        option.yAxis[1].max = Max2;
        option.yAxis[1].min = Min2;
        option.yAxis[1].interval = (Max2-Min2) / 5;

        if(this.options[i].core_unit.unit === 2){
          option.tooltip.formatter =  (data) => {

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

                    实际值:${_this.options[i].y_left_list[data[1].dataIndex]}%</br>
                    标准值:${_this.options[i].y_right_list[data[1].dataIndex]}%
                    </div>`;
          }
        }else{
          option.tooltip.formatter =  (data) => {
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

                     实际值:${_this.options[i].y_left_list[data[1].dataIndex]}</br>
                    标准值:${_this.options[i].y_right_list[data[1].dataIndex]}
                    </div>`;
          }
        }





        // 处理option end
        return option;
      },
       calMax(arr){
         let max = 0;
         arr.forEach((el) => {
           el.forEach((el1) => {
             if (!(el1 === undefined || el1 === '')) {
               if (max < el1) {
                 max = el1;
               }
             }
           })
         })
         let maxint = Math.ceil(max / 9);//不让最高的值超过最上面的刻度
         let maxval = maxint * 10;//让显示的刻度是整数
         return maxval;
       },
      calMin(arr){ // 计算最小值
        let min = 0;
        arr.forEach((el) => {
          el.forEach((el1) => {
            if (!(el1 === undefined || el1 === '')) {
              if (min > el1) {
                min = el1;
              }
            }
          })
        })
        let minint = Math.floor(min / 10);
        let minval = minint * 10;//让显示的刻度是整数
        return minval;
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
        padding:1.88rem 3.75rem;
        display: grid;
        grid-template-columns: repeat(4,23%);
        grid-template-rows: repeat(3,15rem);
        grid-row-gap: 1.88rem;
        grid-column-gap: 2.5rem;
        /*display: flex;*/
        /*justify-content: space-between;*/
        /*flex-wrap:wrap;*/
    }

    #charts .charts-item{

    }

</style>