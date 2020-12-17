import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/Home1.vue'
import Home2 from '@/views/Home/Home2.vue'
import Home3 from '@/views/Home/Home3.vue'
import ControlIndex from "@/views/Contrlindex/ControlIndex";
import MedicalConsortium from "@/views/Contrlindex/MedicalConsortium";
import Hospital from "@/views/Contrlindex/Hospital";

// VueRouter.prototype.push = function push(location){
//   return this.original
//   // return original.call(this,location).catch(err => err)
// }

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home1',
    component: Home
  },
  {
    path: '/home2',
    name: 'home2',
    component: Home2
  },
  {
    path: '/home3',
    name: 'Home3',
    component: Home3
  },
  {
    path:'/controlindex',
    component:ControlIndex
  },
  {
    path:'/medicalconsortium',
    component:MedicalConsortium
  },
  {
    path:'/hospital',
    component:Hospital
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
