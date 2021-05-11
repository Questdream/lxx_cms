<template>
    <div class="blog">
        <el-button type="danger" round @click="createBlog">新建博客</el-button>
        <!-- 添加表格 -->
        <el-table
        :data="blogList"
        border>
            <el-table-column
                type="index"
                align="center"
                label="序号"
                width="100">
            </el-table-column>
            <el-table-column
                prop="img"
                label="封面">
                <template slot-scope="scope">
                    <!-- <h1>{{scope.row.img}}</h1> -->
                    <img class="pic" :src="scope.row.img" alt="">
                </template>
            </el-table-column>
            <el-table-column
                prop="title"
                label="标题"
                >
            </el-table-column>
            <el-table-column
                label="操作"
                >
                <template slot-scope="scope">
                    <el-button @click="updateBlog(scope.row.id)" type="text" size="small">编辑</el-button>
                    <el-button @click="deleteBlog(scope.row.id)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>


<script>
import request from '../utils/request';

export default {
    data(){
        return {
            blogList: []
        }
    },
    // 从后台拿到数据来初始化blog页面
    created(){
        this.getBlogList();
    },
    methods: {
        getBlogList(){
            request.get("/blog?page=1&total=10").then((res) => {
                this.blogList = res.data.data;
                console.log(this.blogList)
            })
        },
        // 创建博客
        createBlog(){
            this.$router.push("/createBlog");
        },
        // 编辑博客
        updateBlog(id){
            this.$router.push(`/blog/${id}`)
        },
        // 删除博客
        deleteBlog(id){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                request.delete(`/blog/${id}`).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getBlogList();
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        }
    }
}
</script>

<style scoped>
.blog .pic {
    width: 50px;
    height: 50px;
}
</style>