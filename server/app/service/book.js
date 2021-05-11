'use strict';

const Service = require('egg').Service;

class BookService extends Service {
    // 获取查询所有书籍列表
    async getBookList(query){
        try {
            const number = parseInt(query.page);
            const start = number * 10 - 10;// 表示10条数据为1页
            const degreee = parseInt(query.total);
            const bookList = await this.app.model.book.findAll({
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
};

module.exports = BookService;