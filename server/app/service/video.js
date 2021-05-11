'use strict';

const Service = require("egg").Service;

class VideoService extends Service {
    // 查询视频列表
    async getVideoList(query){
        try {
            const number = parseInt(query.page);
            const start = number * 10 - 10;
            const degree = parseInt(query.total);
            const blogList = await this.app.model.video.findAll({
                limit: [start, degree]
            })
            return blogList;
        } catch (error) {
            return null
        }
    }
};

module.exports = VideoService;