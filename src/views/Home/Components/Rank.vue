<template>
    <div id="rank" v-loading='isLoading'
         element-loading-text="拼命加载中"
         element-loading-spinner="el-icon-loading"
         element-loading-background="rgba(0, 0, 0, 0)" >
        <div class="rank-list">
            <div class="rank-item" v-show="showProvince" v-for="(item,index) in $store.state.content.pass_hospital_by_province">
                <div class="item-area"><span :style="{'color':index<=2 ? indexColor[index]:''}">NO.{{index+1}}</span>{{item.province}}</div>
                <div class="progress" style="color: #fff">
                    <el-progress
                            :style="[{width: item.num+'%'}]"
                            :stroke-width="15" :percentage="Number(item.num)"  :show-text="false"></el-progress>
                    <div class="score">{{item.num}}</div>
                </div>
             </div>
            <div class="rank-item" v-show="!showProvince" v-for="(item,index) in $store.state.content.pass_hospital_by_city">
                <div class="item-area"><span :style="{'color':index<=2 ? indexColor[index]:''}">NO.{{index+1}}</span>{{item.city}}</div>
                <div class="progress">
                    <el-progress
                            :style="[{width: item.num+'%'}]"
                            :stroke-width="15" :percentage="Number(item.num)"  :show-text="false"></el-progress>
                  <div class="score">{{item.num}}</div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "Rank",
    props:{
      showProvince:true
    },
    data(){
      return {
        indexColor:['#FFCB3D','#FB28F4','#32D6FF'],
        isLoading:true,
      }
    },
    created(){
      this.isLoading = $store.state.content || true;
    },
    watch:{
      '$store.state.content'(){
        this.isLoading = false;
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
        color: #fff !important;
        margin-bottom: 0.625rem;
    }

    .progress{
        display: flex;
        justify-content: space-between;
    }

    /deep/ .el-progress{
        width: 90% !important;
      color: #fff !important;

    }
    /deep/ .el-progress-bar__inner{
        background: linear-gradient(90deg, #0477D5, #01D9FE) !important;
    }

    /deep/ .el-progress-bar__outer{
        width: 100% !important;
        background-color: #193F80 !important;
    }

    /deep/ .el-loading-mask{
      z-index: 10;
    }

    .score{
      color:#fff;
    }
</style>
