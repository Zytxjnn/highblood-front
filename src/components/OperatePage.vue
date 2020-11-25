<template>
    <div id="operate-page" v-if="$store.state.operatePage.left">
        <div class="title">
            <div class="text">操作区</div>
            <div class='icon'>
                <span class="iconfont icon--zuixiaohua" @click='$store.state.operatePage.left = false'></span></div>
            </div>
        <div class="options">
            <div class="scope">
                <div class="name">范围</div>
                <div class="option">
                    <el-button plain size="mini">地图返回</el-button>
                </div>
            </div>
            <div class="rank cNumbr">
                <div class="name">通过认证数量排名</div>
                <div class="methods">
                    <div @click="updataRankInfo('province')">省排名</div>
                    <div @click="updataRankInfo('city')">市排名</div>
                    <div @click="updataRankInfo('country')">医联体排名</div>
                </div>
            </div>
            <div class="switch-page">
                <div class="name">页面切换</div>
                <div class="page">
                    <div class="pre-page" @click="switchPage('pre')"><el-button plain size="small">上一页</el-button></div>
                    <div class="next-page" @click="switchPage('next')"><el-button plain size="small">下一页</el-button></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

  export default {
    name: "OperatePage",
    data(){
        return {
           
        }
    },
    mounted(){
         
    },
    methods:{
        // 修改排名信息
        updataRankInfo(area){
           this.$axios.get(`https://easy-mock.com/mock/5f8bbcd9b260f247acdf2c06/gaoxueya/${area}`).then(res => {
            //   this.$store.commit('setlRank',res.data.lRank);
            this.$store.dispatch('setlRank',res.data.lRank);
           })
        },
        switchPage(direction){
            let newNameNumbr = Number(this.$route.name.charAt(this.$route.name.length-1));
           switch (direction) {
               case 'pre':
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
                   break;
                case 'next':
                   if(newNameNumbr === 3){
                        this.$message({
                        message: '已经是最后一页了',
                        type: 'warning'
                        });
                        return false;
                    }
                    this.$router.push('home'+(newNameNumbr+1))
                    break;
               default:
                   break;
           }
        }
    }
  }
</script>

<style scoped>
    #operate-page{
        position: fixed;
        border:1px solid grey;
        width: 21.375rem;
        bottom: 0;
        left: 0;
        background-color: #fff;
        border-radius: 0px 0.625rem 0px 0px;
        font-size: 0.875rem;
    }

    .title{
        text-align: center;
        font-size: 0.875rem;
        line-height: 1.875rem;
        height: 1.875rem;
        border-bottom: 1px solid black;
    }

    .options>div{
        display: flex;
        align-items: center;
        padding: 0.875rem 1rem;
        justify-content: space-between;
        border-bottom: 0.0625rem solid #000;
    }
    
    .switch-page .page{
        display: flex;
        justify-content: space-between;
    }

    .switch-page .page .pre-page{
        margin-right:0.625rem;
    }
    
    .methods{
        display: flex;
    }

    .methods div{
        cursor: pointer;
        border: 1px solid #000;
        padding: 0.125rem;
        background-color: #cbd3ff;
    }


    .iconfont{
        cursor: pointer;
    }
</style>