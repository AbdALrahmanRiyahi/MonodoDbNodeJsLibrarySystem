const express = require("express")

const router = express.Router()

const Bookshop = require("../models/BookShop")



// add a new bookshop 

router.post('/',async (req,res)=>{
    try {
        const bookshop = new Bookshop(req.body)

        await bookshop.save()

        res.status(201).send(bookshop)
    } catch (error) {

        res.status(400).send(error)
        
    }


})



// get all bookshops 

router.get("/", async (req,res)=>{

    const bookshops = await Bookshop.find()

    res.send(bookshops)
})


// get bookshop by id 

router.get("/:id",async(req,res)=>{
    const bookshop = await Bookshop.findOne({shopId:req.params.id})
    if(!bookshop) return res.status(400).send("bookshop not found ")

        res.send(bookshop)
})


// update bookshop information 

router.put("/:id",async (req,res)=>{
    const bookshop = await Bookshop.findOneAndUpdate({shopId:req.params.id},req.body)
    if(!bookshop) return res.status(400).send("bookshop not found ")
        res.send(bookshop)


})

// delete bookshop 

router.delete("/:id", async (req,res)=>{
    const results = await Bookshop.deleteOne({shopId:req.params.id})

    if(results.deletedCount===0) return res.status(404).send("bookshop not found")

        res.send({message:"bookshop has been deleted"})

})

module.exports=router; 