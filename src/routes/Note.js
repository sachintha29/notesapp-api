const express = require('express');
const router = express.Router();

const Note = require('../models/Note');


router.get('/list/:userid', async function(req,res){
    //req is what we send form front end to  server
    //res is what we send from server to  front end 

    var notes = await Note.find({userid: req.params.userid});
 
    res.json(notes);
 
});

router.get('/list', async function(req,res){
   //req is what we send form front end to  server
   //res is what we send from server to  front end 

   var notes = await Note.find();

   res.json(notes);

});

router.post('/add', async function(req,res){
   
   const newNote = new Note({
        id: req.body.id,
        userid: req.body.userid,
        title:  req.body.title,
        content: req.body.content

   });

   await newNote.save();
   const response = {
       message: `New Note Created with id: ${req.body.id}`
   };
   res.json(response);

});

router.put('/update', async function(req,res){
   
   var updateNote = await Note.findOneAndUpdate(
       {id: req.body.id},
       {
       title: req.body.title,
       content: req.body.content
       },
       {new: true} // Return updated Data
       );
       const response = {
           message: `Note has been updated with id: ${req.body.id}`,
           note: updateNote
       };
       res.json(response);

});

router.delete('/delete', async function(req,res){
   
   var deleteNote = await Note.deleteOne({id: req.body.id});
 
   const response = {
       message: `Note has been deleted with id: ${req.body.id}`,
       note : deleteNote
   };
   res.json(response);

});




module.exports = router;