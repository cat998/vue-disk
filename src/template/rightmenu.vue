<template>
    <div>666
        <ul><li v-for="(item,index) in menu" :key="index+'m'" @click="item.call(item.name)">{{item.name}}666</li></ul>
    </div>
</template>

<script>
export default {
        data() {
            return {
                menu: [{
                    "name":"编辑",
                    "call":this.changeli
                },
                {
                    "name":"删除",
                    "call":this.shanchu
                }]
            }
        },
        methods: {
            changeli: function(s) {
                alert("编辑"+s);
            },
            shanchu:function(s){
                alert("删除"+s);
            }
        }
    }
</script>
