<template>
    <div id="header">
        <img src="~@/assets/logos/联盟.png" alt="">
        <img src="~@/assets/logos/高血压.png" alt="">
        <span>{{title}}</span>
        <Date/>
    </div>
</template>

<script>
    import Date from './Date'

  export default {
    name: "Header",
    props:{
      title:{
        type:String
      },
      showDate:{
        type:Boolean
      }
    },
    components:{
        Date
    }
  }
</script>

<style scoped>
    #header{
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        background-image: url('../assets/数据概览/top.png');
        background-size:100vw 4.5rem;
        font-size: 2.5rem;
        height: 4.5rem;
        line-height:4.5rem;
        font-weight: 800;

    }

    #header span{

        /*background: linear-gradient(0deg, #5197FF 0%, #80F2FF 100%);*/
        color:#FCFF0C;
        /*-webkit-background-clip: text;*/
        /*-webkit-text-fill-color: transparent;*/
        /*color:#fcff0c;*/
    }

    #header img{
      margin-right:0.5rem;
    }
</style>