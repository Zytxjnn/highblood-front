<template>
    <div id="rank">
        <div class="rank-list">
            <div class="rank-item" v-for="(item,i) in data[areaArr[index]]">
                <div class="item-area"><span :style="{'color':i<=2 ? indexColor[i]:''}">NO.{{i+1}}</span>{{item.name}}</div>
                <div class="progress">
                    <el-progress

                            :stroke-width="15" :percentage="item.count"  :show-text="false"></el-progress>
                    <div>{{item.count}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "Rank",
    props:{
      index:{
        type:Number,
        default:0
      }
    },
    data(){
      return {
        indexColor:['#FFCB3D','#FB28F4','#32D6FF'],
        areaArr:['province_data','city_data','ylt_data'],
        data:{},
      }
    },
    created(){
      this.getData();
    },
    methods:{
      async getData(){
        const {data} = await this.$axios.get('http://newhyper.chinacpc.mobi/api/v1/qc/rank');
        this.data = data.data;
      },
    },
    watch:{
      '$store.state.province'(val){

        this.$axios.get('http://newhyper.chinacpc.mobi/api/v1/qc/rank',{
          params:{
            province:this.$store.state.province,
          }
        }).then(res => {
          this.data = res.data.data;
        })
      },
      '$store.state.city'(val){

        this.$axios.get('http://newhyper.chinacpc.mobi/api/v1/qc/rank',{
          params:{
            city:this.$store.state.city,
          }
        }).then(res => {
          this.data = res.data.data;
        })
      }
    }
  }
</script>

<style scoped>
    #rank{
        height: 90%;
    }
    .rank-list{
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        overflow-y: scroll;
       
        margin-top: 0.875rem;

    }

    .rank-list::-webkit-scrollbar { width: 0 !important }

    .item-area{
        font-size:1.25rem;
        color:#CDCDCD;
        height: 1.875rem;
        line-height: 1.875rem;
    }
    .el-progress{
        margin-bottom: 0.625rem;
    }

    .progress{
        display: flex;
        justify-content: space-between;
    }


    /deep/ .el-progress{
        width: 90% !important;
    }
    /deep/ .el-progress-bar__inner{
        background: linear-gradient(90deg, #0477D5, #01D9FE) !important;
    }

    /deep/ .el-progress-bar__outer{
        width: 100% !important;
        background-color: #193F80 !important;
    }
   
</style>