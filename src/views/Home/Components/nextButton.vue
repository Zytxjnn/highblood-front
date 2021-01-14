<template>
    <div id="nextButton" @click="switchPage">
        
    </div>
</template>

<script>
  export default {
    name: "nextButton",
    methods:{
      switchPage(){
        let newNameNumbr = Number(this.$route.name.charAt(this.$route.name.length-1));
        if(newNameNumbr === 3){
          this.$message({
            message: '已经是最后一页了',
            type: 'warning'
          });
          return false;
        }
        this.$router.push('home'+(newNameNumbr+1))
      }
    }
  }
</script>

<style scoped>
    #nextButton{
        z-index: 1;
        position: fixed;
        right:3vw;
        display: flex;
        top: 40vh;
        justify-content: center;
        align-items:center;
        width: 4.56rem;
        height: 4.56rem;
        background-image: url('~@/assets/数据概览/右.png');
        border-radius: 50%;
        cursor: pointer;
        margin: 2rem 0;
    }



</style>