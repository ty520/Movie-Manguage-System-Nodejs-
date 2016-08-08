# 基于Node.js的电影管理系统
应用技术：Express+Mongoose+Jade及bower+grunt等项目管理工具

项目文件说明：
1.项目的入口文件app.js;
2.路由配置文件routes/index.js;
3.静态资源（js/css/image/libs（Boostrap&Jquery库文件））文件public;
4.app->controllers:各个页面的路由API；
5.app->schemas:mongoose中Schem定义——即数据库数据存储形式和操作
6.app->models:根据schema产生models模板
7.app->views各个页面的Jade模板。
8.node_modules:根据package.json文件 npm install 各个依赖库

项目介绍：
1.电影模块——首页电影展示、电影后台录入、电影后台跟新、电影列表页面、电影删除；
2.用户模块——用户的注册登录，根据用户权限设定其访页面及操作权限；包括用户列表、用户信息删除、用户注册、登录及登出；
3.电影分类——根电影类别分类展示，同时利用豆瓣的开发工具同步豆瓣上的电影。

项目使用说明：
下载后直接进入项根目录——>根据package.json安装依赖库（npm install repoName --save-dev）——>运行grunt即可。


