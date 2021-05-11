import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../views/Home"
import Layout from "../views/Layout"
import Login from "../views/Login"
import Book from "../views/Book"
import Blog from "../views/Blog"
import BlogDetail from "../components/BlogDetail"
import Video from "../views/Video"
import Resource from "../views/Resource"
import User from "../views/User"
import Chapter from "../components/Chapter"
import Section from "../components/Section"
import SectionDetail from "../components/SectionDetail"


Vue.use(VueRouter)

const routes = [
  {
    path:"/",
    name:"layout",
    component: Layout,
    children: [
      {
        path: "/",
        name:'',
        component: Home
      },
      {
        path: "/book",
        component: Book
      },
      {
        path: "/chapter",
        component: Chapter
      },
      {
        path: "/section",
        component: Section
      },
      {
        path: "/section/:id",
        component: SectionDetail
      },
      {
        path:"/createSection",
        component: SectionDetail
      },

      {
        path:"/blog",
        component: Blog
      },
      {
        path:"/blog/:id",
        component: BlogDetail
      },
      {
        path:"/createBlog",
        component: BlogDetail
      },
      {
        path:"/video",
        component: Video
      },
      {
        path:"/resource",
        component:Resource
      },
      {
        path:"/user",
        component:User
      }
      
    ]
  },
  {
    path:"/login",
    name: "Login",
    component: Login
  }
]




const router = new VueRouter({
  mode: 'history',   //模式  history hash ，
  base: process.env.BASE_URL, //定义一个基础URL，用的是vue-cli默认的配置项。
  routes  //配置项
})

router.beforeEach((to,from,next) => {
  if(to.path == '/login'){
    next();
  }else{
    if(localStorage.getItem("token")){
      next();
    }else{
      next("/login")
    }
  }
})

export default router
