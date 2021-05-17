'use strict';

const Controller = require('egg').Controller;
const checkagent = require("../utils/checkagent");

class SectionController extends Controller {
    // 增加节
    async create(){
        try {
            const body = this.ctx.request.body;
            body.orderby = Number(body.orderby);
            await this.ctx.service.section.createSection(body);
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
    // 删除节
    async destroy(){
        try {
            const id = this.ctx.params.id;
            await this.ctx.service.section.deleteSection(id);
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
    // 修改节
    async update(){
        try {
            const body = this.ctx.request.body
            const id = this.ctx.params.id;
            await this.ctx.service.section.updateSection(id, body);
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
    // 查询节
    async index(){
        try {
            let chapter_id = this.ctx.request.query.chapter_id;
            const sectionList = await this.ctx.service.section.getSectionList(chapter_id);
            this.ctx.body = {
                code: 20000,
                message: true,
                data: sectionList
            }
        } catch (error) {
            this.ctx.body = {
                code: 30000,
                message: false
            }
        }
    }
}

module.exports = SectionController;