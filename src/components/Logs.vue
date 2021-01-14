<template>
    <div id="logs">
        <Title title="实时在线操作记录"/>
        <div class="list" v-if="logs.length > 0">
            <div class="item"  v-for="item in logs">
                {{item.org_name | formatOrg_name}}于:{{item.add_time}}:新增病例
            </div>
        </div>
        <div class="nodata" v-if="logs.length === 0">暂无数据</div>
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
          })
        }else{
          this.getData();
        }
      },
      '$store.state.city'(val){
        if(val){
          this.$axios.get(`http://newhyper.chinahc.org.cn/api/v1/qc/record?city=${val}`).then(res => {
            this.logs = res.data.data;
          })
        }else{
          this.$axios.get(`http://newhyper.chinahc.org.cn/api/v1/qc/record?province=${this.$store.state.province}`).then(res => {

            this.logs = res.data.data;
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

    .nodata{
      display: flex;
      justify-content: center;
      align-items: center;
      height: 15vh;
      font-size: 5vh;
      background: linear-gradient(92deg, #0072FF 0%, #00EAFF 48.8525390625%, #01AAFF 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-weight: 800;
    }



</style>