#### 网易云音乐
1. 数据库：[leancloud](https://leancloud.cn/)
>1. leancloud的使用 
>   - 在控制台中创建应用 
>   - 打开文档，[数据存储入门教程 · JavaScript](https://leancloud.cn/docs/leanstorage-started-js.html#hash-2111400081)
>   - 初始化代码：`npm init`
>   - `npm install leancloud-storage --save`
>   - 引用`<script src="//cdn1.lncld.net/static/js/3.6.8/av-live-query-min.js"></script>`

2. 七牛
- 存储对象-》新建存储空间
- 查看文档SDK
- qiniu版本是1.0.22，更改package.json然后npm i
- 引入plupload，版本2.3.2
- plupload依赖moxie.js，npm不能下载moxie.js，可以在本地引入

[JS-SDK]() 依赖服务端颁发 token
token获取的方式：使用node.js写一个本地代理服务器，然后按照[Node.js SDK](https://developer.qiniu.com/kodo/sdk/1289/nodejs)文档实现。因为AccessKey 和 SecretKey不能公开所以放在本地json文件。

模块化、mvc、订阅

---
打开`http-server`时要在根目录打开，要不然无法加载引用的

---
bug 如果存储的数据是空的会有bug

