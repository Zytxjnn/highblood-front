<template>
    <div class="content row-flex-start" style="width:100%;height:100%">
        <div class="left_map" id="left_map"
             v-loading='$store.state.isLoading2'
             element-loading-text="拼命加载中"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(0, 0, 0, 0.8)"></div>
        <div class="back"  v-show="$store.state.province" @click="mapBack">返回</div>
    </div>
</template>

<script>
  import echarts from 'echarts'
  import china from 'echarts/map/json/china'
  import axios from 'axios'
  echarts.registerMap('china', china);

  let map = {};
  var provinces = ['shanghai', 'hebei', 'shanxi', 'neimenggu', 'liaoning', 'jilin', 'heilongjiang', 'jiangsu', 'zhejiang', 'anhui', 'fujian', 'jiangxi', 'shandong', 'henan', 'hubei', 'hunan', 'guangdong', 'guangxi', 'hainan', 'sichuan', 'guizhou', 'yunnan', 'xizang', 'shanxi1', 'gansu', 'qinghai', 'ningxia', 'xinjiang', 'beijing', 'tianjin', 'chongqing', 'xianggang', 'aomen', 'taiwan']
  var provincesText = ['上海', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '广西', '海南', '四川', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '北京', '天津', '重庆', '香港', '澳门', '台湾'];

  export default {
    created () {
    },
    mounted () {
      this.initMap();
    },
    data () {
      return {
        map: {},
        historyPlaceRecord:{
          name:'',
          count:0
        }
      }
    },
    methods: {
      getMapOpt (place) {
        const option = {
          //   backgroundColor: '#F3F3F3', //地图背景颜色
          //以下是地图标题，我在此处设空，需要的可以自己加上
          title: {
            text: '',
            subtext: '',
            left: 'center'
          },
          geo: {
            map: place || 'china',
            label: {
              emphasis: {
                show: false
              },
              // 不需要显示地名可直接删除normal此项
              normal: {
                show: true, // 是否显示对应地名
                textStyle: {
                  color: 'rgba(0,0,0)'
                }
              }
            },
            roam: true,
            itemStyle: {
              normal: {
                areaColor: '#6FA7CE', //地图颜色
                borderColor: '#fff' //地图边线颜色
              },
              emphasis: {
                areaColor: '#B7DFED' //鼠标移入颜色
              }
            }
          }
        }
        return option
      },
      getProvinceMapOpt (provinceAlphabet,provincesText) {
        axios.get('province/' + provinceAlphabet + '.json').then((s) => {   // 请求地图文件
          this.$store.state.area_type = 2;
          this.$store.state.province = provincesText;

          this.$store.state.sjTitle = provincesText+'省';

          this.getScoreListByProvince(provincesText);

          echarts.registerMap(provinceAlphabet, s.data);
          const option = this.getMapOpt(provinceAlphabet);

          this.$store.state.isLoading2 = false;   // 地图加载完成

          map.setOption(option,true);

          map.off('click');    // 清除重复绑定的click事件

          map.on('click',(param) => {

            this.$store.state.sjTitle = param.name; // 头部标题（区域）

            this.$store.state.area_type = 3;
            this.$store.state.city = param.name;

            this.getScoreListByCity(param.name);
            // this.$store.state.province = provincesText;
            // getScoreListByCity(param);
            if(this.historyPlaceRecord.count<2) this.historyPlaceRecord.count ++;
            // 使用高德地图api将名字转为adcode
            let key = "89bdfc2779ab66544defb8f8b81258d6";
            // 请求下一级数据
            axios.get(`https://restapi.amap.com/v3/config/district?keywords=${param.name}&subdistrict=2&key=${key}`).then(s =>{

              let adcode = s.data.districts[0].adcode; // 获取adcode

              axios.get('city/'+adcode+'.json').then(s => { // 根据code请求地图json，渲染地图
                echarts.registerMap(provinceAlphabet, s.data);
                const option = this.getMapOpt(provinceAlphabet);
                map.setOption(option, true)
              })
            })
          })
        })
      },
      initMap () {
        var dom = document.getElementById('left_map')
        map = echarts.init(dom)
        const option = this.getMapOpt()
        if (option && typeof option === 'object') {
          map.setOption(option, true)

          this.$store.state.isLoading2 = false;   // 地图加载完成
        }

        map.off('click');
        map.on('click', (param) => {
          this.$store.state.isLoading2 = true;

          if(this.historyPlaceRecord.count<2) this.historyPlaceRecord.count ++;

          // 添加进地图历史距离，用来地图返回
          event.stopPropagation()// 阻止冒泡
          // 找到省份名
          const provinceIndex = provincesText.findIndex(x => {
            return param.name === x
          })
          //在这里判断provincesText中是否包含点击的省份名，有则渲染省级地图，无则无处理（需要可从此获得）
          if (provinceIndex === -1) return

          const provinceAlphabet = provinces[provinceIndex]
          this.historyPlaceRecord.name = provinceAlphabet;
          // 重新渲染各省份地图
          this.getProvinceMapOpt(provinceAlphabet,param.name)
        })
      },
      getScoreListByProvince(provincesText){
        const params = new URLSearchParams();

        if(this.$store.state.currentDataIndex1 === 0){
          params.append('area_type',1);
        }else{
          params.append('area_type',this.$store.state.area_type-1 >= 2 ? 1 : 2);
        }
        params.append('data_type',this.$store.state.currentDataIndex1+1);
        params.append('province',provincesText);
        this.$axios.post('http://hbqc.ccpmc.org/QualityControlScore/getScoreList',params).then(res => {
          this.$store.state.scoreList = res.data.data;

        })
      },
      getScoreListByCity(cityText){
        const params = new URLSearchParams();

        if(this.$store.state.currentDataIndex1 === 1){
          params.append('area_type',2);
          params.append('data_type',2);
          params.append('province',this.$store.state.province);
        }else if(this.$store.state.currentDataIndex1 === 0){
          params.append('area_type',1);
          params.append('data_type',1);
          params.append('province',this.$store.state.city);
        }else{
          params.append('area_type',this.$store.state.area_type);
          params.append('data_type',this.$store.state.currentDataIndex1+1);
          params.append('city',cityText);
        }

        this.$axios.post('http://hbqc.ccpmc.org/QualityControlScore/getScoreList',params).then(res => {
          this.$store.state.scoreList = res.data.data;
        })
      },
      // 地图返回
      mapBack(){
        this.$store.state.isLoading2 = true;


        const params = new URLSearchParams();

        if(this.historyPlaceRecord.count>0)this.historyPlaceRecord.count --;

        if(this.historyPlaceRecord.count === 0){  // 返回到全国地图

          this.$store.state.sjTitle = '全国';   // 改变标题

          this.$store.state.province = '';
          this.$store.state.area_type = 1;


          params.append('area_type',this.$store.state.area_type);
          params.append('data_type',this.$store.state.currentDataIndex1+1);
          this.$axios.post('http://hbqc.ccpmc.org/QualityControlScore/getScoreList',params).then(res => {
            this.$store.state.scoreList = res.data.data;
          });

          this.initMap();
          this.historyPlaceRecord.name = '';
          return false;
        }else{
          this.$store.state.isLoading2 = false;

          this.$store.state.sjTitle = this.$store.state.province;

          this.getScoreListByProvince(this.$store.state.province);
          this.$store.state.area_type = 2;
          this.$store.state.city = '';



          axios.get('province/'+this.historyPlaceRecord.name+'.json').then(s => { // 返回到省级地图
            echarts.registerMap(this.historyPlaceRecord.name, s.data);
            const option = this.getMapOpt(this.historyPlaceRecord.name);
            map.setOption(option,true);
            this.historyPlaceRecord.name = '';
          })
        }

      }
    }
  }
</script>

<style scoped>
    .left_map {
        height: 90%;
    }

    .content{
        position: relative;
    }

    .back{
        margin-top: 1.88rem;
        display: flex;
        justify-content: center;
        text-align: center;
        align-items: center;
        background-image: url('~@/assets/数据概览2/返回.png');
        background-size:100% 100%;
        width: 6.28rem;
        height: 2.61rem;
        user-select: none;
        position: absolute;
        top: 0;
        left: 0;
        color:#00E4FF;
        cursor:pointer;
    }


</style>

