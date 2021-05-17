'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  // 网页
  router.get('/', controller.home.index);
  // 网页-博客
  router.get("/blog", controller.blog.getBlogPage);
  router.get("/blog/:id", controller.blog.getBlogDetail);
  // 网页-视频
  router.get("/video", controller.video.getVideoPage);
  router.get("/video/:id", controller.video.getVideoDetail)
  // 网页-资源
  router.get("/resource", controller.resource.getResourcePage);
  // 网页-书籍
  router.get("/book", controller.book.getBookPage);
  



  // 后台功能接口
  router.post('/api/login', controller.admin.login); // 管理用户登录
  router.resources('user', '/api/user', app.middleware.checktoken(), controller.user);//用户管理
  router.resources('book', "/api/book", app.middleware.checktoken(), controller.book);// 书籍管理
  router.post("/api/upload", controller.upload.index);// 图片上传地址

  router.resources('chapter', '/api/chapter', app.middleware.checktoken(), controller.chapter);// 章的管理
  router.resources('section', '/api/section', app.middleware.checktoken(),controller.section);// 节的管理
  router.resources('blog', '/api/blog', controller.blog); // 博客管理
  router.resources('video', '/api/video', app.middleware.checktoken(), controller.video); // 视频管理
  router.resources('resources', '/api/resource', app.middleware.checktoken(), controller.resource)
};
