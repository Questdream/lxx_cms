'use strict';

const Controller = require('egg').Controller;
const checkAgent = require("../utils/checkagent");

class VideoController extends Controller {
    // 增加视频
    async create(){
        try {
            let body = await this.ctx.request.body;
            await this.ctx.service.video.createVideo(body);
            this.ctx.body = {
                code: 20000,
                message: true
            }
        } catch (error) {
            this.ctx.body = {
                code: 30000,
                message: false
            }
        }
    }

    // 删除视频
    async destroy(){
        try {
            let id = await this.ctx.params.id;
            await this.ctx.service.video.deleteVideo(id);
            this.ctx.body = {
                code: 20000,
                message: true
            }
        } catch (error) {
            this.ctx.body = {
                code: 30000,
                message: false
            }
        }
    }
    // 修改视频
    async update(){
        try {
            let body = await this.ctx.request.body;
            let id = await this.ctx.params.id;
            await this.ctx.service.video.updateVideo(id, body);
            this.ctx.body = {
                code: 20000,
                message: true
            }
        } catch (error) {
            this.ctx.body = {
                code: 30000,
                message: false
            }
        }
    }
    // 查询视频列表
    async index(){
        try {
            let query = this.ctx.request.query;
            let videoList = await this.ctx.service.video.getVideoList(query);
            this.ctx.body = {
                code: 20000,
                message: true,
                data: videoList
            }
        } catch (error) {
            this.ctx.body = {
                code: 30000,
                message: false
            }
        }
    }
    // 查询某个视频根据id
    async show(){
        try {
            const id = await this.ctx.params.id;
            const video = await this.ctx.service.video.getVideoDetail(id);
            this.ctx.body = {
                code: 20000,
                message: true,
                data: video
            }
        } catch (error) {
            this.ctx.body = {
                code: 30000,
                message: false
            }
        }
    }
    // 查询video页面
    async getVideoPage(){
        const ua = checkAgent(this.ctx.request.header["user-agent"]);
        let data = await this.ctx.service.website.getVideoList();
        if(ua){
            await this.ctx.render("pc/video.html", data);
        }else {
            await this.ctx.render("phone/video.html", data)
        }
    }
    // 根据id查询详情视频
    async getVideoDetail(){
        const ua = checkAgent(this.ctx.request.header["user-agent"]);
        let id = this.ctx.params.id;
        let data = await this.ctx.service.website.getVideoDetail(id);
        if(ua){
            await this.ctx.render("pc/video_detail.html", data);
        }else{
            await this.ctx.render("phone/video_detail.html", data);
        }
    }
}

module.exports = VideoController;