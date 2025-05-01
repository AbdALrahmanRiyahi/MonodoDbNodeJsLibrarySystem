const express = require("express")

const router = express.Router()

const Author = require("../models/Author")



// add a new Author 

router.post('/',async (req,res)=>{
    try {
        const author = new Author(req.body)

        await author.save()

        res.status(201).send(author)
    } catch (error) {

        res.status(400).send(error)
        
    }


})



// get all authors 

router.get("/", async (req,res)=>{

    const authors = await Author.find()

    res.send(authors)
})


// get author by id 

router.get("/:id",async(req,res)=>{
    const author = await Author.findOne({authorID:req.params.id})
    if(!author) return res.status(400).send("author not found ")

        res.send(author)
})


// update Author information 

router.put("/:id",async (req,res)=>{
    const author = await Author.findOneAndUpdate({authorID:req.params.id},req.body)
    if(!author) return res.status(400).send("author not found ")
        res.send(author)


})

// delete author 

router.delete("/:id", async (req,res)=>{
    const results = await Author.deleteOne({authorID:req.params.id})

    if(results.deletedCount===0) return res.status(404).send("Author not found")

        res.send({message:"author has been deleted"})

})

module.exports=router; 