'use strict';

const Service = require('egg').Service;

class BookService extends Service {
    // 获取查询所有书籍列表
    async getBookList(query){
        try {
            const number = parseInt(query.page);
            const start = number * 10 - 10;// 表示10条数据为1页
            const degreee = parseInt(query.total);
            // 注意此处的Book首字母大写，数据库模型首字母必须大写
            const bookList = await this.app.model.Book.findAll({
                limit: [start, degreee], // 获得有限制的书籍列表数，第一个参数表示第几页开始，第二个表示总共几条数据
                'order': [
                    ['orderby', 'asc']
                ],
            })
            return bookList;
        } catch (error) {
            return null
        }
    }
    // 增加书籍
    async createBook(body){
        try {
            const book = {
                title: body.title,
                img: body.img,
                orderby: body.orderby
            }
            await this.app.model.Book.create(book);
            return true;
        } catch (error) {
            return false
        }
    }
    // 删除书籍
    async deleteBook(id){
        try {
            await this.app.model.Book.destroy({
                where: {
                    id
                }
            })
            return true;
        } catch (error) {
            return false
        }
    }

    // 修改书籍
    async updateBook(id, {title,img,orderby}){
        try {
            await this.app.model.Book.update({
                title,
                img,
                orderby
            }, {
                where: {
                    id
                }
            })
            return true;
        } catch (error) {
            return false;
        }
    }
    

};

module.exports = BookService;