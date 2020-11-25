<template>
    <div id="switch">
        <div class="pre">
            上一页
        </div>
        <div class="next">
            下一页
        </div>
    </div>
</template>

<script>
  export default {
    name: "SwitchPage"
  }
</script>

<style scoped>
    .pre,.next{
        position: fixed;
        display: flex;
        justify-content: center;
        align-items:center;
        width: 4.56rem;
        height: 4.56rem;
        background-color: #fff;
        border:1px solid #000;
        border-radius: 50%;
        cursor: pointer;
    }

    .pre{
        left: 0;
        top: 30%;
    }

    .next{
        right: 0;
        top: 30%;
    }

</style>