var express=require('express');
var hbs=require('hbs');
var fs=require('fs');

const port=process.env.PORT || 3000;
var app=express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine','hbs')
app.use(express.static(__dirname + '/public'))



app.use((req,res, next)=>{
  var now=new Date().toString();
  var log=`${now}: ${req.ip} , ${req.method} , ${req.path}`;

  console.log(log);
  fs.appendFile('server.log',log + '\n',(err)=>{
    if(err){
      console.log('Unable to append file to server.log');
    }
  });
  next();
});
/*  res.render('mentanace.hbs');
});*/

hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});
app.get('/',(req,res)=>{
  res.send('Hi , Express from dj');
});

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitile:'About Page'
  });
});

app.listen(port,()=>{
  console.log(`Server is up on port ${port}.`)
});
