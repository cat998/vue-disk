<template>
<div>
  <button @click="root" style="position:fixed;top:0px;left:0px;">此电脑</button><input type="text">
  <div v-for="(item,index) in directory" :key="index+item.name"  class="directory fileitem" :data-path="item.path" @dblclick="open_directory(item.path)"><img src="./img/directory.ico" width=20px height=20px alt=""/>&nbsp;{{item.name}}</div>
  <div v-for="(item,index) in files" :key="index + 'b'" class="file fileitem" :data-path="item.path" @dblclick="open_file(item.path)"><img src="./img/file.ico" width=20px height=20px alt=""/>&nbsp;{{item.name}}</div>
  <div v-for="(item,index) in disks" :key="index + 'c'" class="disk fileitem" :data-path="item.path" @dblclick="open_directory(item.path)"><img src="./img/disk.ico" width=20px height=20px alt=""/>&nbsp;本地磁盘&nbsp;({{item.name}}:)</div>
</div>
</template>

<script>
export default {
  name: 'test',
  data () {
    return {
       text: '',
       files:[],
       disks:[],
       directory:[],
    }
  },
  methods:{
    root:function(){
      this.files=[];
      this.disks=[];
      this.directory=[];
      GetPanfu();
    },
    open_directory:function(path){
      this.files=[];
      this.disks=[];
      this.directory=[];
      fileDisplay(path);
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
