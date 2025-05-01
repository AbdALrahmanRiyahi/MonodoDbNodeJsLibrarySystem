const express = require("express")

const router = express.Router()

const Book = require("../models/Book")



// add a new book 

router.post('/',async (req,res)=>{
    try {
        const book = new Book(req.body)

        await book.save()

        res.status(201).send(book)
    } catch (error) {

        res.status(400).send(error)
        
    }


})



// get all books 

router.get("/", async (req,res)=>{

    const books = await Book.find()

    res.send(books)
})


// get book by id 

router.get("/:id",async(req,res)=>{
    const book = await Book.findOne({bookId:req.params.id})
    if(!book) return res.status(400).send("book not found ")

        res.send(book)
})


// update book information 

router.put("/:id",async (req,res)=>{
    const book = await Book.findOneAndUpdate({bookId:req.params.id},req.body)
    if(!book) return res.status(400).send("book not found ")
        res.send(book)


})

// delete book 

router.delete("/:id", async (req,res)=>{
    const results = await Book.deleteOne({bookId:req.params.id})

    if(results.deletedCount===0) return res.status(404).send("book not found")

        res.send({message:"book has been deleted"})

})

module.exports=router; 