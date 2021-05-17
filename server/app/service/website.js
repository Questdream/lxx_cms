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
    async getBlogList(query){// 博客列表
        let blog = await this.ctx.service.blog.getBlogList(query);// 通过query获取所有博客数据
        // let recommendBlog = await this.ctx.service.blog.getBlogList({page:1,total:3})// 推荐博客
        // let recommendBook = await this.ctx.service.book.getBookList({page:1,total:3})// 推荐书籍
        // let title = "博客-星星报告" // 标题
        return {
            blog,
            // recommendBlog,
            // recommendBook,
            // title,
        }

    }
    async getBlogDetail(id){ // 博客详情
        let blog = await this.ctx.service.blog.getBlogDetail(id);
        return {
            blog,
        }

    }
    async getVideoList(){  // 视频列表
        let videoList = await this.ctx.service.video.getVideoList({page:1,total:100}) // 查看视频列表
        return {
            videoList,
        }
    }
    async getVideoDetail(id){// 获得视频详情
        let video = await this.ctx.service.video.getVideoDetail(id);
        let videoList = await this.ctx.service.video.getVideoList({page:1,total:100}) // 查看视频列表
        return {
            video,
            videoList,
        }

    }
    async getResourceList(){
        let resourceList = await this.ctx.service.resource.getResourceList({page:1,total:100})
        return {
            resourceList,
        }
    }
    async getBookList(){
        let bookList = await this.ctx.service.book.getBookList({page:1,total:100});
        return {
            bookList,
        }
    }
}

module.exports = WebsitService;