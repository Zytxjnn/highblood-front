<template>
    <div id="logs">
        <Title title="实时在线操作记录"/>
        <div class="list">
            <div class="item"  v-for="item in logs">
                {{item.location}}于:{{item.date}}:{{item.info}}
            </div>
        </div>
    </div>
</template>

<script>
import Title from "@/views/Home/Components/Title";

  export default {
    name: "Record",
    components:{
      Title
    },
    data(){
      return {
        isLoading:true,
        logs:[]
      }
    },
    mounted() {
      this.getData();
    },
    methods:{
      // 请求数据
      async getData(){
        const {data} = await this.$axios.get('https://easy-mock.com/mock/5ddb3ba9f2b7914af934a799/example/record');
        this.logs = data.data.record;
      }
    }
  }
</script>

<style scoped>
    #logs{
        margin-top: 2rem;
        padding: 0.63rem 1.13rem;
        background-image: url('~@/assets/数据概览2/中下.png');
        background-size: 100% 100%;
    }

    .list{
        display: flex;
        flex-wrap: wrap;
        padding:1.81rem 0;
    }

    .list .item{
        text-align: center;
        box-sizing: border-box;
        border-right:1px solid #01D8FE;
        font-size: 0.85rem;
        width: 50%;
        color:#fff;
        margin: 0.63rem 0;
    }

</style>