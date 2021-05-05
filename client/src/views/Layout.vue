<template>
    <div class="layout">
        <!-- <h1>hello</h1> -->
        <div class="menu">
            <!-- <h1>nihao</h1> -->
            <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
                <el-radio-button :label="false">展开</el-radio-button>
                <el-radio-button :label="true">收起</el-radio-button>
            </el-radio-group>
            <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
                <el-submenu index="1">
                    <template slot="title">
                    <i class="el-icon-location"></i>
                    <span slot="title">用户管理</span>
                    </template>
                    <el-menu-item index="1-1">用户列表</el-menu-item>
                    <el-menu-item index="1-2">注销</el-menu-item>
                
                </el-submenu>
                <el-menu-item index="2">
                    <i class="el-icon-menu"></i>
                    <span slot="title">书籍管理</span>
                </el-menu-item>
                <el-menu-item index="3" abled>
                    <i class="el-icon-document"></i>
                    <span slot="title">博客管理</span>
                </el-menu-item>
                <el-menu-item index="4">
                    <i class="el-icon-video-camera-solid"></i>
                    <span slot="title">视频管理</span>
                </el-menu-item>
                <el-menu-item index="5">
                    <i class="el-icon-setting"></i>
                    <span slot="title">资源列表</span>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        isCollapse: true
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>


<style>
.layout {
    display: flex;
}
.layout menu {
    width: 200px;
}
el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
</style>