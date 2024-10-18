const express = require("express");
const Joi = require("joi"); 
const debug = require("debug")("http");

const router = express.Router();


// data
const books = [
    { id: 1, name: "The Great Gatsby", author: "F. Scott Fitzgerald", rating: 4.50 },
    { id: 2, name: "To Kill a Mockingbird", author: "Harper Lee", rating: 4.82 },
    { id: 3, name: "1984", author: "George Orwell", rating: 4.32 },
    { id: 4, name: "Pride and Prejudice", author: "Jane Austen", rating: 4.72 },
    { id: 5, name: "The Catcher in the Rye", author: "J.D. Salinger", rating: 4.21 },
    { id: 6, name: "The Hobbit", author: "J.R.R. Tolkien", rating: 4.59 },
    { id: 7, name: "Brave New World", author: "Aldous Huxley", rating: 4.41 },
    { id: 8, name: "Moby-Dick", author: "Herman Melville", rating: 4.05 },
    { id: 9, name: "War and Peace", author: "Leo Tolstoy", rating: 4.93 },
    { id: 10, name: "The Odyssey", author: "Homer", rating: 4.12 }
];


// joi schemas for data validations

// put data validation
const put_schema = Joi.object({
    name : Joi.string().min(3).max(30).required(),
    author : Joi.string().min(3).max(30),
    rating : Joi.number().precision(2).min(0).max(5)
}).and("name", "author", "rating");

// post data validation
const post_schema = put_schema;

// patch data validation
const patch_schema = Joi.object({
    name : Joi.string().min(3).max(30),
    author : Joi.string().min(3).max(30),
    rating : Joi.number().precision(2).min(0).max(5)
}).or("name", "author", "rating");


  
// routes

router.get("/", (req, res)=>{
    res.send(books);
    /*
        

    */
});

router.post("/", (req, res)=>{
    const {error, value } = post_schema.validate(req.body);
    if(error)
        return res.status(400).send("invalid book data");
    const book = Object.assign({id : books.length + 1}, value);
    books.push(book);
    res.send(book);
});

router.get("/:id", (req, res)=>{
    // checking for 404
    let book_index = get_book_index(parseInt(req.params.id));
    if(book_index === -1)return res.status(404).send("book not found!");

    res.send(books[book_index]);
});

router.put("/:id", (req, res)=>{
    // checking for 404
    let book_index = get_book_index(parseInt(req.params.id));
    if(book_index === -1)return res.status(404).send("book not found!");
    
    const {error, value} = put_schema.validate(req.body);
    if(error)
        return res.status(400).send("invalid book data");

    const book = {...value};
    books.push(book);
    res.send(book);
});

router.patch("/:id", (req, res)=>{
    // checking for 404
    let book_index = get_book_index(parseInt(req.params.id));
    if(book_index === -1)return res.status(404).send("book not found!");

    const {error, value} = patch_schema.validate(req.body);
    if(error)
        return res.status(400).send("invalid book data");

    const book = {...books[book_index], ...value};
    books[book_index] = book;
    res.send(book);

});

router.delete("/:id", (req, res)=>{
    // checking for 404
    let book_index = get_book_index(parseInt(req.params.id));
    if(book_index === -1)return res.status(404).send("book not found!");

    const book = books[book_index];
    books.splice(book_index, 1);
    res.send(book);
});


// route parameter req.params.id
// query string parameters req.query.sortBy



// function to check for 404
function get_book_index(id){
    return books.findIndex(b => b.id === id);
}



// exporting router.
module.exports = router;