'use strict';

const Service = require('egg').Service;
var md5 = require('md5-node');

class UserService extends Service {
    // 登录请求处理
    async login(username,password){
        try {
            let passwordMd5 = md5(password);
            // 根据提供的用户名去找到数据库里面的用户
            const user = await this.app.model.User.findOne({
                where: {
                    username
                }
            })
            // 再判断这个提供的用户和数据库中是否匹配
            if(user){
                let psd = user.dataValues.password;
                let usr = user.dataValues.username;

                if(username == usr && passwordMd5 == psd){
                    // 验证成功则生成token并且返回
                    const token = this.app.jwt.sign({
                        username:username
                    }, this.app.config.jwt.secret);
                    return token;
                }else{
                    return false;
                }
            }else{
                return false;
            }

        } catch (error) {
            return false
        }
    }
    // 新增管理员账号
    async createUser(body){
        try {
            const user = {
                username: body.username,
                password: md5(body.password)
            }
            await this.app.model.User.create(user);
            return true
        } catch (error) {
            return false
        }
    }
    // 删除管理员账号
    async deleteUser(id){
        try {
            await this.app.model.User.destroy({
                where: {
                    id
                }
            })
        } catch (error) {
            return false
        }
    }
    // 修改密码
    async resetPassword(id, password){
        try {
            this.app.model.User.update({
                password: md5(password)
            }, {
                where: {
                    id
                }
            })
        } catch (error) {
            return false
        }
    }
    // 查询所有账号
    async getUserList(){
        try {
            const userList = await this.app.model.User.findAll();
            return userList;
        } catch (error) {
            return false
        }
    }
    
}

module.exports = UserService