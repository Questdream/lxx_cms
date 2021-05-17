'use strict';

const Controller = require('egg').Controller;
const checkagent = require("../utils/checkagent");
class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // ctx.body = 'hi, egg';
    const ua = checkagent(this.ctx.request.header["user-agent"]);
    let data = await this.ctx.service.website.getHomePageData();
    if(ua){
      await this.ctx.render("pc/home.html", data)
    }else{
      await ctx.render("phone/home.html", data)
    }
  }
}

module.exports = HomeController;
