

const  handler = {};

handler.notFoundHandler =(requestProperties,callback)=>{
    callback(404,{
        message:'your url not found',
    });
    console.log('not found !');

};

module.exports = handler;