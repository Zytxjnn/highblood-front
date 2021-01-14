<template>
    <div id="date">
       <div class="time">{{date.toLocaleString('chinese', { hour12: false }).substring(9,19)}}</div>
       <div class="line"></div>
        <div class="date">
           <span>{{date.toLocaleString('chinese', { hour12: false }).substring(0,10).replace(/\//g,'-')}}</span>
          <span>{{day[date.getDay()]}}</span>
       </div>
    </div>
</template>

<script>
  export default {
    name: "Date",
    data(){
      return {
        time:'',
        date:new Date(),
        day: ['星期天','星期一','星期二','星期三','星期四','星期五','星期六'],
      }
    },
    created() {
        setInterval(() => {
            this.date = new Date();
        },1000)
    },
    methods:{
        // getDateandTime(){
        //     const day = ['星期天','星期一','星期二','星期三','星期四','星期五','星期六'];
        //     let date = new Date();
        //     let newdate = date.toLocaleString('chinese', { hour12: false });
        //     this.date = newdate.substring(0,11).replace(/\//g,'-');
        //     this.time = newdate.substring(11,19);
        //     // 星期几
        //     this.day = day[date.getDay()];
        // }
    },
    filters:{

    }
  }
</script>

<style scoped>

    #date{
        position: absolute;
        top: 0.5rem;
        right: 7.44rem;
        font-size: 1rem;
        background-image: -webkit-linear-gradient(bottom, #8DD3FF,#FFFFFF);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        display: flex;
        align-items: center;
    }

    #date .time{
        margin-right: 1.32rem;
    }

    #date .line{
        width: 1px;
        height: 1rem;
        background: linear-gradient(#8DD3FF,#FFFFFF);
    }

    #date .date{
        margin-left: 1.32rem;
    }
</style>