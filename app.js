'use strict';
var http = require('http');
var fs = require('fs');
//var myurl = require('url');
var port = process.env.PORT || 3000;

http.createServer(function (request, response) {
    // 将url字符串转化URL对象
    const objUrl=new URL(request.url,`http://${request.headers.host}`);

    // 解析请求，包括文件名
    var pathname =objUrl.pathname;
    // 输出请求的文件名
    console.log("Request for " + pathname + " received.");
    // 从文件系统中读取请求的文件内容（要去掉文件名前的“/”）
    fs.readFile(pathname.substring(1), function (err, data) {
        if (err) {
            console.log(err);
            // HTTP 状态码: 404 : NOT FOUND
            // Content Type: text/html
            response.writeHead(404, { 'Content-Type': 'text/html' });
        } else {
            // HTTP 状态码: 200 : OK
            // Content Type: text/html
            response.writeHead(200, { 'Content-Type': 'text/html' });

            // 响应文件内容
            response.write(data.toString());
        }
        //  发送响应数据
        response.end();
    });
}).listen(port);
// 控制台会输出以下信息
console.log(`Server running at http://127.0.0.1:${port}/`);