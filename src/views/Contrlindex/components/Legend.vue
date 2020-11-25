<template>
    <div id="legends">
        <div class="legend" v-for="item in legends" :style="{backgroundImage:'url('+item.imgUrl+')'}">
            {{item.name}}
        </div>
    </div>
</template>

<script>
  export default {
    name: "legends",
    data(){
      return {
        legends:[
          {
            name:'正常',
            imgUrl:'@/assets/指控指标/正常.png'
          },
          {
            name:'轻微',
            imgUrl:'~@/assets/指控指标/轻微.png'
          },
          {
            name:'异常',
            imgUrl:'~@/assets/指控指标/异常.png'
          },
          {
            name:'严重',
            imgUrl:'~@/assets/指控指标/严重.png'
          },
          {
            name:'说明',
            imgUrl:'~@/assets/指控指标/说明.png'
          }
        ]
      }
    }
  }
</script>

<style scoped>
    #legends{
        position: fixed;
        top: 0;
        left: 0;
    }

    .legend{
        padding: 0.1rem 0;
        height: 1.63rem;
        width: 6.44rem;
        text-align: center;

        background-size: 100% 100%;
        background-repeat: no-repeat;
        font-size: 1rem;
        border-radius: 1rem;
        margin-bottom: 0.38rem;
    }
</style>