'use strict';

const Service = require("egg").Service;

class VideoService extends Service {
    // 查询视频列表
    async getVideoList(query){
        try {
            const number = parseInt(query.page);
            const start = number * 10 - 10;
            const degree = parseInt(query.total);
            const blogList = await this.app.model.Video.findAll({
                limit: [start, degree]
            })
            return blogList;
        } catch (error) {
            return null
        }
    }
    // 增加视频
    async createVideo(body){
        try {
            const video = {
                title: body.title,
                img: body.img,
                iframe_url: body.iframe_url
            }
            await this.app.model.Video.create(video);
            return true;
        } catch (error) {
            return false;
        }
    }
    // 删除视频
    async deleteVideo(id){
        try {
            await this.app.model.Video.destroy({
                where: {
                    id
                }
            })
            return true;
        } catch (error) {
            return false;
        }
    }
    // 修改视频
    async updateVideo(id, {
        title,
        img,
        iframe_url
    }){
        try {
            await this.app.model.Video.update({
                title,
                img,
                iframe_url
            }, {
                where: {
                    id
                }
            })
            return true;
        } catch (error) {
            return false;
        }
    }
    // 查询某个视频
    async getVideoDetail(id){
        try {
            let video = await this.app.model.Video.findOne({
                where: {
                    id
                }
            });
            return video;
        } catch (error) {
            return false;
        }
    }
};

module.exports = VideoService;