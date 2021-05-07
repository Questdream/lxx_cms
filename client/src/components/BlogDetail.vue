<template>
    <div class="blogcreate">
        <div class="cover">
            <span>上传封面：</span>
                <el-upload
                class="upload-demo"
                drag
                :action="getUploadUrl()"
                multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
        </div>
        <div class="title">
            <el-input v-model="title" placeholder="节名称"></el-input>
        </div>
        <!-- 富文本编辑器 -->
        <div class="edit">
            <mavon-editor v-model="md_text"/>
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
            md_text: "",
            html_text: "",
            img: "",
            title: "",
       }
   },
   computed: {
       // 先监视路由中有没有参数传递过来，若没有id值，则表示创建博客，若有id则表示编辑博客
       id(){
           return this.$route.params.id;
       }
   },
   created(){
       // 若是编辑博客，则需要从数据库中拿到数据进行显示从而继续编辑
       if(this.id){
           request({
               url: `/blog/${this.id}`,
               method: "get"
           }).then((res) => {
               let blog = res.data.data;
               this.title = blog.title;
               this.img = blog.img;
               this.md_text = blog.md_text;
               this.html_text = blog.html_text;
           })
       }
   },
   methods: {
       getUploadUrl(){
           return process.env.VUE_APP_UPLOAD_API;
       },
       save(){
           if(this.id){
               this.updataBlog();
           }else{
               this.createBlog();
           }
       },
       createBlog(){
           request({
               url: "/blog",
               method: "post",
               data: {
                    md_text:this.md_text,
                    html_text:this.html_text,
                    img:this.img,
                    title:this.title
               }
           }).then(() => {
               this.$router.push("/blog")
           })
       },
       updataBlog(){
           request({
               url: `/blog/${this.id}`,
               method: "put",
               data: {
                    md_text:this.md_text,
                    html_text:this.html_text,
                    img:this.img,
                    title:this.title
               }
           }).then(() => {
               this.$router.push("/blog")
           })
       }
   }
}
</script>