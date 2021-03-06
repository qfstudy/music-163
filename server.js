var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]
var qiniu=require('qiniu')

if(!port){
  console.log('请指定端口号好不啦？\nnode server.js 8888')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url 
  var queryString = ''
  if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  /******************/

  console.log('含查询字符串的路径\n' + pathWithQuery)
 if(path==='/uptoken'){
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/json;charset=utf-8')
    response.setHeader('Access-Control-Allow-Origin', '*')
    // response.removeHeader('Date')
   
    var config=fs.readFileSync('./qiniu-config.json')
   
    config=JSON.parse(config)
    // console.log(config)
    let{accessKey,secretKey}=config
    // var accessKey = config.accessKey;
    // var secretKey = config.secretKey;
    var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
   
    var options = {
      scope: '163-music-demo-1',
    };
    var putPolicy = new qiniu.rs.PutPolicy(options);
    var uploadToken=putPolicy.uploadToken(mac);

    response.write(`
    {
      "uptoken": "${uploadToken}"
    }
    `)
    response.end()
  }else if(path==='/leanCloud'){
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/json;charset=utf-8')
    response.setHeader('Access-Control-Allow-Origin', '*')
   
    var config=fs.readFileSync('./leanCloud-config.json')
   
    config=JSON.parse(config)
    console.log(config)
    let{APP_ID,APP_KEY}=config
    // var APP_ID = config.APP_ID;
    // var APP_KEY = config.APP_KEY;
    
    response.write(`
    {
      "APP_ID": "${APP_ID}",
      "APP_KEY": "${APP_KEY}"
    }
    `)
    response.end()
  }else{
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.end()
  }

  /******** ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n打开 http://localhost:' + port)


