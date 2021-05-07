<template>
    <div class="sectionCreate">
        <div class="title">
            <el-input v-model="title" placeholder="小节标题"></el-input>
        </div>
        <div class="title">
            <el-input v-model="orderby" placeholder="排序权重"></el-input>
        </div>
        <!-- 富文本编辑器 -->
        <div class="edit">
            <mavon-editor 
                ref="md"
                @change="changData"
                @imgAdd ="imgAdd"
                @imgDel = "imgDel"
                v-model="md_text"/>
        </div>
        <div>
            <!-- 保存 -->
            <el-button type="success" @click="save" class="title_titleb">保存</el-button>
        </div>
    </div>
</template>

<script>
import request from "../utils/request"
export default {
    data(){
        return {
            title: "",
            md_text: "",
            html_text: "",
            orderby: ""
        }
    },
    // 使用计算属性获得从url路由中获得相应的参数
    computed: {
        // 通过？参数= 的方式传参使用query来获得
        chapter_id(){
            return this.$route.query.chapter_id
        },
        // 通过 /参数 的方式传参使用params来获得
        id(){
            return this.$route.params.id;
        }
    },
    created(){
        // 从后台获取到这节的详细信息
        if(this.id){
            request({
                url: `/section/${this.id}`,
                method: "get"
            }).then((res) => {
                let section = res.data.data;
                this.title = section.title;
                this.md_text = section.md_text;
                this.html_text = section.html_text;
                this.orderby = section.orderby;
                this.chapter_id = section.chapter_id;
            })
        }
    },
    methods: {
        changData(){},
        imgDel(){},
        imgAdd(pos, $file){
            // 第一步，将图片上传到服务器
            var formdata = new FormData();
            formdata.append("image", $file);
            console.log($file, "$file");
            request({
                url: process.env.VUE_APP_UPLOAD_API,
                method: "post",
                data: formdata,
            }).then((res) => {
                // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)

                    // 说明
                    /**
                     * $vm 指为mavonEditor实例，可以通过如下两种方式获取
                     * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
                     * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
                     */
                    // 开发环境使用使用开发环境取消注释
                    // let url = "http://127.0.0.1:7007" + res.data.file;
                    let url = res.data.data.file;
                    this.$refs.md.$img2Url(pos, url);
            }).catch((err) => {
                    console.log(err);
            });
        },
        save(){
            if(this.id){
                this.updateSection();
            }else{
                this.createSection();
            }
        },
        createSection(){
            request({
                url: "/section",
                method: "post",
                data: {
                    md_text: this.md_text,
                    html_text:this.html_text,
                    title: this.title,
                    chapter_id: this.chapter_id,
                    orderby: this.orderby
                }
            }).then(() => {
                this.$router.push(`/section?chapter_id=${this.chapter_id}`)
            })
        },
        updateSection(){
            request({
                url: `/section/${this.id}`,
                method: "put",
                data: {
                     md_text: this.md_text,
                    html_text:this.html_text,
                    title: this.title,
                    chapter_id: this.chapter_id,
                    orderby: this.orderby
                }
            }).then(() => {
                this.$router.push(`/section?chapter_id=${this.chapter_id}`)
            })
        }
    }
}
</script>