# shuoshuo

## 简介
这是一个单页的聊天网页, 无需登录, 可以发表文字, 图片和链接,
(声音未实现). 显示的内容从新到旧排序. 

## todo
* 支持发表声音
* 无限加载
* 服务器没有发送首页, 所以需要直接打开, 就是在ui目录下的index.html

## 技术栈
这次使用了typescript, mongoose, restify, materializecss, jquery.

## 依赖
需要 nodejs>=4.x 和 npm 和 mongodb

## 安装
使用`npm install`安装必要依赖,
我以前总是忘记, 这次把 mongodb 的配置文件加上来了,
就是根目录下的 imgserver.conf 文件

## 启动
使用`npm start`启动服务器, 并手动打开 ui 目录下的 shuohuo.html

## 将ts编译成js
使用`npm run build`编译成js

## 目录说明
src 目录是服务器部分的源代码,
app 目录是 src 目录编译成的 js 代码,
ui 目录是客户端部分的代码,
mongodbimage的配置文件是 imgserver.conf

## 预览
![预览](./doc/show.png)

