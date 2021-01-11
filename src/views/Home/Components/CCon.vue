<template>
    <div id="ccon">
        <div class="container">
          <div class="list">
            <div class="item">
                <div class="icon">
                    <img src="../../../assets/数据概览/医联体.png" alt="">
                </div>
                <div class="info">
                  <div class="name">通过认证医联体</div>
                  <div class="number"><span>{{this.$store.state.content.sum_pass_unit}}</span>家</div>
                </div>
            </div>
              <div class="item">
                  <div class="icon">
                      <img src="../../../assets/数据概览/医院总数.png" alt="">
                  </div>
                  <div class="info">
                      <div class="name">通过认证医院总数</div>
                      <div class="number"><span>{{this.$store.state.content.sum_pass_hospital}}</span>家</div>
                  </div>
              </div>
              <div class="item">
                  <div class="icon">
                      <img src="../../../assets/数据概览/注册.png" alt="">
                  </div>
                  <div class="info">
                      <div class="name">注册医院总数</div>
                      <div class="number"><span>{{this.$store.state.content.sum_register_hospital}}</span>家</div>
                  </div>
              </div>
          </div>
          <Map/>
        </div>


        <div id="chart" style="width: 100%;height: 12.5rem;"
             v-loading="$store.state.isLoading1"
             element-loading-text="拼命加载中"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(0, 0, 0, 0)"
        ></div>
    </div>
</template>

<script>
import Map from '@/components/Map'

  export default {
    name: "CCon",
    components:{
      Map
    },
    data(){
      return {

        data:[
          {
            name:'通过认证医联体',

          },
          {
            name:'通过认证医院总数',

          },
          {
            name:'注册医院总数',

          }
        ],
        cityData:[],
        option:{
          title:{
            show:true,
            text:'各省注册量、建设中、通过认证数量',
            y:10,
            x:5,
            textStyle:{
              color:'#0096FF'
            }
          },
          grid:{
            x:25,
            x2:25,
            y2:50
          },
          color:['#7AE911','#FF8B19','#04B7FF'],
          legend: {
            data: ['注册量', '建设中','通过认证量'],
            right:10,
            top:10,
            textStyle:{
              color:'#fff'
            }
          },
          tooltip:{
            show:true
          },
          calculable: true,
          xAxis: [
            {
              type: 'category',
              data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
              axisLabel: {
                interval:0,//代表显示所有x轴标签显示 b
                color:'#fff',
              },
            }
          ],
          yAxis: [
            {
              show:false,
              type: 'value',
            }
          ],
          series: [
            {
              name: '注册量',
              type: 'bar',
              barGap:0,
              barCategoryGap:'30%',
              data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
              itemStyle: {
                normal: {
                  label: {
                    show: true, //开启显示
                    position: 'top', //在上方显示
                    textStyle: { //数值样式
                    color: '#fff',
                    }
                  }
                }
              },
            },
            {
              name: '建设中',
              type: 'bar',
              barGap:0,
              barCategoryGap:'30%',
              data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
              itemStyle: {
                normal: {
                  label: {
                    show: true, //开启显示
                    position: 'top', //在上方显示
                    textStyle: { //数值样式
                    color: '#fff',
                    }
                  }
                }
              },
            },
            {
              name: '通过认证量',
              type: 'bar',
              barGap:0,
              barCategoryGap:'30%',
              data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
              itemStyle: {
                normal: {
                  label: {
                    show: true, //开启显示
                    position: 'top', //在上方显示
                    textStyle: { //数值样式
                    color: '#fff',
                    }
                  }
                }
              },
            }
          ],
          dataZoom: [
            {
              show: true, // 为true 滚动条出现
              realtime: true,
              type:'slider', // 有type这个属性，滚动条在最下面，也可以不行，写y：36，这表示距离顶端36px，一般就是在图上面。
              y:180,
              height: 10, // 表示滚动条的高度，也就是粗细
              end: 30
            },
            {
              show: true, // 为true 滚动条出现
              realtime: true,
              type:'inside', // 有type这个属性，滚动条在最下面，也可以不行，写y：36，这表示距离顶端36px，一般就是在图上面。
              y:180,
              height: 10, // 表示滚动条的高度，也就是粗细
              end: 30
            }
          ]
        }
      }
    },
    async  mounted() {
      await this.getCityData();
      this.drewChart();
    },
    methods:{
       getCityData(){    // 获取下方柱状图数据
        const data = this.$store.state.content.zhu_info;
        this.cityData = data;

      },
      // 渲染柱状图
     drewChart(){
        this.loading = false;   // 隐藏加载图示

       let num = this.cityData.map(i => {
         return i.num;
       });
        let build_num = this.cityData.map(i => {
          return i.build_num;
        });
        let pass_num = this.cityData.map(i => {
         return i.pass_num;
        });
       let province = this.cityData.map(i => {
         return i.province;
       });

       this.option.series[0].data = num;
       this.option.series[1].data = build_num;
       this.option.series[2].data = pass_num;
       this.option.xAxis[0].data = province;

       let chart = this.echarts.init(document.getElementById('chart'));
        chart.setOption(this.option);
      },
    },
    watch:{
      "$store.state.content": function() {
         this.getCityData();
        this.drewChart();
      },
      "$store.state.province": function(value) {
        let chart = this.echarts.init(document.getElementById('chart'));
        if(value){
          this.option.title.text = '各市注册量、建设中、通过认证数量';
        }else{
          this.option.title.text = '各省注册量、建设中、通过认证数量';
        }
        chart.setOption(this.option);
      }
    }
  }
</script>

<style scoped>
    #ccon{
      padding:0 1.25rem;
    }

    .container{
      box-sizing: border-box;
      padding: 1.25rem 0.88rem;
      height: 32vw;
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

    #chart{
      margin-top:2rem;
      background-image: url('~@/assets/数据概览/中下.png');
      background-size: 100% 100%;
    }
</style>