<template>
    <div id="sidebar" >
        <div class="views" v-show="this.$store.state.sidebar.left">
            <div class="view" v-for="item in data" @click="go(item.path)">
               <el-image :src="item.img">
                   <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline"></i>
                    </div>
               </el-image>
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
                    img:'',
                    title:'数据概览',
                    path:'/'
                },
                 {
                    img:'',
                    title:'质控指标',
                    path:'/controlindex'
                },
                 {
                    img:'',
                    title:'认证指标',
                    path:'/controlindex'
                },
                 {
                    img:'',
                    title:'质控报告',
                    path:'/controlindex'
                },
                 {
                    img:'',
                    title:'留言板',
                    path:'/controlindex'
                },
                {
                    img:'',
                    title:'设置',
                    path:'/controlindex'
                },
                {
                    img:'退出登录',
                    title:'退出登录',
                    path:'/controlindex'
                }
                
            ]
        }
    },
    methods:{
      go(path){
        this.$router.push(path)
      }
    }
}
</script>

<style scoped>
    .views{
        width:8rem;
        height: 80vh;
        padding: 10px;
        position: fixed;
        top: 50%;
        transform: translate(0,-40vh);
        left: 0;
        box-sizing: border-box;
        background-color: #fff;
        border-radius:0 1rem 1rem 0;
        box-shadow: 2px 0px 5px #cbd3ff;
    }

     

   

    .title{
        display: flex;
        padding:0 0.625rem;
        justify-content: space-between;
    }

    .title .text{
        flex:1;
        text-align:center;
    }

    

    .close-button{
        position: fixed;
        display:flex;
        align-items: center;
        top: 50%;
        transform:translateY(-5rem);
        left: 8.02rem;
        width: 1.5rem;
        height: 10rem;
        background-color: #fff;
        box-shadow: 2px 0px 5px #cbd3ff;
        border-radius: 0 5rem 5rem 0;

    }

    .views{
        height: 77vh;
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