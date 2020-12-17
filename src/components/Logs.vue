<template>
    <div id="logs">
        <Title title="实时在线操作记录"/>
        <div class="list">
            <div class="item"  v-for="item in logs">
                {{item.org_name | formatOrg_name}}于:{{item.add_time}}:新增病例
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
        const {data} = await this.$axios.get('http://newhyper.chinahc.org.cn/api/v1/qc/record');
        this.logs = data.data;
      }
    },
    filters:{
      formatOrg_name(val){
        let name = val.length >= 12 ? val.substring(0,12) + '...' : val
        return name
      }
    },
    watch:{
      '$store.state.province'(val){
        if(val){
          this.$axios.get(`http://newhyper.chinahc.org.cn/api/v1/qc/record?province=${val}`).then(res => {
            this.logs = res.data.data;
            console.log(this.logs);
          })
        }else{
          this.getData();
        }
      },
      '$store.state.city'(val){
        if(val){
          this.$axios.get(`http://newhyper.chinahc.org.cn/api/v1/qc/record?city=${val}`).then(res => {
            this.logs = res.data.data;
            console.log(this.logs);
          })
        }else{
          this.$axios.get(`http://newhyper.chinahc.org.cn/api/v1/qc/record?city=${this.$store.state.city}`).then(res => {
            this.logs = res.data.data;
            console.log(this.logs);
          })
        }
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