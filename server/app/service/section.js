'use strict';

const Service = require('egg').Service;

class SectionService extends Service {
    // 添加节
    async createSection(body){
        try {
            const section = {
                title: body.title,
                orderby: body.orderby,
                md_text: body.md_text,
                html_text: body.html_text,
                chapter_id: body.chapter_id
            }
            await this.app.model.Section.create(section);
            return true;
        } catch (error) {
            return false;
        }
    }
    // 删除节
    async deleteSection(id){
        try {
            await this.app.model.Section.destroy({
                where: {
                    id
                }
            })
        } catch (error) {
            return false
        }
    }
    // 修改节
    async updateSection(id, {
        title,
        orderby,
        md_text,
        html_text,
        chapter_id
    }){
        try {
            await this.app.model.Section.update({
                title,
                chapter_id,
                md_text,
                html_text,
                orderby
            }, {
                where: {
                    id
                }
            })
            return true;
        } catch (error) {
            return false
        }
    }
    // 查询节
    async getSectionDetail(id){
        try {
            const section = await this.app.model.Section.findOne({
                where: {
                    id
                }
            })
            return section;
        } catch (error) {
            return false;
        }
    }
     // 通过章的ID获取此书籍的节
     async getSectionList(chapter_id){
        try {
            const sectionList = await this.app.model.Section.findAll({
                'order':[
                    ['orderby', 'asc']
                ],
                include: [{
                    model: this.app.model.Chapter,
                    as: 'chapter'
                }],
                where: {
                    chapter_id
                }
            });
            return sectionList;
        } catch (error) {
            return false;
        }
    }

}

module.exports = SectionService;