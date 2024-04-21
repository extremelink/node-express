require('dotenv').config()
const express = require('express')
const {validateBookRequest,validateBookId} = require('./utility/validation')
const app = express();

const bookBaseUrl='/api/v1/books'

app.use(express.json());


let books=[];

app.get('/',(req,res)=>{
    res.send('hello world!');
})

// CREATE
app.post(bookBaseUrl,(req,res)=>{
console.log(bookBaseUrl+"-post");
const {name,author} = req.body;
const responseStatus = validateBookRequest(req,res)
if(responseStatus.status==400){
    res.status(400).send(responseStatus.message)
    return;
}
// save data
const book ={name,author}
console.log(book)
books.push(book);

// send response  
res.status(201).send(book);
})

// READ
app.get(bookBaseUrl,(req,res)=>{
    console.log(bookBaseUrl+"-get");
    res.status(200).send(books);
})

// UPDATE

app.put(bookBaseUrl+'/:id',(req,res)=>{
    console.log(bookBaseUrl+"-update");
    // validateBookId(req,res,books)
    // const {name,author}=req.body;
    // validateBookRequest(req,res)
    const responseStatus = validateBookId(req,res,books);
    if(responseStatus.status==400){
        res.status(400).send({Error:responseStatus.message});
        return;
    }
    const {name,author}=req.body;
    const responseStatus2 = validateBookRequest(req,res);
    if(responseStatus.status==400){
        res.status(400).send({Error:responseStatus.message});
        return;
    }
    const id = req.params.id;
    const updatedBook = {name,author};
    books[id] = updatedBook;
    res.status(200).send(updatedBook);
})

// DELETE

app.delete(bookBaseUrl+'/:id',(req,res)=>{
    console.log(bookBaseUrl+"-delete");
    const responseStatus=validateBookId(req,res,books);
    if(responseStatus.status==400){
        res.status(400).send({Error:responseStatus.message});
        return;
    }
    const id = req.params.id;
    const book=books[id];
    console.log(book);
    books.splice(id,1)
    res.status(200).send(book);
})


// app.listen(port,()=>{
//     console.log("app listening on port 3000");
// })
app.listen(process.env.SERVER_PORT,()=>{
    console.log(`Application started at port ${process.env.SERVER_PORT}`);
})