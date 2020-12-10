import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    content:[], // 第一页数据
    // home左排名数据
    scoreList:[], // 质控分数排名
    area_type:1,
    province:'',
    city:'',
    zkTitle:'全国', // 质控指标标题
    sjTitle:'全国', // 数据概览标题
    currentDataIndex1:0,
    isLoading1:true,
    isLoading2:true,
    core_name:'', // 根据这个指标获取医联体
    subItem:{},
    sidebar:{
      left:false,
      right:false
    },
    operatePage:{
      left:true,
      right:false
    },
    start:'2020-11',  // 质控指标时间 start
    end:'2020-11',  //  质控指标时间 end
    zkRank:{},
    isChina:true, // 质控指标显示数据是否是全国
    isConsortiumList:false, // 质控指标显示数据是否是医联体列表
    hospital_joined_id:null, // 质控指标 医联体列表
  },
  mutations: {
    setlRank(state,lRank){
      state.lRank = lRank;
      return state;
    },
    setrRank(state,rRank){
      state.rRank = rRank;
      return state;
    },
    isChina(state,bool){
      state.isChina = bool;
      return state;
    }
  },
  actions: {
    setlRank(context,payload){
      context.commit('setlRank',payload)
    }
  },
  modules: {
  }
})
