import  express  from "express";
import { Book } from "../model/bookModel.js";
const router=express.Router()
router.post('/books', async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({
                message: "Send all required fields : title, author, publishYear",
            })
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        }

        const book = await Book.create(newBook);
        return res.status(200).send(book)

    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message })
    }
})

router.get('/books', async (req, res) => {
    try {
        const books = await Book.find({})
        return res.status(200).json({
            count: books.length,
            data: books
        })
    } catch (error) {
        console.log(error.message);
    }
})

router.get('/books/:id', async (req, res) => {
    try {
        const { id } = req.params
        const book = await Book.findById(id)
        return res.status(200).json(book)
    } catch (error) {
        console.log(error.message);
    }
})

router.put('/books/:id', async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({
                message: "Send all required fields : title, author, publishYear",
            })
        }

        const {id}=req.params;
        const updated=await Book.findByIdAndUpdate(id,req.body);

        if(!updated){
            return res.status(404).json({ message:"Book Not Found" })
        }
        return res.status(200).send({message:`Book updated Successfully `})
    } catch (error) {
        console.log(error.message);
    }
})

router.delete('/books/:id', async (req,res)=>{
    try {
        const {id} = req.params;
        const deletedBook=await Book.findByIdAndDelete(id);
        if(!deletedBook){
            return res.status(404).json({message:"Book not found "})
        }
        return res.status(200).send({message:`Book Deleted successfully `})
    } catch (error) {
        console.log(error);
    }
})

export default router