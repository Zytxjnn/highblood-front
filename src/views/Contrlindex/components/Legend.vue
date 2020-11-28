<template>
    <div id="legends">
        <div  v-for="item in legends" :key="item.eName" :class="[item.eName,'legend']">
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
            eName:'normal',
            imgUrl:'~@/assets/质控指标/正常.png'
          },
          {
            name:'轻微',
            eName:'slight',
            imgUrl:'~@/assets/质控指标/轻微.png'
          },
          {
            name:'异常',
            eName:'unusual',
            imgUrl:'~@/assets/质控指标/异常.png'
          },
          {
            name:'严重',
            eName:'serious',
            imgUrl:'~@/assets/指控指标/严重.png'
          },
          {
            name:'说明',
            eName:'explain',
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
        top:20%;
        left: 3rem;
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

    .normal{
        background-image: url('~@/assets/质控指标/正常.png');
    }
    .slight{
        background-image: url('~@/assets/质控指标/轻微.png');
    }
    .unusual{
        background-image: url('~@/assets/质控指标/异常.png');
    }
    .serious{
        background-image: url('~@/assets/质控指标/严重.png');
    }
    .explain{
        background-image: url('~@/assets/质控指标/说明.png');
    }
</style>