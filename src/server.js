const express = require('express');
const app = express();

const mongoose = require('mongoose');
const Note = require('./models/Note');
const bodyParser =require('body-parser');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://sachin133hm:AX2JHxJMz0f0RqWr@cluster1.kbuop6u.mongodb.net/notesdb').then(function(){
    app.get('/', function(req,res){
        //req is what we send form front end to  server
        //res is what we send from server to  front end 
     
        res.json({
            message: "API IS Working !"
        });
     
     });

     const noteRouter = require('./routes/Note');
     app.use('/notes',noteRouter);
     
     


});



const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log("Server running at PORT: " +PORT);
});