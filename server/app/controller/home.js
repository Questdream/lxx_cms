'use strict';

const Controller = require('egg').Controller;
const checkagent = require("../utils/checkagent");
class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // ctx.body = 'hi, egg';
    const ua = checkagent(ctx.request.header["user-agent"]);
    let data = await this.ctx
  }
}

module.exports = HomeController;
