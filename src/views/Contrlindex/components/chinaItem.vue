<template>
    <div class="chinaItem">
        <div class="info">
            <div class="title">{{index}}.{{data.title}}</div>
            <div class="count">全国<span>{{data.count}}</span>例</div>
        </div>
        <div class="icon"></div>
    </div>
</template>

<script>
  export default {
    name: "chinaItem",
    props:{
      data:{
        type:Object,
        default:() => {
          return {}
        }
      },
      index:{
        type: Number,
        default:0
      }
    }
  }
</script>

<style scoped>
    .chinaItem{
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        margin: 0 2.5rem 1.88rem 0;
        width:100%;
        height:7.5rem;
        padding: 1.25rem;
        background: #FFFFFF;
        box-shadow: 0.1rem 0.1rem 0.2rem 0.2rem rgba(111, 111, 111, 0.2);
        border-radius: 1rem;
    }

    .chinaItem .info{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 70%;
    }

    .chinaItem .icon{
        width: 4.5rem;
        height: 4.5rem;
        background: #D4ECF2;
        border-radius: 50%;
    }

    .count{
        color:#323232;
    }

    .count span{
        font-weight: bolder;
        font-size: 1.25rem;
        color: #008599;
    }
</style>