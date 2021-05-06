<template>
    <div class="user">
        <!-- 添加按钮 -->
        <el-button type="danger" round @click="creatUser">添加管理员</el-button>
        <!-- 添加表格 -->
        <el-table
        :data="userList"
        border>
            <el-table-column
                align="center"
                label="序号"
                width="100">
            </el-table-column>
            <el-table-column
                prop="name"
                label="管理员">
            </el-table-column>
            <el-table-column
                label="操作"
                width="200">
                <template slot-scope="scope">
                    <el-button @click="resetPassword(scope.row.id, scope.row.name)" type="text" size="small">重置密码</el-button>
                    <el-button @click="deleteUer(scope.row.id)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 添加管理员的对话框 -->
        <el-dialog title="添加管理员" :visible.sync="dialogFormVisible" width="30%">
            <el-form :model="form">
                <el-form-item label="用户名">
                <el-input v-model="form.username" :disabled="canBeEdited"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                <el-input v-model="form.password" autocomplete="off"></el-input>
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
            userList: [],
            dialogFormVisible: false,
            isEdit:false,
            updateId: 0,
            canBeEdited:false,
            form : {
                username:"",
                password:""
            }
        }
    },
    methods: {
        creatUser(){
        this.dialogFormVisible =  true;
        this.form.username = "";
        this.form.password = "";
        },
        getUserList(){
            request.get(`/user`).then( res => {
                this.userList = res.data.data;
            })
        },
        resetPassword(id, name){
            this.dialogFormVisible = true;
            this.isEdit = true;
            this.updateId = id;
            this.form.username = name;
            this.canBeEdited = true;
            this.password = "";
        },
        deleteUer(id){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                request.delete(`/user/${id}`).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getUserList();
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
                request.put(`/user/${this.updateId}`, {
                    password:this.form.password
                }).then(() => {
                    this.getUserList();
                    this.dialogFormVisible = false;
                })
            }else{
                request.post(`/user`, {
                    username: this.form.username,
                    password: this.form.password
                }).then(() => {
                    this.getUserList();
                    this.dialogFormVisible = false;
                })
            }
        }

    },
    created(){
        this.getUserList();
    }
    
}
</script>