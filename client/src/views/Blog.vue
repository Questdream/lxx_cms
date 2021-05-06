<template>
    <div class="blog">
        <el-button type="danger" round @click="createBlog">新建博客</el-button>
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
                label="标题"
                >
            </el-table-column>
            <el-table-column
                label="操作"
                >
            </el-table-column>
        </el-table>
    </div>
</template>


<script>
export default {
    methods: {
        createBlog(){
            this.$router.push("/createBlog");
        }
    }
}
</script>