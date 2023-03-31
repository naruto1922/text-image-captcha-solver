const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const optiic = new (require('optiic'))({
    apiKey: 'api_test_key' // Not required, but having one removes limits (get your key at https://optiic.dev).
  });
const app = express();
 
app.set('view engine', 'ejs');
var urla="null";
app.use(bodyParser.urlencoded({
 extended: true
}));
app.use(express.static('public'));
 
app.get("/",function(req,res){
   
    if(urla==="null"){
        res.render("index");
    }else{
        let options = {
            image: urla, // url of the image
            mode: 'ocr', // ocr
          };
          optiic.process(options)
          .then(result => {
           // console.log(result);
            res.render("result",{urla:result.text})
          })
        const result="";
        
    }
})

app.post("/",function(req,res){
    urla=req.body.urla;
    res.redirect("/")
}) 
app.listen(3001, function() {
 console.log('Server started on port 3000');
});