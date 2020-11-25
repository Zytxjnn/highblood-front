<template>
    <div id="rank">
        <div class="rank-list">
            <div class="rank-item" v-for="(item,index) in $store.state.rRank">
                <div class="item-area"><span :style="{'color':index<=2 ? indexColor[index]:''}">NO.{{index+1}}</span>{{item.area}}</div>
                <div class="progress">
                    <el-progress
                            :style="[{width: item.number+'%'}]"
                            :stroke-width="15" :percentage="item.number"  :show-text="false"></el-progress>
                    <div>{{item.number}}</div>
                </div>
                </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "Rank",
    data(){
      return {
        indexColor:['#FFCB3D','#FB28F4','#32D6FF']
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

   
</style>