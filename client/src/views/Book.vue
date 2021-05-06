<template>
    <div class="book">
        <!-- 添加按钮 -->
        <el-button type="danger" round @click="creatBook">添加书籍</el-button>
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
                label="封面"
                >
            </el-table-column>
            <el-table-column
                prop="name"
                label="姓名">
            </el-table-column>
            <el-table-column
                prop="address"
                label="详情"
                width="100">
            </el-table-column>
            <el-table-column
                label="操作"
                width="200">
            </el-table-column>
        </el-table>
        <!-- 添加书籍的对话框 -->
        <el-dialog title="添加书籍" :visible.sync="dialogFormVisible" width="30%">
            <div class="cover">
                <span>上传封面：</span>
                <el-upload
                class="upload-demo"
                drag
                action="https://jsonplaceholder.typicode.com/posts/"
                multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </div>
            <el-form :model="form">
                <el-form-item label="书籍名称" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="排序权重" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
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
            dialogFormVisible:false,
            form: {
                name:"",
                region:""
            }
        }
    },
    methods: {
        creatBook(){
            this.dialogFormVisible = true
        }
    }
}
</script>