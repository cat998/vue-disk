
  import Vue from 'vue';
  import Test from './template/test';


  const appVue = new Vue(Test).$mount('#test');

  const {shell,app}=require('electron').remote


  var fs=require("fs");
  var path=require("path")

  //fileDisplay(filePath);//调用文件遍历方法
  function fileDisplay(filePath){//文件遍历方法
    $("#test").html("");
    appVue.files=[];

    appVue.directory=[];
      fs.readdir(filePath,function(err,files){//根据文件路径读取文件，返回文件列表
          if(err){
              console.warn(err)
          }else{
              files.forEach(function(filename){//遍历读取到的文件列表
                  var filedir = path.join(filePath, filename);//获取当前文件的绝对路径
                  fs.stat(filedir,function(eror, stats){//根据文件路径获取文件信息，返回一个fs.Stats对象
                      if(eror){
                          //console.warn('获取文件stats失败');
                      }else{
                          var isFile = stats.isFile();//是文件
                          var isDir = stats.isDirectory();//是文件夹
                          var file_item={"name":filename,"path":filedir,"mtime":stats.mtimeMs}
                          if(isFile){
                            file_item["size"]=Math.ceil(stats.size/1024);
                            var a=filename.split(".")
                            file_item["type"]=a[a.length-1];
                            appVue.files.push(file_item);

                              /*console.log(filedir);
  　　　　　　　　　　　　　　　　　// 读取文件内容
                              var content = fs.readFileSync(filedir, 'utf-8');
                              console.log(content);*/
                          }
                          if(isDir){
                            file_item["type"]="文件夹";
                            appVue.directory.push(file_item);
                              //fileDisplay(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
                          }
                      }
                  })
              });
          }
      });
  }

  GetPanfu();
  function GetPanfu() {
      var panfu=["a:\\","b:\\","c:\\","d:\\","e:\\","f:\\","g:\\","h:\\"]
      panfu.forEach(function(i){
        var resolve_path=path.resolve(i);
        fs.readdir(resolve_path,function(err,files){//根据文件路径读取文件，返回文件列表
            if(err){
                //console.warn(err)
            }else{
                appVue.disks.push({"name":i[0].toUpperCase(),"path":resolve_path});
            }
      });
    });
  }



