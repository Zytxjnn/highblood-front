<template>
    <div id="header" :key="$route.query.name">

        <div :class="['title',title.length >= 15 ? 'mini' : '']">
          <img class="logo" src="~@/assets/logos/联盟.png" alt="联盟">
          <img class="logo" src="~@/assets/logos/高血压.png" alt="高血压">
          {{title}}
<!--          {{ title.length >= 15  ?  '' : '高血压达标中心'}}-->
          <span v-show="$route.path === '/medicalconsortium'">[医联体]</span>
        </div>
        <div class="tools">
          <div class="back" v-show="$route.path==='/medicalconsortium' || $route.path=== '/hospital'"  @click="back">返回</div>
          <ControlRange v-show="$store.state.city" :type="1" />
          <div class="date"  @click="choseDate">
<!--                <div class="text">2020.02</div>-->
<!--                <img src="~@/assets/质控指标/筛选日期.png" alt="">-->
              <el-date-picker
                      :editable="false"
                      :clearable="false"
                      ref="saveDateInput"
                      v-model="dateValue"
                      type="month"
                      :placeholder="nowMonth"
                      prefix-icon="i-prefix-icon"
                      format="yyyy-MM"
                      value-format="yyyy-MM"
                      @change="dateChange">
              </el-date-picker>
          </div>
          <div class="search" v-if="!isConsortium && !$store.state.isConsortiumList">
              <input class="textinput" type="text" placeholder="搜索医院名称" @click.stop="showMedicalconsortium" @input="inputChange" @compositionstart="flag = false" @compositionend="flag = true" />
              <img src="~@/assets/质控指标/搜索医院.png" alt="">
              <div class="HospitalJoinedList" v-show="isHospitalJoinedListShow"
                   v-loading='isHospitalJoinedListLoading'
                   element-loading-text="拼命加载中"
                   element-loading-spinner="el-icon-loading"
                   element-loading-background="rgba(0, 0, 0, 0.8)" >
                  <div class="joined-item" v-for="item in HospitalJoinedList" @click="gotoMedicalconsortium(item)">
                      {{item.hospital_name}}
                  </div>
              </div>
          </div>

            <div class="consortium" v-if="isConsortium">
<!--                <div class="text">医联体</div>-->
<!--                <el-dropdown trigger="click"   @command="test">-->

                        <div id="name" v-if="$route.path === '/medicalconsortium'" @click.stop="dropdow">医联体</div>
                        <div id="name" v-else @click.stop="dropdow">{{$route.query.name}}</div>
<!--                    <el-dropdown-menu slot="dropdown" style="left:1382px !important">-->
<!--                        <el-dropdown-item :command="{name:item.hospital_name,id:item.hospital_id,index:1}" v-for="(item,i) in hospitalList">{{item.hospital_name}}</el-dropdown-item>-->
<!--                    </el-dropdown-menu>-->
<!--                </el-dropdown>-->
                <img @click.stop="dropdow" src="~@/assets/MedicalConsortium/箭头.png" alt="">
                    <div id="dropdow" v-show="isHospitalJoinedListShow2">
                        <div class="dropdow-main" @click="backToConsort">医联体</div>
                                                <div class="dropdow-item" @click="test({name:item.hospital_name,id:item.hospital_id,index:1})" v-for="(item,i) in hospitalList">{{item.hospital_name}}<div/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getHospitalList,getHospitalJoinedList} from '@/utils/api';
    import Throttle from "@/utils/Throttle";
    import ControlRange from "@/views/Contrlindex/components/ControlRange";



    export default {
    name: "Header",
    components:{
      ControlRange,

    },
    props:{
      title:{
        type:String
      },
      isConsortium:{
        type:Boolean,
        default:false
      },

    },
    data(){
      return {
        hospitalList:[

        ],
        HospitalJoinedList:[

        ],
        isHospitalJoinedListLoading:true,   // 医联体列表加载中
        isHospitalJoinedListShow:false,   // 医联体列表是否显示
        isHospitalJoinedListLoading2:true,   // 医联体列表加载中
        isHospitalJoinedListShow2:false,   // 医联体列表是否显示
        dateValue:'2020年11月',
        nowMonth:'',
        flag:false,

      }
    },
      mounted() {


        // const date = new Date().toLocaleDateString().substr(0,7).replace('/','-')
        this.nowMonth = '2020-11';

        if(!this.isConsortium) return; // 不显示医联体下拉框，不进行多余请求

        const params = new URLSearchParams();
        params.append('area_type',1);
        params.append('hospital_joined_id',localStorage.getItem('hospital_joined_id'));
        this.$axios.post(getHospitalList,params).then(res => {
          this.hospitalList = res.data.data;
        })
      },
      methods:{
        dropdow(){
          this.isHospitalJoinedListShow2 = !this.isHospitalJoinedListShow2;

          document.onclick = () => {
           this.isHospitalJoinedListShow2 = false;
          }
        },
        test(e){
          this.$store.state.zkTitle = e;
          this.$store.state.area_type = 5;

            this.$router.push({
              path:'/hospital',
              query:{
                name:e.name,
                id:e.id,
                province:this.$route.query.province,
                city:this.$route.query.city,
              }
            }).catch(err => {})

        },
        showMedicalconsortium(){    // 显示该层级下的医联体
          this.isHospitalJoinedListShow = true;   // 显示列表

          const _this = this;
          const params = new URLSearchParams();
          params.append('area_type',this.$store.state.area_type);
            switch (this.$store.state.area_type) {
              case 2:
                params.append('province',this.$store.state.province);
                break;
              case 3:
                params.append('city',this.$store.state.city);
                break;
            }
            this.$axios.post(getHospitalJoinedList,params).then(res => {

              document.onclick = function () {
                _this.isHospitalJoinedListShow = false;
              }

               this.HospitalJoinedList = res.data.data; // 保存数据

              this.isHospitalJoinedListLoading = false; // 加载完成
            })
        },
        gotoMedicalconsortium(item){
          this.$router.push({
            path:'medicalconsortium',
            query:{
              name:item.hospital_name,
              id:item.hospital_id,
              province:item.province,
              city:item.city
            }
          })
        },
        backToConsort(){    // 返回到医联体
            this.$router.push(this.$store.state.hospital_joined_path)
        },
        choseDate(){
          this.$refs.saveDateInput.$refs.reference.$refs.input.focus()
        },
        inputChange(e){
          const name = e.currentTarget.value;
          this.isHospitalJoinedListShow = true;   // 显示列表

          const _this = this;
          const params = new URLSearchParams();
          params.append('area_type',this.$store.state.area_type);
          params.append('hospital_joined_name',name);
          switch (this.$store.state.area_type) {
            case 2:
              params.append('province',this.$store.state.province);
              break;
            case 3:
              params.append('city',this.$store.state.city);
              break;
          }
          this.$axios.post(getHospitalJoinedList,params).then(res => {

            document.onclick = function () {
              _this.isHospitalJoinedListShow = false;
            }

            this.HospitalJoinedList = res.data.data; // 保存数据

            this.isHospitalJoinedListLoading = false; // 加载完成
          })
        },
        dateChange(e){  // 选择日期
          this.$store.state.start = this.dateValue;
          this.$store.state.end = this.dateValue;
        },
        back(){ // 地图返回
          if(this.$route.path=== '/hospital'){
            this.$router.push(this.$store.state.hospital_joined_path)
          }else{
            this.$router.push('/controlindex')
          }

        }
      },
      watch: {
        '$store.state.hospital_joined_id'(val) {
          const params = new URLSearchParams();
          params.append('area_type', 1);
          params.append('hospital_joined_id', val);
          this.$axios.post(getHospitalList, params).then(res => {
            this.hospitalList = res.data.data;
          })
        },
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
        display: flex;
        align-items: center;
        font-size: 2rem;
        color:#333333;
        font-weight: 800;
    }

    #header>.title>.logo{
      margin-right:0.5rem;
    }

    .mini{
        font-size: 1.5rem !important;
    }

    .tools{
        display: flex;
        align-items: center;
    }

    .date,.consortium{
        position: relative;
        font-size: 1.25rem;
        color:#008599;
        font-weight: bolder;
    }

    .tools .search{
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

    .search,.textinput{
        width: 8rem;
        border:none;
        background-color: transparent;
        outline: none;
        color:#000;
        font-size: 1rem;
      font-weight: 800;
    }

    .tools .search,.textinput::placeholder{
        border:none;
        outline: none;
        color:#ccc;
        font-size: 1rem;
    }

    .joined-item{
      font-weight: 400;
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

    #name{
        font-size: 1rem;

      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
    }

    #dropdow{
        overflow-y: scroll;
        top: 3rem;
        right: 0;
        height: 12rem;
      width: 14rem;
        position: absolute;
        font-size: 1rem;
        color:#8492a6;
        font-weight: 400;
        padding: 10px 0;
        margin: 5px 0;
        background-color: #fff;
        border: 1px solid #ebeef5;
        border-radius: 4px;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        z-index: 3;
        animation-duration: 0.3s;

        transition-timing-function: linear ;
        animation-name: joined_list;
    }
    
    @keyframes joined_list {
        from{
           height: 0;
        }
        to{
            height: 8rem;
        }
    }
    



    .dropdow-item,.dropdow-main{
        line-height: 36px;

        margin: 0;
        font-size: 14px;
        color: #606266;
        cursor: pointer;
        outline: none;
        padding:0.6rem 1rem;

        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .dropdow-item:hover,.dropdow-main:hover{
        color: #1989fa;
      background-color: #ecf5ff;
    }

    .HospitalJoinedList{
        box-sizing: border-box;
        z-index: 2;
        position: absolute;
        right: -2rem;
        bottom: -23rem;
        width: 20rem;
        height: 23rem;
        background-color: #fff;
        overflow-y: scroll;
        padding: 1rem 0;
        box-shadow: 0px 0px 5px 0px rgba(74, 182, 214, 0.23);
        color:#606266;

        cursor:pointer;
    }

    .HospitalJoinedList>.joined-item{
        padding:0.6rem 1rem;
        line-height: 2rem;
    }

    .HospitalJoinedList>.joined-item:hover{
        color:#6ab5ff;
        background-color: #ecf5ff;

    }

    /deep/ .el-input__inner{
        border-radius: 1rem;
        color:#008599;
        font-weight: 800;
        font-size: 1rem;
    }

    /deep/ .el-input__inner::placeholder{
        font-weight: 800;
        font-size: 1rem;
        color:#008599;
        outline: none;

    }

    /deep/ .el-input__inner:focus {
        border-color:#DCDFE6;
        outline: 0;
    }

    /deep/ .i-prefix-icon{
        position:absolute;
        right: -14rem;
        top: 0;
        display: block;
        height: 2.5rem;
        width: 2.5rem;
        background-image: url("~@/assets/质控指标/筛选日期.png");
        background-size: 100% 100%;
    }

    /deep/ .el-month-table td.today .cell {
       color: #fff;
       font-weight: 400;
    }

    .back{
      display: flex;
      justify-content: center;
      text-align: center;
      align-items: center;
      background-image: url('~@/assets/质控指标/返回首页.png');
      background-size:100% 100%;
      width: 6.28rem;
      height: 2.61rem;
      user-select: none;
      color:#fff;
      cursor:pointer;
      position: relative;
      right: 20rem;
    }
</style>