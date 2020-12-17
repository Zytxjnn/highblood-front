<template>
    <div id="preButton" @click="switchPage"
         :class="[$route.path === '/home3' ? 'home3' : '']"
         v-show="!this.$store.state.sidebar.left"></div>
</template>

<script>
  export default {
    name: "preButton",
    methods:{
      switchPage(){
        let newNameNumbr = Number(this.$route.name.charAt(this.$route.name.length-1));

        if(newNameNumbr === 1){ // 如果是第一页，显示提示信息
          this.$message({
            message: '已经是第一页了',
            type: 'warning'
          });
          return false;
        }else if(newNameNumbr === 2){   // 由于第一个路由和2，3也不同，单独提出来设置
          this.$router.push('/');
          return false;
        }
        this.$router.push('home'+(newNameNumbr-1))


      }
    }
  }
</script>

<style scoped>
    #preButton{
        z-index: 1;
        position: fixed;
        display: flex;
        justify-content: center;
        align-items:center;
        width: 4.56rem;
         top: 40vh;
        height: 4.56rem;
        background-image: url('~@/assets/数据概览/左.png');
        border-radius: 50%;
        cursor: pointer;
        margin: 2rem 0;
    }

</style>