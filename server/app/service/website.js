'use strict'

const Service = require('egg').Service;

class WebsitService extends Service {
    async getHomePageData(){
        // 首页数据
        let bookList = await this.ctx.service.book.getBookList({page:1,total:3})
        let blogList = await this.ctx.service.blog.getBlogList({page:1,total:3})
        let recommendBook = await this.ctx.service.book.getBookList({page:1,total:1})
        let recommendBlog = await this.ctx.service.blog.getBlogList({page:1,total:3})
        let videoList = await this.ctx.service.video.getVideoList({page:1, total:3})
        let title = "首页-星星报告"
        return {
            bookList,
            blogList,
            recommendBlog,
            recommendBook,
            videoList,
            title,
        }
    }
}

module.exports = WebsitService;