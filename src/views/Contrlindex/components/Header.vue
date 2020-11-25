<template>
    <div id="header">
        <div class="title">{{title}}</div>
        <div class="tools">
            <div class="date">
                <div class="text">2020.02</div>
                <img src="~@/assets/质控指标/筛选日期.png" alt="">
            </div>
            <div class="search">
                <input class="textinput" type="text" placeholder="搜索医院名称">
                <img src="~@/assets/质控指标/搜索医院.png" alt="">
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "Header",
    props:{
      title:{
        type:String
      }
    }
  }
</script>

<style scoped>
    #header{
        display: flex;
        padding: 0 3.69rem;
        align-items: center;
        justify-content: space-between;
        height: 6.25rem;
    }

    #header>.title{
        font-size: 2rem;
        color:#333333;
        font-weight: 800;
    }

    .tools{
        display: flex;
    }

    .tools .date{
        font-size: 1.25rem;
        color:#008599;
        font-weight: bolder;
    }

    .tools .search,.date{
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        padding: 0.75rem 0 0.75rem 1.25rem;
        box-sizing: border-box;
        width: 13.75rem;
        height: 3rem;
        background-image: url("../../../assets/质控指标/搜索框.png");
        background-size: 100% 100%;
        margin: 0 1.25rem;
    }

    .tools .search .textinput{
        width: 8rem;
        border:none;
        background-color: transparent;
        outline: none;
        color:#A9DBEB;
        font-size: 1.25rem;

    }

    .tools .search .textinput::placeholder{

        border:none;
        outline: none;
        color:#A9DBEB;
        font-size: 1.25rem;
    }

    .tools .search>img,.date>img{
        cursor:pointer;

        width: 2.5rem;
        height: 2.5rem;
    }
</style>