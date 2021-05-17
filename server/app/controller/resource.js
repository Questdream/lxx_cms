'use strict';

const Controller = require('egg').Controller;
const checkAgent = require("../utils/checkagent");
class downloadController extends Controller {
    // 添加资源
    async create(){
        try {
            let body = await this.ctx.request.body;
            await this.ctx.service.resource.createResource(body)
            this.ctx.body = {
                code: 20000,
                message: true
            }
        } catch (error) {
            this.ctx.body = {
                code: 30000,
                message: true
            }
        }
    }
    // 删除资源
    async destroy(){
        try {
			let id = await this.ctx.params.id
			await this.ctx.service.resource.deleteResource(id)
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
    // 修改资源
    async update(){
        try {
			let body = await this.ctx.request.body
			let id = await this.ctx.params.id
			await this.ctx.service.resource.updateResource(id, body)
			this.ctx.body = {
				code: 20000,
				message: true
			}
		} catch (error) {
			this.ctx.body = {
				code: 30000,
				message: false,
			}
		}
    }

    // 查看资源
    async index(){
        try {
			let query = await this.ctx.request.query
			let resourceList = await this.ctx.service.resource.getResourceList(query)
			this.ctx.body = {
				code: 20000,
				message: true,
				data: resourceList,
			}
		} catch (error) {
			this.ctx.body = {
				code: 30000,
				message: false,
			}
		}
    }

	// 获得资源页
	async getResourcePage(){
		const ua = checkAgent(this.ctx.request.header["user-agent"]);
		let data = await this.ctx.service.website.getResourceList({
			page: 1,
			total: 100
		})
		if(ua){
			await this.ctx.render("pc/resource.html", data);
		}else{
			await this.ctx.render("phone/resource.html")
		}
	}

}

module.exports = downloadController;