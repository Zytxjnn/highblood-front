<template>
    <div id="header">
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
        justify-content: space-between;
        background-image: url('../assets/数据概览/top.png');
        background-size:100vw 4.5rem;
        text-align: center;
        font-size: 1.94rem;
        height: 4.5rem;
        line-height:4.5rem;
    }

    #header span{

        background: linear-gradient(0deg, #5197FF 0%, #80F2FF 100%);
        
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
</style>