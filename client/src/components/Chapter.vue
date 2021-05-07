<template>
    <div class="chapter">
         <!-- 添加按钮 -->
        <el-button type="danger" round @click="creatChapter">添加章</el-button>
        <!-- 添加表格 -->
        <el-table
        :data="chapterList"
        border>
            <el-table-column
                align="center"
                label="序号"
                width="100">
            </el-table-column>
            
            <el-table-column
                prop="title"
                label="姓名">
            </el-table-column>

            <el-table-column
                label="详情"
                width="100">
                <template slot-scope="scope">
                    <el-button @click="getDetail(scope.row.id)" type="text" size="small">查看章</el-button>
                </template>
            </el-table-column>

            <el-table-column
                label="操作"
                width="200">
                <template slot-scope="scope">
                    <el-button @click="updateChapter(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button @click="deleteChapter(scope.row.id)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 添加章的对话框 -->
        <el-dialog title="添加章" :visible.sync="dialogFormVisible" width="30%">
            <el-form>
                <el-form-item label="标题" >
                <el-input v-model="title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="权重">
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
import request from '../utils/request';
export default {
    data(){
        return {
            chapterList: [],
            dialogFormVisible: false,
            title: "",
            isEdit: false,
            updateId: 0,
            orderby: "",
        }
    },
    // 使用计算属性获得书籍的id
    computed: {
        book_id(){
            return this.$route.query.book_id;
        }
    },
    // 使用周期函数来获得列表信息
    created(){
        this.getChapterList();
    },
    methods: {
        getChapterList(){
            // let id = this.$route.params.id; // restful风格使用params获得参数
            request.get(`/chapter?book_id=${this.book_id}`).then((res) => {
                this.chapterList = res.data.data;
            })
        },
        getDetail(id){
            this.$router.push(`/section?chapter_id=${id}`)
        },
        creatChapter(){
            this.dialogFormVisible = true;
            this.title = "";
            this.isEdit = false;
            this.orderby = ""
        },
        updateChapter(row){
            this.dialogFormVisible = true;
            this.title = row.title;
            this.isEdit = true;
            this.updateId = row.id;
            this.orderby = row.orderby
        },
        deleteChapter(id){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                request.delete(`/chapter/${id}`).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getChapterList();
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
                request.put(`/chapter/${this.updateId}`, {
                    title:this.title,
                    book_id: this.book_id,
                    orderby: this.orderby
                }).then(() => {
                    this.getChapterList();
                    this.dialogFormVisible = false;
                })
            }else{
                request.post(`/chapter`, {
                    title:this.title,
                    book_id: this.book_id,
                    orderby: this.orderby
                }).then(() => {
                    this.getChapterList();
                    this.dialogFormVisible = false;
                })
            }
        }

    }
}
</script>