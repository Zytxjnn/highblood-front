<template>
    <div id="Consortium">
        <div v-show="show" class="nodata">暂无数据</div>
        <el-collapse v-show="!show" v-model="activeName">
            <el-collapse-item v-for="(province,proName,k) in data">
                <template slot="title">
                    <div class="province-title">
                        {{proName}}({{province.length-1}}家)
                    </div>
                </template>
                <div class="consortium-list">
                    <div class="consortium-item" @click="goto(item.hospital,proName,item.city,item.hospital_id)" v-for="(item,i) in province">
                        <div class="item-title">{{item.hospital}}</div>

                        <div class="item info">
                            <div class="rank">
                                <div class="info-title">排名</div>
                                <div class="info-data">
                                    <span class="highlight">
                                        {{item.rank}}
                                    </span>
                                    /{{item.count}}
                                </div>
                            </div>
                            <div class="rank">
                                <div class="info-title">医联体</div>
                                <div class="info-data">
                                    <span class="highlight">
                                        {{item.unit == 1 ? item.avg_time + '分钟': item.unit == 2 ? item.pass_percent + '%': item.all_count + '例'}}
<!--                                        {{item.unit == 1 ? item.avg_time : item.unit == 2 ? item.pass_percen : item.all_count}}-->
                                    </span>
                                </div>
                            </div>
                            <div class="rank">
                                <div class="info-title">全国</div>
                                <div class="info-data">
                                    <span class="highlight">
                                        {{item.country_data}}
                                    </span>{{item.unit == 1 ? '分钟': item.unit == 2 ? '%':  '例'}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>
    import {getHospitalJoinedListByCore} from '@/utils/api'

  export default {
    name: "ConsortiumList",
    data(){
      return {
        show:false,
        activeName:'1',
        provincesText:['上海', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '广西', '海南', '四川', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '北京', '天津', '重庆', '香港', '澳门', '台湾'],
        data: {}
      }
    },
    mounted() {


      if (this.$store.state.province){
        this.getDataByProvince();
      }

      if (this.$store.state.city){
        this.getDataByCity();
      }

      this.getData();
    },
    methods:{
      getData(){
        const params =  new URLSearchParams();
        params.append('area_type',this.$store.state.area_type);
        params.append('core_name',this.$store.state.core_name);
        params.append('start',this.$store.state.start);
        params.append('end',this.$store.state.end);
        this.$axios.post(getHospitalJoinedListByCore,params).then(res => {
          this.data = res.data.data;
          console.log(JSON.stringify(this.data) === '[]')
          if (JSON.stringify(this.data) === '[]') { // 如果不为空，则会执行到这一步，返回true

            this.show = true
          }else{
            this.show = false
          }

        })
      },
      getDataByProvince(){
        const params =  new URLSearchParams();
        params.append('area_type',this.$store.state.area_type);
        params.append('core_name',this.$store.state.core_name);
        params.append('province',this.$store.state.province);
        params.append('start',this.$store.state.start);
        params.append('end',this.$store.state.end);
        this.$axios.post(getHospitalJoinedListByCore,params).then(res => {
          this.data = res.data.data;
        })
      },
      getDataByCity(){
        const params =  new URLSearchParams();
        params.append('area_type',this.$store.state.area_type);
        params.append('core_name',this.$store.state.core_name);

        if(this.$store.state.city === ''){
          params.append('province',this.$store.state.province);
        }else{
          params.append('city',this.$store.state.city);
        }
        params.append('start',this.$store.state.start);
        params.append('end',this.$store.state.end);
        this.$axios.post(getHospitalJoinedListByCore,params).then(res => {
          this.data = res.data.data;
        })
      },
      goto(name,province,city,id){
        // this.$store.state.province = province;
        // this.$router.push(`/medicalconsortium?name=${name}`);
        this.$router.push(`/medicalconsortium?name=${name}&province=${province}&city=${city}&id=${id}`);
      }
    },
    watch:{
      '$store.state.province'(val){
        const params =  new URLSearchParams();
        params.append('area_type',this.$store.state.area_type);
        params.append('core_name',this.$store.state.core_name);
        if(this.$store.state.province === ''){

        }else{
          params.append('province',this.$store.state.province);
        }
        params.append('start',this.$store.state.start);
        params.append('end',this.$store.state.end);
        this.$axios.post(getHospitalJoinedListByCore,params).then(res => {
          this.data = res.data.data;
        })
      },
      '$store.state.city'(val){
        const params =  new URLSearchParams();
        params.append('area_type',this.$store.state.area_type);
        params.append('core_name',this.$store.state.core_name);

        if(this.$store.state.city === ''){
          params.append('province',this.$store.state.province);
        }else{
          params.append('city',this.$store.state.city);
        }

        params.append('start',this.$store.state.start);
        params.append('end',this.$store.state.end);
        this.$axios.post(getHospitalJoinedListByCore,params).then(res => {
          this.data = res.data.data;
        })
      },
      '$store.state.start'(val){
        this.getData();
      }
    }
  }
</script>

<style scoped>
    #Consortium{

        height: 80vh;
        overflow-y: scroll;
    }

    .consortium-list{
        display: grid;
        grid-template-columns:repeat(4,22%);
        grid-column-gap:1rem;
        grid-row-gap:1rem;
        flex-wrap: wrap;
        font-size: 0.85rem;
    }

    .consortium-item{
        border-radius: 0.5rem;
        box-sizing: border-box;
        padding: 1rem;
        background-color: #fff;
    }

    .consortium-item .rank{
        display: flex;
        justify-content:space-between;
    }

    .consortium-item .item-title{
        color:#008599;
    }

    .highlight{
        font-weight: bold;
    }

    .province-title{
        position: relative;
        width: 100%;
        padding-left: 1rem;

        font-size: 1.15rem;
        border-bottom:1px solid #808080;
    }

    .province-title:before{
        position:absolute;
        left: 0;
        top: 0.85rem;
        height: 1.5rem;
        width: 0.15rem;
        background-color: #008599;
        content: "";
    }

    .nodata{
        display:flex;
        justify-content: center;
        align-items: center;
        font-weight: 800;
        color: #008599;
        font-size: 2rem;
    }

</style>