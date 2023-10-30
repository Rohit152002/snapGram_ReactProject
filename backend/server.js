import express from "express";
import mongoose from "mongoose";

import { PORT,mongodbUrl} from "./config.js";
import { Book } from "./model/bookModel.js";

const app =express();
app.use(express.json())


app.post('/books', async (req,res)=>{
    try{
        console.log(req.body);
        if(!req.body.title ||!req.body.author||!req.body.publishYear )
        {
            return res.status(400).send({
                message:"Send all required fields : title, author, publishYear",
            })
        }
        const newBook={
            title:req.body.title,
            author:req.body.author,
            publishYear:req.body.publishYear,
        }

        const book=await Book.create(newBook);
        return res.status(200).send(book)

    }catch(err){
        console.log(err.message);
        res.status(500).send({ message: err.message })
    }
})

mongoose
    .connect(mongodbUrl)
    .then(()=>{
        console.log('App connected to database');
        app.listen(PORT, ()=>{
            console.log("App is listening to port :"+PORT);
        })
    }).catch((err)=>{
        console.error(err);
    })


app.get('/',(req,res)=>{
    return  res.status(234).send("Welcome to Mern Stack ");
}) 

