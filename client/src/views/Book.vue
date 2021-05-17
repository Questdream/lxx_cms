<template>
    <div class="book">
        <!-- 添加按钮 -->
        <el-button type="danger" round @click="creatBook">添加书籍</el-button>
        <!-- 添加表格 -->
        <el-table
        :data="bookList"
        border>
            <el-table-column
                align="center"
                label="序号"
                type="index"
                width="100">
            </el-table-column>
            <el-table-column
                prop="img"
                label="封面">
                <!-- scope对象可以获得table的所有数据 -->
                <template slot-scope="scope">
                    <!-- <h1>hello</h1>
                    <h1>{{scope.row.img}}</h1> -->
                    <img class="pic" :src = "scope.row.img" alt />
                </template>

            </el-table-column>
            <el-table-column
                prop="title"
                label="姓名">
            </el-table-column>
            <el-table-column
                prop="address"
                label="详情"
                width="100">
                <template slot-scope="scope">
                    <h1>{{scope.row.id}}</h1>
                    <el-button @click="getDetail(scope.row.id)" type="text" size="small">查看章</el-button>
                </template>

            </el-table-column>
            <el-table-column
                label="操作"
                width="200">
                <template slot-scope="scope">
                    <el-button @click="updateBook(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button @click="deleteBook(scope.row.id)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 添加书籍的对话框 -->
        <el-dialog title="添加书籍" :visible.sync="dialogFormVisible" width="30%">
            <!-- 注意可以使用冒号绑定方法，官网文档是冒号绑定属性 -->
            <div class="cover">
                <span>上传封面：</span>
                <el-upload
                class="upload-demo"
                drag
                :action="getUploadUrl()"
                :on-success="handSuccess"
                :file-list="fileList"
                multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </div>
            <el-form >
                <el-form-item label="书籍名称">
                <el-input v-model="title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="排序权重">
                <el-input v-model="orderby" autocomplete="off"></el-input>
                </el-form-item>
                
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="save">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>


<script>
import request from "../utils/request"
export default {
    data(){
        return {
            dialogFormVisible:false,
            title:"",
            isEdit:false,
            updateId: 0,
            orderby: "",
            fileList: [],
            bookList: [],
            img: "",
        }
    },
    created(){
        this.getBookList();
    },
    methods: {
        // 添加书籍的对话框
        creatBook(){
            this.dialogFormVisible = true;
            this.title = "";
            this.isEdit = false;
        },
        // 得到某篇文章具体的章节情况
        getDetail(id){
            this.$router.push(`/chapter?book_id=${id}`)
        },
        // 封装得到请求后台获得所有书籍列表
        getBookList(){
            request.get(`/book?page=1&total=10`).then((res) => {
                this.bookList = res.data.data;
                console.log(res.data)
            })
        },
        getUploadUrl(){
            return process.env.VUE_APP_UPLOAD_API
        },
        // 图片上传成功的钩子函数
        handSuccess(res, file, fileList){
            console.log(file);
            console.log(fileList);
            this.img = res.data.file;
        },
        updateBook(row){
            // 通过scope可以获得这一行的所有table数据
            this.dialogFormVisible = true;
            this.title =row.title;
            this.isEdit = true;
            this.updateId = row.id;
            this.orderby = row.orderby;
            this.fileList = [{url: row.img}];
            this.img = row.img
        },
        deleteBook(id){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                request.delete(`/book/${id}`).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getBookList();
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        save(){
            if(this.isEdit){
                request.put(`/book/${this.updateId}`, {
                    title: this.title,
                    img: this.img,
                    orderby: this.orderby
                }).then(() => {
                    this.getBookList();
                    this.dialogFormVisible = false;
                })
            }else{
                request.post(`/book`, {
                    title: this.title,
                    img: this.img,
                    orderby: this.orderby
                }).then(() => {
                    this.getBookList();
                    this.dialogFormVisible = false;
                })
            }
        }


    }
}
</script>

<style scoped>
.book .pic {
    width: 50px;
    height: 50px;
}
</style>