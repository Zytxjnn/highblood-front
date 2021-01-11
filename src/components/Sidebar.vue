<template>
    <div id="sidebar" >
        <div class="views" v-show="this.$store.state.sidebar.left">
            <div class="view" v-for="item in data" @click="go(item.path)">
              <img src="../assets/SideBar/数据概览.png" v-show="item.title === '数据概览'" />
              <img src="../assets/SideBar/质控指标.png" v-show="item.title === '质控指标'" />
              <img src="../assets/SideBar/设置.png" v-show="item.title === '设置'" />
              <img src="../assets/SideBar/退出.png" v-show="item.title === '退出登录'" />
                <div>{{item.title}}</div>
            </div>
        </div>
         <div :class="['close-button',$store.state.sidebar.left ? '' : 'hide' ]" 

         @click="$store.state.sidebar.left = !$store.state.sidebar.left">
            <span :class="['iconfont',$store.state.sidebar.left ? 'icon-xiangzuo':'icon-gengduo']"></span>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            data:[
                {
                    img:'../assets/SideBar/数据概览.png',
                    title:'数据概览',
                    path:'/'
                },
                 {
                    img:'../assets/SideBar/质控指标.png',
                    title:'质控指标',
                    path:'/controlindex'
                },
                {
                    img:'../assets/SideBar/设置.png',
                    title:'设置',
                    path:''
                },
                {
                    img:'../assets/SideBar/退出登录.png',
                    title:'退出登录',
                    path:''
                }

            ]
        }
    },
    methods:{
      go(path){
        this.$store.state.sidebar.left =false;
        this.$router.push(path)
      }
    }
}
</script>

<style scoped>
    #sidebar{
      z-index: 999;
    }
    .views{
        width:8rem;
        padding: 10px;
        position: fixed;
        top: 50%;
        transform: translate(0,-23vh);
        left: 0;
        box-sizing: border-box;
        background-color: #fff;
        border-radius:0 1rem 1rem 0;
        box-shadow: 2px 0px 5px #cbd3ff;
        z-index: 999;
    }

     

   

    .title{z-index: 999;
        display: flex;
        padding:0 0.625rem;
        justify-content: space-between;
    }

    .title .text{z-index: 999;
        flex:1;
        text-align:center;
    }

    

    .close-button{
        position: fixed;
        display:flex;
        align-items: center;
        top: 50%;
        transform:translateY(-10vh);
        left: 8.02rem;
        width: 1.5rem;
        height: 20vh;
        box-shadow: 2px 0px 5px #cbd3ff;
        border-radius: 0 5rem 5rem 0;

      background: linear-gradient(0deg, #269DAF 0%, #7FD6F0 100%);
    }

    .iconfont{
      color:#fff;
    }

    .views{

        overflow-y: scroll;
        
    }

    .views::-webkit-scrollbar { width: 0 !important }

    .view{
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10px;

    }

    .view:hover{
        background-color:#cbd3ff;
    }
    
    .el-image{
        display: flex !important;
        justify-content: center;
        align-items: center;
        background-color: #ccc;
        width: 80px;
        height: 80px;

    }

    .hide{
        left: 0;
    }
</style>