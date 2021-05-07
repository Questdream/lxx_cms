<template>
    <div class="book">
        <!-- 添加按钮 -->
        <el-button type="danger" round @click="creatResource">添加网盘资源</el-button>
        <!-- 添加表格 -->
        <el-table
        :data="resourceList"
        border>
            <el-table-column
                align="center"
                label="序号"
                width="100">
            </el-table-column>
            <el-table-column
                label="姓名"
                >
            </el-table-column>
            <el-table-column
                prop="name"
                label="提取码">
            </el-table-column>
            <el-table-column
                prop="address"
                label="下载地址"
                width="100">
            </el-table-column>
            <el-table-column
                label="操作"
                width="200">
                <template slot-scope="scope">
                    <el-button @click="updateResource(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button @click="deleteResource(scope.row.id)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 添加百度资源的对话框 -->
        <el-dialog title="添加资源" :visible.sync="dialogFormVisible" width="30%">
            <el-form>
                <el-form-item label="资源名称">
                <el-input v-model="title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="资源地址">
                <el-input v-model="url" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="提取码">
                <el-input v-model="code" autocomplete="off"></el-input>
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
            resourceList:[],
            dialogFormVisible:false,
            isEdit: false,
            updateId: 0,
            title:"",
            url:"",
            code:""
            
        }
    },
    created(){
        this.getResourceList();
    },
    methods: {
        getResourceList(){
            request.get(`/resource`).then((res) => {
                this.resourceList = res.data.data;
            })
        },
        creatResource(){
            this.dialogFormVisible = true;
            this.title = "";
            this.isEdit = false;
        },
        updateResource(row){
            this.dialogFormVisible = true;
            this.title = row.title;
            this.updateId = row.id;
            this.url = row.url;
            this.code = code;
            this.isEdit = true;
        },
        deleteResource(id){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                request.delete(`/resource/${id}`).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getResourceList();
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
                request.put(`/resource/${this.updateId}`, {
                    title: this.title,
                    code: this.code,
                    url: this.url,
                }).then(() => {
                    this.getResourceList();
                    this.dialogFormVisible = false;
                })
            }else{
                request.post(`/resource`, {
                    title: this.title,
                    code: this.code,
                    url: this.url,
                }).then(() => {
                    this.getResourceList();
                    this.dialogFormVisible = false;
                })
            }
        }
    }
}
</script>