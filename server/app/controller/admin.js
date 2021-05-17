'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
    // 后台管理登录请求处理
    async login(){
        try {
            const body = this.ctx.request.body;
            const token = await this.ctx.service.user.login(body.username,body.password)
            if(token){
                this.ctx.body = {
                    code:20000,
                    message:true,
                    token:token
                }
            }
        } catch (error) {
            this.ctx.body = {
                code: 40000,
                message: "登录失败"
            }
        }
    }
}

module.exports = LoginController