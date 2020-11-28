<template>
    <div class="subItem">
        <div class="info">
            <div class="title">{{index}}.{{data.title}}</div>
            <div class="content">
                <div>
                    <div style="display:flex;align-items: center">
                         <span class="highlight">{{data.rank1}}</span>
                         <span>/{{data.rank2}}</span>
                    </div>
                    <div>
                        排名
                    </div>
                </div>
                <div>
                    <div style="display:flex;align-items:center;">
                        <span class="highlight">{{data.count1}}</span>
                        <span>例</span>
                    </div>
                    <div>
                        全国
                    </div>
                </div>
                <div>
                    <div style="display:flex;align-items:center;">
                        <span class="highlight">{{data.count2}}</span>
                        <span>例</span>
                    </div>
                    <div>
                        本省
                    </div>
                </div>
            </div>
        </div>
        <div class="icon"></div>
        <div class="iconfont icon-gengduo"></div>
    </div>
</template>

<script>
  export default {
    name: "subItem",
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
    .subItem{
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        margin: 0 2.5rem 1.88rem 0;
        width:100%;
        height:7.5rem;
        padding:1rem 1.25rem;
        background: #FFFFFF;
        box-shadow: 0.1rem 0.1rem 0.2rem 0.2rem rgba(111, 111, 111, 0.2);
        border-radius: 1rem;
    }

    .subItem .info{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 70%;
        margin-right: 1rem;
    }

    .subItem .icon{
        width: 4.5rem;
        height: 4.5rem;
        background: #D4ECF2;
        border-radius: 50%;
    }

    .title{
        height: 2.75rem;
        font-size: 0.8rem;

    }

    .count{
        color:#323232;
    }

    .count span{
        font-weight: bolder;
        font-size: 1.25rem;
        color: #008599;
    }

    .content{

        font-size: 0.8rem;
        height: 3rem;
        display: flex;
        justify-content: space-between;

    }

    .content>div{
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: column;

    }

    .content>div:not(:last-child):after{
        content: '';
        right: -0.7rem;
        transform: translateY(50%);

        position: absolute;

        height: 2rem;
        border-right: 1px solid #000;
        /*background-color: #000;*/
    }

    .content>div .highlight{
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        color:#008599;
        font-size: 1rem;
    }

    .icon-gengduo{
        position: absolute;
        right: 0.2rem;
        top: 0.25rem;
        color:#008599;
        font-size: 1.5rem;
    }
</style>