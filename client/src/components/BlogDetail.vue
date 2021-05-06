<template>
    <div class="blogcreate">
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
        <div class="title">
            <el-input v-model="title" placeholder="节名称"></el-input>
        </div>
        <!-- 富文本编辑器 -->
        <div class="edit">
            <mavon-editor v-model="md_text"/>
        </div>

    </div>
</template>