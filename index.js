/* 
 * Title : Uptime Monitoring Application 
 * Description :  A RESTfull API to monitor up and down time of user defiend links
 * Author : Pijush Chakma
 * Dtae : 29/11/2022
 */

const http = require('http');
const url = require('url');
const {StringDecoder} = require ('string_decoder');
const environment = require('./helpers/environments');
// const { decode } = require('punycode');

const {handleReqRes} = require('./helpers/handleReqRes');
const data = require('./lib/data')

// app object -module scaffolding
const app = {};


//...................This section is just for testing the file input ....................

data.create('test','newFile',{'name ': 'pijush','language':'c++','location':'god knows'},(err)=>{
    //console.log(`The error was : `, err);
})

data.readData('test','newFile',(err,data)=>{
    //console.log(data);
   // console.log(`The error was : `, err);
})
data.update('test','newFile',{'name': 'Bangladesh','capital':'Dhaka','population':'Jene ki Lav?'},(err)=>{
    //console.log(err);
})


data.deleteFile('test','newFile',(err)=>{
    //console.log(err);
})
//...................This section is just for testing the file input ....................
// Create Server
app.createServer = ()=>{
    const server = http.createServer(app.handleReqRes); 
    server.listen(environment.port,()=>{
        console.log(`I am listening on port : ${environment.port}`);
        console.log(`My Environment Name is : ${environment.envName}`);
        //console.log('new Console');
    });
}


//handle request and response
app.handleReqRes = handleReqRes;


// start the server
app.createServer();