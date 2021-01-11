<template>
    <div id="range">
        <el-slider v-model="$store.state.range1"
       :step="1" show-stops
        :max="type" :show-tooltip="false"
        @change="sliderChange"
        :marks="type === 1 ? marks1 : marks2 " ref="slider"></el-slider>
    </div>
</template>

<script>
    import {getCoreDetail,getCoreRank} from '@/utils/api'

  export default {
    name: "ControlRange",
    props:{
      type:Number
    },
    data(){
      return {
        value:0,
        marks1:{
          0:'国内对比',
          1:'省内对比',
        },
        marks2:{
          0:'国内对比',
          1:'省内对比',
          2:'市内对比',
        },
        e:1,
      }
    },
    mounted() {
      this.getInfoList(1); // 对比
    },
    methods:{
      sliderChange(e){

        this.$store.state.contrast_area = e === 1 ? '本省' : '全国'

        this.getRank(e+1);

        this.getInfoList(e+1); // 对比

      },
      getRank(area_type){
        const params = new URLSearchParams();
        params.append('area_type',area_type);
        params.append('data_type',2);
        params.append('city',this.$store.state.city);
        params.append('start',this.$store.state.start);
        params.append('end',this.$store.state.end);
        this.$axios.post(getCoreRank,params).then(res => {
          this.$store.state.zkRank = res.data.data;
        })
      },
      getInfoList(area_type){
        const params = new URLSearchParams();

        params.append('area_type',area_type);

        params.append('province',this.$store.state.province);

        params.append('start',this.$store.state.start);
        params.append('end',this.$store.state.end);
        this.$axios.post(getCoreDetail,params).then(res => {
          this.$store.state.infoList = res.data.data;

        })
      }
    },
    watch:{
      '$store.state.start'(){
          const params = new URLSearchParams();
          params.append('area_type',1);
          params.append('data_type',2);
          params.append('city',this.$store.state.city);
          params.append('start',this.$store.state.start);
          params.append('end',this.$store.state.end);
          this.$axios.post(getCoreRank,params).then(res => {
            this.$store.state.zkRank = res.data.data;
          })

      }
    }
  }
</script>

<style scoped>
    #range{
        width: 10rem;
        position: relative;
        right: 2rem;
        top: -0.5rem;
        /*position: fixed;*/
        /*top: 0;*/
        /*left: 50%;*/
    }

    .range-tip{
        display: flex;
        color:#008599;
    }

    /deep/.el-slider__marks-text{
      transform: translate(-25px,5px);
    }

    /deep/.el-slider__marks-text:nth-child(2){
        position: relative !important;

        left: 9.5rem !important;
        width: 5rem;
        top: 1rem;
    }



    /deep/ .el-slider__runway{
      height: 10px;
      background-color: #409EFF;
    }

    /deep/ .el-slider__button{
      width: 20px;
      height: 20px;
    }

    /deep/ .el-slider__stop{
      width: 12px;
      height: 12px;
      border:1px solid #409eff;
      transform: translate(-5px,-2px);
    }
</style>