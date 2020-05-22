const express = require('express');
const upload = require('express-fileupload');
const hbs = require('hbs')
const mymodule = require('./mymodules/convert.js')
const app = express();

// for parsing application/json
app.use(upload()); 


app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + "/views/partals")

app.get('/',(req, res)=>{
    res.render('index.hbs')
})          
app.get('/style.css',(req,res)=>{
    res.sendFile(__dirname+'/views/style.css')
})        
app.get('/main.js',(req,res)=>{
    res.sendFile(__dirname+'/views/main.js')
})
app.post('/upload',(req,res)=>{
    if(req.files.upfile){
        const file = req.files.upfile;//sve o fajlu
        const name = file.name; // ime fajla
        const type = file.mimetype;//provjera koji 
        if(type.includes('word')){
        const uploadpath = __dirname+'/upload/'+name;
        const uploadpathpdf = __dirname+'/upload/'+name+'.pdf';
        file.mv(uploadpath, (err)=>{  //funkcija koja upisuje fajl na server na odredjenu lokaicju
           if(err){ console.log('file upload failed', name, err );
            res.send('Error');
        }
        else{
          mymodule.convert(uploadpath,uploadpathpdf)
              .then(done=>{
                  res.download(uploadpathpdf)
              })  
              
               .catch(err=>{
                  console.log(err)
                })
  
        }
        })
    }
    else{
        res.send('ne moze ajstore')
    }
    }
})
app.listen(3000);