const libre = require('libreoffice-convert');
const fs = require('fs')
const extend = '.pdf'


 const convert = async function(enterPath,outputPath){
 let one =  await readme(enterPath)
 let two  = await dojob(one,outputPath);
 return await writeme(two,outputPath);
}

 function readme (enterPath){
 return new Promise((resolve,reject)=>{
    fs.readFile(enterPath,(err,data)=>{
    if(err){

      reject('greska u citanju')
    }
    resolve(data)
  })
})}
 function dojob (data, outputPath) {
  return new Promise((resolve,reject)=>{
    libre.convert(data, extend, undefined, (err, done) => {
    if (err) {
      reject(`Error converting file: ${err}`);
    }
    resolve(done)
  })
})
}
 function writeme (data,outputPath){
 return new Promise((resolve,reject)=>{
  fs.writeFile(outputPath,data,(err)=>{
    if(err){
      reject('eror writeing data')
    }
    resolve(true)
  })
 }) 
}
module.exports= {
  convert
}