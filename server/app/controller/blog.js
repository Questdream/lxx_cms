'use strict';

const Controller = require('egg').Controller;
const checkAgent = require("../utils/checkagent");

class BlogController extends Controller {
    // 增加博客
    async create(){
        try {
            const body = await this.ctx.request.body; // {title, img, md_text,html_text}
            await this.ctx.service.blog.createBlog(body);
            this.ctx.body = {
                code: 20000,
                message: true
            }
        } catch (error) {
            this.ctx.body = {
                code: 50000,
                message: false
            }
        }
    }
    // 删除博客
    async destroy(){
        try {
            const id = await this.ctx.parms.id;
            await this.ctx.service.blog.deleteBlog(id);
            this.ctx.body = {
                code: 20000,
                message: true
            }
        } catch (error) {
            this.ctx.body = {
                code: 2000,
                message: false
            }
        }
    }
    // 修改博客
    async update(){
        try {
            const body = await this.ctx.request.body;
            const id = await this.ctx.params.id;
            await this.ctx.service.blog.updateBlog(id, body);
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
    // 查看博客
    async index(){
        try {
            const query = await this.ctx.request.query;
            const blogList = await this.ctx.service.blog.getBlogList(query);
            this.ctx.body = {
                code: 20000,
                message: true,
                data: blogList
            }
        } catch (error) {
            this.ctx.body = {
                code: 30000,
                message: false
            }
        }
    }
    // 查找指定的一篇博客
    async show(){
        try {
            const id = await this.ctx.params.id;
            const blog = await this.ctx.service.blog.getBlogDetail(id);
            this.ctx.body = {
                code: 20000,
                message: true,
                data: blog
            }
        } catch (error) {
            this.ctx.body = {
                code: 20000,
                message: false
            }
        }
    }
    async getBlogPage(){
        const ua = checkAgent(this.ctx.request.header['user-agent']);
        let data = await this.ctx.service.website.getBlogList({
            page:1,
            total:100
        })
        if(ua){
            await this.ctx.render("pc/blog.html",data);
        }else{
            await this.ctx.render("phone/blog.html", data);
        }
    }
    async getBlogDetail(){
        const ua = checkAgent(this.ctx.request.header["user-agent"]);
        const id = this.ctx.params.id; // 获取博客id
        let data = await this.ctx.service.website.getBlogDetail(id);
        if(ua){
            await this.ctx.render("pc/blog_detail.html", data);
        }else{
            await this.ctx.render("phone/blog_detail.html", data);
        }
    }

}

module.exports = BlogController;