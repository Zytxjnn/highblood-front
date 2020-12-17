<template>
    <div id="range">
        <el-slider v-model="value"
                   :step="1" show-stops
                   :max="type" :show-tooltip="false"
                   @change="sliderChange"
                   :marks=" marks2"></el-slider>
    </div>
</template>

<script>
    import {getCoreDetail,getCoreRank} from '@/utils/api'

  export default {
    name: "ControlRange2",
    props:{
      type:Number
    },
    data(){
      return {
        value:0,

        marks2:{
          0:'国内对比',
          1:'省内对比',
          2:'市内对比',
        },
        id:'',
        name:'',
        province:'',
        city:''
      }
    },
    mounted() {

      this.id= this.$route.query.id;
      this.name= this.$route.query.name;
      this.province= this.$route.query.province;

      this.city= this.$route.query.city;


      this.getInfoList(1); // 对比

      this.getRank(1);
    },
    methods: {
      sliderChange(e) {
        this.$store.state.contrast_area = e === 0 ? '全国' : e === 1 ? '本省' : '本市'

        this.getRank(e + 1);

        this.getInfoList(e + 1); // 对比

      },
      getRank(area_type) {
        const params = new URLSearchParams();
        params.append('area_type', area_type);
        if (this.$route.path === '/hospital'){
          params.append('data_type',4)
          params.append('hospital_id',this.$route.query.id)
        }else{
          params.append('data_type',3)
          params.append('hospital_joined_id',this.$route.query.id)
        }

        params.append('start', this.$store.state.start);
        params.append('end', this.$store.state.end);
        this.$axios.post(getCoreRank, params).then(res => {
          this.$store.state.zkRank = res.data.data;
        })
      },
      getInfoList(area_type) {
        this.$store.state.area_type = area_type;

        const params = new URLSearchParams();
        params.append('area_type', area_type);
        switch (area_type) {
            case 1:

              break;
            case 2: // 省内对比

              params.append('province',this.province);
            break;
            case 3: // 市内对比

              params.append('city',this.city);
            break;
        }
        params.append('start', this.$store.state.start);
        params.append('end', this.$store.state.end);
        this.$axios.post(getCoreDetail, params).then(res => {
          this.$store.state.infoList = res.data.data;
          this.$store.dispatch('setInfoList',res.data.data);
        })
      }
    },
    watch:{
      '$store.state.start'(){
        // 更换时间后 刷新排名信息
        const params = new URLSearchParams();
        params.append('area_type',this.$store.state.area_type);
        params.append('data_type',4);
        params.append('hospital_id',this.$route.query.id);
        params.append('start',this.$store.state.start);
        params.append('end',this.$store.state.end);
        this.$axios.post(getCoreRank,params).then(res => {
          this.$store.state.zkRank = res.data.data;
        })

        const params2  = new URLSearchParams();
        params2.append('area_type',this.$store.state.area_type);
        params2.append('start',this.$store.state.start);
        params2.append('end',this.$store.state.end);
        params2.append('hospital_id',this.$route.query.id);

        this.$axios.post(getCoreDetail,params2).then(res => {

          this.$store.state.infoList = res.data.data;

        })
      }
    }
  }
</script>

<style scoped>
    #range{
        width: 12rem;
        position: fixed;
        top: 1.5rem;
        right: 37rem;
    }

    .range-tip{
        display: flex;
        color:#008599;
    }

    /deep/.el-slider__marks-text{
      transform: translate(-30px,10px);
    }

    /deep/.el-slider__marks-text:nth-child(2){
        position: relative !important;
        right:100% !important;
        left: 6.5rem !important;
        width: 5rem;
        top: 1rem;
    }

    /deep/.el-slider__marks-text:nth-child(3){
        position: relative !important;
        right:10% !important;
        left: 12rem !important;
        width: 5rem;
        top: -1rem;
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