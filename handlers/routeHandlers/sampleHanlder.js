

const handler = {};

handler.sampleHandler = (requestProperties,callback)=>{
    callback(200,{
        message : 'this is a sample url just',
    });
    console.log('sample');
}

module.exports = handler;