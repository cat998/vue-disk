<template>
<div>
  <button @click="root" style="position:fixed;top:0px;left:0px;">此电脑</button><input type="text">
    <div v-for="(item,index) in disks" :key="index + 'c'" class="disk fileitem" :data-path="item.path" @dblclick="open_directory(item.path)" @contextmenu.prevent="rightclick(item.path)"><img src="./img/disk.ico" width=20px height=20px alt=""/>&nbsp;本地磁盘&nbsp;({{item.name}}:)</div>

  <table id="sample2" width="100%" border="0" cellpadding="0" cellspacing="0" style="width:100%;">
    <tr><td>名称</td><td>修改日期</td><td>类型</td><td>大小</td></tr>
    <tr v-for="(item,index) in directory" :key="index+item.name"  class="directory fileitem" :data-path="item.path" @dblclick="open_directory(item.path)">
      <td><img src="./img/directory.ico" width=20px height=20px alt=""/>&nbsp;{{item.name}}</td><td>{{getLocalTime(item.mtime)}}</td><td>{{item.type}}</td><td></td>
    </tr>
    <tr v-for="(item,index) in files" :key="index + 'b'" class="file fileitem" :data-path="item.path" @dblclick="open_file(item.path)">
      <td><img src="./img/file.ico" width=20px height=20px alt=""/>&nbsp;{{item.name}}</td><td>{{getLocalTime(item.mtime)}}</td><td>{{item.type}}</td><td>{{toThousands(item.size)}}&nbsp;KB</td>
    </tr> 
  </table>
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
    },
    toThousands:function(num) {
        var result = [ ], counter = 0;
        num = (num || 0).toString().split('');
        for (var i = num.length - 1; i >= 0; i--) {
            counter++;
            result.unshift(num[i]);
            if (!(counter % 3) && i != 0) { result.unshift(','); }
        }
        return result.join('');
    },
    getLocalTime:function(nS) {     
      return new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/,' ');     
    },
    rightclick:function(item_path){

    }
  }
}
</script>
