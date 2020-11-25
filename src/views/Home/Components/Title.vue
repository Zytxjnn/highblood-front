<template>
    <div id="title">
        <span>{{title}}</span>
        <slot name="sub"></slot>
    </div>
</template>

<script>
  export default {
    name: "Title",
    props:{
      title:{
        type:String,
        require:true
      },
      sub:{
        type:String
      }
    }
  }
</script>

<style scoped>
    #title{
      background: linear-gradient(92deg, #0072FF 0%, #00EAFF 48.8525390625%, #01AAFF 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;

      font-weight: 800;

    }
    .sub{
        font-size: 1rem;
    }

    .sub::before{
        content: '---';
    }
</style>