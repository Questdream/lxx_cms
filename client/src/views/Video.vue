<template>
    <div class="video">
        <el-button type="danger" round @click="createVideo">添加视频</el-button>
        <!-- 添加表格 -->
        <el-table
        :data="videoList"
        border>
            <el-table-column
                align="center"
                label="序号"
                width="100">
            </el-table-column>

            <el-table-column
                label="封面">
                <template slot-scope="scope">
                    <img class="pic" :src="scope.row.img" alt />
                </template>
            </el-table-column>

            <el-table-column
                label="姓名">
            </el-table-column>
            
            <el-table-column
                label="详情">
                <template slot-scope="scope">
                    <el-button @click="getDetail(scope.row.iframe_url)" type="text" size="small">浏览视频</el-button>
                </template>
            </el-table-column>

            <el-table-column
                label="操作">
                <template slot-scope="scope">
                    <el-button @click="updateVideo(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button @click="deleteVideo(scope.row.id)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 添加视频播放的小窗口 -->
        <el-dialog title="添加" :visible.sync="videoIsShow" width="800px">
            <div class="test" v-html="video_url"></div>
        </el-dialog>

        <!-- 添加视频的对话框 -->
        <el-dialog title="添加视频" :visible.sync="dialogFormVisible" width="30%">
            <div class="cover">
                <span>上传封面：</span>
                <el-upload
                class="upload-demo"
                drag
                :action="getUpUrl()"
                multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </div>
            <el-form>
                <el-form-item label="视频标题">
                <el-input v-model="title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="视频地址">
                <el-input v-model="iframe_url" autocomplete="off"></el-input>
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
            dialogFormVisible:false,
            videoList: [],
            iframe_url: "",
            videoIsShow: false,
            title: "",
            isEdit: false,
            updateId: 0,
            img: "",
            video_url: ""
        }
    },
    created(){
        this.getVideoList();
    },
    methods: {
        // 从后台获取页面展示情况
        getVideoList(){
            request.get(`/video`).then((res) => {
                this.videoList = res.data.data;
            })
        },
        // 上传图片的地址
        getUpUrl(){
            return process.env.VUE_APP_UPLOAD_API;
        },
        // 添加新的视频
        createVideo(){
            // 调出对话框来添加视频，将变量清空
            this.dialogFormVisible = true;
            this.title = "";
            this.iframe_url = "";
            this.isEdit = false;
        },
        // 获得视频观看窗口
        getDetail(iframe_url){
            this.videoIsShow = true;
            this.video_url = iframe_url;
        },
        // 编辑视频情况
        updateVideo(row){
            this.dialogFormVisible = true;
            this.title = row.title;
            this.updateId = row.id;
            this.iframe_url = row.iframe_url;
            this.img = row.img;
            this.isEdit = true;
        },
        // 删除视频
        deleteVideo(id){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                request.delete(`/video/${id}`).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getVideoList();
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        // 保存修改或者新建
        save(){
            if(this.isEdit){
                request.put(`/video/${this.updateId}`, {
                    title: this.title,
                    img: this.img,
                    iframe_url: this.iframe_url,
                }).then(() => {
                    this.getVideoList();
                    this.dialogFormVisible = false;
                })
            }else{
                request.post(`/video`, {
                    title: this.title,
                    img: this.img,
                    iframe_url: this.iframe_url,
                }).then(() => {
                    this.getVideoList();
                    this.dialogFormVisible = false;
                })
            }
        }
    }
}
</script>