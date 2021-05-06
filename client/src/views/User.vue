<template>
    <div class="user">
        <!-- 添加按钮 -->
        <el-button type="danger" round @click="creatUser">添加管理员</el-button>
        <!-- 添加表格 -->
        <el-table
        :data="tableData"
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
            </el-table-column>
        </el-table>
        <!-- 添加管理员的对话框 -->
        <el-dialog title="添加管理员" :visible.sync="dialogFormVisible" width="30%">
            <el-form :model="form">
                <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input v-model="form.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                <el-input v-model="form.password" autocomplete="off"></el-input>
                </el-form-item>
                
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data(){
        return {
            dialogFormVisible: false,
            form : {
                username:"",
                password:""
            }
        }
    },
    methods: {
        creatUser(){
        this.dialogFormVisible =  true
        }
    }
    
}
</script>