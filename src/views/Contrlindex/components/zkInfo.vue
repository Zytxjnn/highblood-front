<template>
    <div id="zkinfo">
        <div class="infoList" v-if="!$store.state.isConsortiumList">
             <china-item v-show="$store.state.isChina" v-for="(item,key,i) in infoList" :data="item" :index="i+1" />
             <sub-item v-show="!$store.state.isChina" v-for="(item,key,i) in $store.state.subItem"  :ikey="key" :data="item" :index="i+1" v-loading='isLoading'
                      element-loading-text="拼命加载中"
                      element-loading-spinner="el-icon-loading"
                      element-loading-background="rgba(0, 0, 0, 0.2)"  />

        </div>
        <consortium-list v-else />
    </div>
</template>

<script>
    import chinaItem from "./chinaItem";
    import subItem from './subItem'
    import ConsortiumList from "./ConsortiumList";

    import {getCoreDetail} from '@/utils/api.js';

  export default {
    name: "zkInfo",
    components:{
      chinaItem,
      subItem,
      ConsortiumList
    },
    data(){
      return {
        isLoading:false,
        infoList:[],
        data: [
            {
              "title": "高血压诊治例数",
              "count1": 2151,
              "rank1":16,
              "rank2":51,
              "count2":200
            },
            {
              "title": "继发性高血压和（或）难治性高血压例数占比",
              "count1": 2151,
              "rank1":16,
              "rank2":51,
              "count2":200
            },
            {
              "title": "诊断使用心电图",
              "count1": 2151,
              "rank1":16,
              "rank2":51,
              "count2":200
            },
            {
              "title": "诊断尿白蛋白/肌酐比检测率",
              "count1": 2151,
              "rank1":16,
              "rank2":51,
              "count2":200
            },
            {
              "title": "高血压随访率",
              "count1": 2151,
              "rank1":16,
              "rank2":51,
              "count2":200
            },
            {
              "title": "牵头医院对卫星医院的学术培训，召开次数与质量",
              "count1": 2151,
              "rank1":16,
              "rank2":51,
              "count2":200
            },
            {
              "title": "对高血压患者对健康教育，召开次数与质量",
              "count1": 2151,
              "rank1":16,
              "rank2":51,
              "count2":200
            },
            {
              "title": "中心建设质量分析会，召开次数与质量",
              "count1": 2151,
              "rank1":16,
              "rank2":51,
              "count2":200
            },
            {
              "title": "高血压转诊率",
              "count1": 2151,
              "rank1":16,
              "rank2":51,
              "count2":200
            },
            {
              "title": "高血压转诊率",
              "count1": 2151,
              "rank1":16,
              "rank2":51,
              "count2":200
            },
            {
              "title": "高血压转诊率",
              "count1": 2151,
              "rank1":16,
              "rank2":51,
              "count2":200
            },
            {
              "title": "高血压转诊率",
              "count1": 2151,
              "rank1":16,
              "rank2":51,
              "count2":200
            },
            {
              "title": "高血压转诊率",
              "count1": 2151,
              "rank1":16,
              "rank2":51,
              "count2":200
            }
        ]
      }
    },
    mounted() {
        this.getInfoList();
    },
    methods:{
      async getInfoList(){
        const params = new URLSearchParams();
        params.append('area_type',1);
        params.append('start',this.$store.state.start);
        params.append('end',this.$store.state.end);
        const {data} = await this.$axios.post(getCoreDetail,params);

        this.$store.state.infoList = data.data;
        this.infoList = data.data;
        this.isLoading = false;
      },
      switchToConsortiumList(){ // 显示医联体列表
        this.$store.state.isConsortiumList = true;
      }
    },
    watch:{
      '$store.state.start'(){
        this.getInfoList();


          const params  = new URLSearchParams();
          params.append('area_type',this.$store.state.area_type);
          params.append('start',this.$store.state.start);
          params.append('end',this.$store.state.end);

          switch (this.$store.state.area_type){
            case 2:
              params.append('province',this.$store.state.province);
              break;
            case 3:
              params.append('city',this.$store.state.city);
              break;
            case 4:
              params.append('hospital_id',this.$route.query.id);
              break;
            case 5:
              params.append('hospital_joined_id',this.$route.query.id);
              break;
          }
          this.$axios.post(getCoreDetail,params).then(res => {

            this.$store.state.subItem = res.data.data;

          })

        }
    }
  }
</script>

<style scoped>
    .infoList{
        height: 50rem;
        overflow-y: scroll;
        display: grid;
        grid-template-columns:45% 45%;
        grid-template-rows: repeat(7.5rem);
        grid-row-gap: 0.44rem;
        grid-column-gap: 1.88rem;
        padding: 1rem;
    }

    .infoList::-webkit-scrollbar { width: 0 !important };
</style>