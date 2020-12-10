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
        }
      }
    },
    mounted() {

    },
    methods:{
      sliderChange(e){
        this.$store.state.area_type = e+1;

        this.getRank()
      },
      getRank(){
        const params = new URLSearchParams();
        params.append('area_type',this.$store.state.area_type);
        params.append('data_type',this.type+1);
        switch (this.type+1) {
          case 1:
            params.append('province',this.$store.state.province);
            break;
          case 2:
            params.append('city',this.$store.state.city);
            break;
          case 3:
            params.append('hospital_joined_id',this.$store.state.hospital_joined_id);
            break;
        }
        params.append('start',this.$store.state.start);
        params.append('end',this.$store.state.end);


        this.$axios.post('http://gxyzkend.ccpmc.org/QualityControlIndex/getCoreRank',params).then(res => {
          this.$store.state.zkRank = res.data.data;
        })
      }
    }
  }
</script>

<style scoped>
    #range{
        width: 10rem;
        position: fixed;
        top: 0;
        left: 50%;
    }

    .range-tip{
        display: flex;
        color:#008599;
    }

    /deep/.el-slider__marks-text:nth-child(2){
        position: relative !important;
        right:100% !important;
        left: 5rem !important;
        width: 5rem;
        top: 1rem;
    }

    /deep/.el-slider__marks-text:nth-child(3){
        position: relative !important;
        right:10% !important;
        left: 10rem !important;
        width: 5rem;
        top: -1rem;
    }
</style>