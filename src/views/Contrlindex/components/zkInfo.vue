<template>
    <div id="zkinfo">
        <div class="infoList">
            <china-item v-for="(item,i) in infoList" :data="item" :index="i+1" />
        </div>
    </div>
</template>

<script>
    import chinaItem from "./chinaItem";

  export default {
    name: "zkInfo",
    components:{
      chinaItem
    },
    data(){
      return {
        infoList:[]
      }
    },
    mounted() {
        this.getInfoList();
    },
    methods:{
      async getInfoList(){
        const {data} = await this.$axios.get('https://easy-mock.com/mock/5ddb3ba9f2b7914af934a799/example/info');
        this.infoList = data.data;
        console.log(this.infoList);
      }
    }
  }
</script>

<style scoped>
    .infoList{
        height: 40rem;
        overflow-y: scroll;
        display: grid;
        grid-template-columns:45% 45%;
        grid-template-rows: repeat(7.5rem);
        grid-row-gap: 0.44rem;
        grid-column-gap: 1.88rem;

    }

   

    .infoList::-webkit-scrollbar { width: 0 !important }
</style>