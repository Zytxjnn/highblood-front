<template>
    <div class="normal-info">
        <div class="normal-item" v-for="(item,i) in normalData">
            <div class="normal-title">
                <img src="../assets/数据概览/通过.png" v-if="i % 2==0">
                <img src="../assets/数据概览/建设中.png" v-else>
                {{item.name}}</div>
            <div class="normal-count"><span>{{item.count}}</span>家</div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "NromalInfo",
    props:{
      normalData: {
        type:Array,
        require:true
      }
    }
  }
</script>

<style scoped>
    .normal-info{
        box-sizing: border-box;
        background-image:url('../assets/数据概览/线框.png') ;
        display: flex;
        height: 10.31rem;
        width:100%;
        flex-wrap: wrap;
        padding: 0 1.25rem;
        margin-bottom: 1.44rem ;
         margin-top: 1.84rem ;
        justify-content: space-between;
        background-size: 100% 10.31rem;
    }

    .normal-item{
        display: flex;
        width: 50%;
        text-align: center;
        flex-direction: column;        
    }

    .normal-item .normal-title{
        display: flex;
        align-items: center;
        margin-top: 1.25rem;
        font-size: .75rem;
        color:#64B7F7;
    }

    .normal-title img{
        margin-right: .63rem;
    }

     .normal-item .normal-count{
        
         text-align: left;
        color:#fff;
    }

    .normal-count span{
        font-size: 1.75rem;
    }
</style>