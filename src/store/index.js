import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // home左排名数据
    lRank:[
          {
            area:'江苏',
            number:66
          },
          {
            area:'江苏',
            number:54
          },
          {
            area:'江苏',
            number:45
          },
          {
            area:'江苏',
            number:34
          },
          {
            area:'江苏',
            number:28
          },
          {
            area:'江苏',
            number:18
          },
          {
            area:'江苏',
            number:18
          },
          {
            area:'江苏',
            number:18
          },
          {
            area:'江苏',
            number:18
          },
          {
            area:'江苏',
            number:18
          },
          {
            area:'江苏',
            number:18
          }
    ],
    rRank:[
      {
        area:'江苏',
        number:66
      },
      {
        area:'江苏',
        number:54
      },
      {
        area:'江苏',
        number:45
      },
      {
        area:'江苏',
        number:34
      },
      {
        area:'江苏',
        number:28
      },
      {
        area:'江苏',
        number:18
      },
      {
        area:'江苏',
        number:18
      },
      {
        area:'江苏',
        number:18
      },
      {
        area:'江苏',
        number:18
      },
      {
        area:'江苏',
        number:18
      },
      {
        area:'江苏',
        number:18
      },
      {
        area:'江苏',
        number:18
      },
      {
        area:'江苏',
        number:18
      },
      {
        area:'江苏',
        number:18
      }
],
    sidebar:{
      left:false,
      right:false
    },
    operatePage:{
      left:true,
      right:false
    }
  },
  mutations: {
    setlRank(state,lRank){
      state.lRank = lRank;
      return state;
    },
    setlRank(state,rRank){
      state.rRank = rRank;
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