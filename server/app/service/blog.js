'use strict';

const Service = require('egg').Service;

class BlogService extends Service {
    async getBlogList(query){
        try {
            const number = parseInt(query.page);
            const start = number * 10 - 10;
            const degree = parseInt(query.total);
            const blogList = await this.app.model.blog.findAll({
                limit: [start, degree]
            })
            return blogList;
        } catch (error) {
            return null
        }
    }
};

module.exports = BlogService;