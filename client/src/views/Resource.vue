<template>
    <div class="book">
        <!-- 添加按钮 -->
        <el-button type="danger" round @click="creatResource">添加网盘资源</el-button>
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
            </el-table-column>
        </el-table>
        <!-- 添加百度资源的对话框 -->
        <el-dialog title="添加资源" :visible.sync="dialogFormVisible" width="30%">
            <el-form :model="form">
                <el-form-item label="资源名称" :label-width="formLabelWidth">
                <el-input v-model="form.title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="资源地址" :label-width="formLabelWidth">
                <el-input v-model="form.url" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="提取码" :label-width="formLabelWidth">
                <el-input v-model="form.code" autocomplete="off"></el-input>
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
            tableData:[],
            formLabelWidth:"",
            dialogFormVisible:false,
            form: {
                title:"",
                url:"",
                code:""
            }
        }
    },
    methods: {
        creatResource(){
            this.dialogFormVisible = true
        }
    }
}
</script>