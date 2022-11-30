
// dependencies
const fs = require('fs');
const path = require('path');
const lib = {};

// base directory of the data folder
lib.baseDir = path.join(__dirname,'../.data/');

// write data to file 
lib.create = (dir,file,data,callback)=> {
    //open file for writting 
    fs.open(`${lib.baseDir+dir}/${file}.json`,'wx',(err,fileDescriptor)=>{
        if(!err && fileDescriptor){
            // convert data to string
            const stringData =  JSON.stringify(data);
            fs.writeFile(fileDescriptor,stringData,(err)=>{
                if(!err){
                    fs.close(fileDescriptor,(err)=>{
                        if(!err){
                            callback(false);

                        }else{
                            callback('error closing the new file');
                        }
                    }) 
                }else{
                    callback('error writing to new file');
                }
            })
            
        }else {
            callback('There is an error, there might be a file with same name or file already exists');
        }
    })

}


// read data from file
lib.readData = (dir,file,callback)=>{
    fs.readFile(`${lib.baseDir+dir}/${file}.json`,'utf-8',(err,data)=>{
        callback(err,data);
    })
}

// Update an existing file
lib.update = (dir,file,data,callback)=>{
    fs.open(`${lib.baseDir+dir}/${file}.json`,'r+',(err,fileDescriptor)=>{
        if(!err && fileDescriptor){
            const stringData = JSON.stringify(data);
            fs.ftruncate(fileDescriptor,(err)=>{
                if(!err){
                    fs.write(fileDescriptor,stringData,(err)=>{
                        if(!err){
                            fs.close(fileDescriptor,(err)=>{
                                if(!err){
                                    callback(false);

                                }else{
                                    callback('error closing the file');
                                }
                            })

                        }else{
                            callback('error writing in the file');
                        }
                    })

                }else{
                    callback('error truncating the file ');

                }
            })

        }else{
            callback('error updating, file may not exists');
        }
    })
}
// delete existing file
lib.deleteFile = (dir,file,callback)=>{
    fs.unlink(`${lib.baseDir+dir}/${file}.json`,(err)=>{
        if(!err){
            callback(false);
        }else{
            callback('Error! on deleting the file ');
        }
    })

}
module.exports = lib;