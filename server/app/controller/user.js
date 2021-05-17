'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
    // 增
    async create(){
        try {
            const body = this.ctx.request.body;
            // 创建用户
            await this.ctx.service.user.createUser(body);
            this.ctx.body = {
                code: 20000,
                message: true
            }
        } catch (error) {
            this.ctx.body = {
                code: 30000,
                data: "失败"
            }
        }
    }
    // 删
    async destroy(){
        try {
            const id  = await this.ctx.params.id;
            await this.ctx.service.user.deleteUser(id)
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
    // 改
    async update(){
        try {
            const body = await this.ctx.request.body;
            const id = await this.ctx.params.id;
            const user = await this.ctx.service.user.resetPassword(id, body.password)
        } catch (error) {
            this.ctx.body = {
                code: 30000,
                message: false
            }
        }
    }
    // 查
    async index(){
        try {
            const userList = await this.ctx.service.user.getUserList();
            this.ctx.body = {
                code: 20000,
                message: true,
                data: userList
            }
        } catch (error) {
            this.ctx.body = {
                code: 30000,
                message: false
            }
        }
    }
}

module.exports = UserController;