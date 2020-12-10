<template>
    <div id="header">
        <div :class="['title',title.length >= 15 ? 'mini' : '']">{{title}}高血压达标中心质控指标</div>

        <div class="tools">
            <div class="date">
                <div class="text">2020.02</div>
                <img src="~@/assets/质控指标/筛选日期.png" alt="">
            </div>
            <div class="search" v-if="!isConsortium">
                <input class="textinput" type="text" placeholder="搜索医院名称">
                <img src="~@/assets/质控指标/搜索医院.png" alt="">
            </div>
            <div class="consortium" v-else>
<!--                <div class="text">医联体</div>-->
                <el-dropdown trigger="click"   @command="test">
<!--                    <el-button type="primary">-->
<!--                        更多菜单<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
<!--                    </el-button>-->
                        <div id="dropdow">医联体</div>
                    <el-dropdown-menu slot="dropdown" style="left:1382px !important">
                        <el-dropdown-item :command="{name:item.hospital_name,id:item.hospital_id}" v-for="item in hospitalList">{{item.hospital_name}}</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <img @click="dropdow" src="~@/assets/MedicalConsortium/箭头.png" alt="">
            </div>
        </div>
    </div>
</template>

<script>
    import {getHospitalList} from '@/utils/api';

    // document.getElementById('demo').addEventListener('click',() => {
    //   document.getElementById('test').click();
    // })


    export default {
    name: "Header",
    props:{
      title:{
        type:String
      },
      isConsortium:{
        type:Boolean,
        default:false
      }
    },
    data(){
      return {
        hospitalList:[

        ]
      }
    },
      mounted() {

      },
      methods:{
        dropdow(){
          document.getElementById('dropdow').click();
        },
        test(e){
          this.$store.state.zkTitle = e;
          this.$store.state.area_type = 5;


          this.$router.push({
            path:'hospital',
            query:{
              name:e.name,
              id:e.id
            }
          })
        }
      },
    watch:{
      '$store.state.hospital_joined_id'(val){
          const params = new URLSearchParams();
          params.append('area_type',1);
          params.append('hospital_joined_id',val);
          this.$axios.post(getHospitalList,params).then(res => {
            this.hospitalList = res.data.data;
          })
      }
    }
  }
</script>

<style scoped>
    #header{
        display: flex;
        padding: 0 3.69rem;
        align-items: center;
        justify-content: space-between;
        height: 6.25rem;
    }

    #header>.title{
        font-size: 2rem;
        color:#333333;
        font-weight: 800;
    }

    .mini{
        font-size: 1rem !important;
    }

    .tools{
        display: flex;
    }

    .tools .date,.consortium{
        font-size: 1.25rem;
        color:#008599;
        font-weight: bolder;
    }

    .tools .search,.date{
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        padding: 0.75rem 0 0.75rem 1.25rem;
        box-sizing: border-box;
        width: 13.75rem;
        height: 3rem;
        background-image: url("../../../assets/质控指标/搜索框.png");
        background-size: 100% 100%;
        margin: 0 1.25rem;
    }

    .tools .search .textinput{
        width: 8rem;
        border:none;
        background-color: transparent;
        outline: none;
        color:#A9DBEB;
        font-size: 1.25rem;

    }

    .tools .search .textinput::placeholder{
        border:none;
        outline: none;
        color:#A9DBEB;
        font-size: 1.25rem;
    }

    .tools .search>img,.date>img,.consortium>img{
        cursor:pointer;

        width: 2.5rem;
        height: 2.5rem;
    }

    .tools .search,.consortium{
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        padding: 0.75rem 0 0.75rem 1.25rem;
        box-sizing: border-box;
        width: 13.75rem;
        height: 3rem;
        background-image: url("../../../assets/质控指标/搜索框.png");
        background-size: 100% 100%;
        margin: 0 1.25rem;
    }

    /deep/ .el-popper{
        left: 1382px !important;
    }
</style>