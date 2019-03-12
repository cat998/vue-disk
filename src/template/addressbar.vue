<template>
<div>
  <button @click="root">{{text}}</button>
</div>
</template>

<script>
export default {
  name: 'addressbar',
  data () {
    return {
       text: '此电脑',
       files:[],
       disks:[],
       directory:[],
    }
  },
  methods:{
    root:function(){
      GetPanfu();
    },
    open_file:function(path){
      console.log(path);
      shell.openItem(path);
      app.getFileIcon(path,(err,icon)=>{
        console.log(icon);
      });
      //open_file_default(path);
    }
  }
}

</script>
