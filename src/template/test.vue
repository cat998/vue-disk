<template>
<div>
  <div v-for="(item,index) in sortdisks" :key="index + 'c'" class="disk" :data-path="item.path" @dblclick="open_directory(item.path)" @contextmenu.prevent="rightclick(item.path)"><img src="./img/disk.ico" width=20px height=20px alt=""/>&nbsp;本地磁盘&nbsp;({{item.name}}:)</div>
  <div id="pathbar" style="clear:both;">  
    <button v-for="(item,index) in pathlog" :key="index+'path'" @click="open_directory(item.path)">{{item.name}}\</button>
  </div>
  <div>
  <table id="tb_1" width="80%" border="0" cellpadding="10" cellspacing="0">
    <tr style="font-size:0.8em;"><td>名称</td><td>修改日期</td><td>类型</td><td style="text-align:right;">大小</td></tr>
    <tr v-for="(item,index) in directory" :key="index+item.name"  class="directory fileitem" :data-path="item.path" @dblclick="open_directory(item.path)">
      <td><img src="./img/directory.jpg" width=13px height=15px alt=""/>&nbsp;{{item.name}}</td><td>{{getLocalTime(item.mtime)}}</td><td>{{item.type}}</td><td></td>
    </tr>
    <tr v-for="(item,index) in files" :key="index + 'b'" class="file fileitem" :data-path="item.path" @dblclick="open_file(item.path)">
      <td><img src="./img/file.jpg" width=13px height=15px alt=""/>&nbsp;{{item.name}}</td><td>{{getLocalTime(item.mtime)}}</td><td>{{item.type}}</td><td style="text-align:right;">{{toThousands(item.size)}}&nbsp;KB</td>
    </tr> 
  </table>
  </div>
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
       pathlog:[],
    }
  },
  computed:{
    sortdisks:function(){
      return this.disks.sort((a,b)=>{
        return a.name>b.name;
      });
    }
  },
  methods:{
    open_directory:function(path){
      var a=path.split("\\")
      this.pathlog=[];
      for(var i=0;i<a.length;i++){
        if(a[i]==""){
          continue;
        }
        if(i==0){
          this.pathlog.push({"name":"本地磁盘("+a[i].toUpperCase()+")","path":a[i]+'\\'});
          continue;
        }
        this.pathlog.push({"name":a[i],"path":a.slice(0,i+1).join("\\")});
      }
      console.log(path);
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
