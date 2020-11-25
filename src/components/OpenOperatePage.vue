<template>
  <div id="open" v-show="!$store.state.operatePage.left" @click="$store.state.operatePage.left = true">
      <span class="iconfont icon-zhankai"></span>
  </div>
</template>

<script>
export default {

}
</script>

<style>
    #open{
        display: flex;
        justify-content: center;
        align-items: center;
        
        position: fixed;
        bottom: 3rem;
        left: 3rem;
        height: 5rem;
        width: 5rem;
        box-shadow: 3px 3px 5px #cbd3ff;
        background-color: #fff;
        border-radius:50% 50%;
    }

    #open .iconfont{
        font-size: 2rem;
    }
</style>