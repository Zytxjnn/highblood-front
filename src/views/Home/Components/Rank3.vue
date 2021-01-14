<template>
    <div id="rank">
        <div class="rank-list" v-show="$store.state.scoreList.length >0">
            <div class="rank-item" v-for="(item,index) in $store.state.scoreList">
                <div class="item-area" :title='item.name'><span :style="{'color':index<=2 ? indexColor[index]:''}">NO.{{index+1}}</span>{{item.name}}</div>
                <div class="progress">
                    <el-progress
                            :style="[{width: item.score+'%'}]"
                            :stroke-width="15" :percentage="Number(item.score)"  :show-text="false"></el-progress>
                    <div class="score">{{item.score}}</div>
                </div>
            </div>
<!--            <div class="rank-item" v-show="!showProvince" v-for="(item,index) in $store.state.content.pass_hospital_by_city">-->
<!--                <div class="item-area"><span :style="{'color':index<=2 ? indexColor[index]:''}">NO.{{index+1}}</span>{{item.city}}</div>-->
<!--                <div class="progress">-->
<!--                    <el-progress-->
<!--                            :style="[{width: item.num+'%'}]"-->
<!--                            :stroke-width="15" :percentage="Number(item.num)"  :show-text="false"></el-progress>-->
<!--                    <div>{{item.number}}</div>-->
<!--                </div>-->
<!--            </div>-->
        </div>
        <div class="nodata" v-show="$store.state.scoreList.length === 0">暂无数据</div>
    </div>
</template>

<script>
  export default {
    name: "Rank3",
    props:{
      data:{
        type:Array,
        default:() =>{
          return []
        }
      }
    },
    data(){
      return {
        indexColor:['#FB28F4','#FFCB3D','#32D6FF']
      }
    },
    created(){

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
      font-size:1.1rem;
      color:#CDCDCD;
      height: 1.875rem;
      line-height: 1.875rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
    }

    .item-area span{
      margin-right: .3rem;
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
      height: 12px;
    }

    /deep/ .el-progress-bar__outer{
      width: 100% !important;
      background-color: #193F80 !important;
      height: 12px !important;
    }

    .score{
        color:#fff;
    }

    .nodata{
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      font-size: 5vh;
      background: linear-gradient(92deg, #0072FF 0%, #00EAFF 48.8525390625%, #01AAFF 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-weight: 800;
    }
</style>
