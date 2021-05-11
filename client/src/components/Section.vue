<template>
    <div>
        <el-button type="danger" round @click="creatSection">添加小节</el-button>
        <!-- 添加表格 -->
        <el-table
        :data="sectionList"
        border>
            <el-table-column
                align="center"
                label="序号"
                type="index"
                width="100">
            </el-table-column>
            
            <el-table-column
                prop="title"
                label="姓名">
            </el-table-column>

            <el-table-column
                label="操作"
                width="200">
                <template slot-scope="scope">
                    <el-button @click="updateSection(scope.row.id)" type="text" size="small">编辑</el-button>
                    <el-button @click="deleteSection(scope.row.id)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import request from "../utils/request"
export default {
    data(){
        return {
            sectionList: [],
            title: ""
        }
    },
    computed:{
        chapter_id(){
            return this.$route.query.chapter_id;
        }
    },
    created(){
        this.getSectionList();
    },
    methods: {
        getSectionList(){
            request.get(`/section?chapter_id=${this.chapter_id}`).then(res => {
                this.sectionList = res.data.data;
            })
        },
        creatSection(){
            this.$router.push(`/createSection?chapter_id=${this.chapter_id}`)
        },
        updateSection(id){
            this.$router.push(`/section/${id}?chapter_id=${this.chapter_id}`)
        },
        deleteSection(id){
             this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                request.delete(`/section/${id}`).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getSectionList();
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