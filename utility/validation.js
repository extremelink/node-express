const validateBookRequest = (req,res) =>{
    const {name,author} = req.body;
    if(name==undefined || name.length==0){
        return {"status":400,"message":"Name is empty"}
    }
    if(author == undefined || author.length == 0){
        return {"status":400,"message":"Author is empty"}
    }
    return {"status":200}
}
const validateBookId=(req,res,books)=>{
    const id = req.params.id;
    console.log(id)
    if(id ==undefined || id<0){
        return {"status":400,"message":"Invalid Id"}
    }
    const book = books[id];
    if(book == undefined){
        return {"status":400,"message":"Invalid Book ID"}
    }
    return {"status":200}
}
module.exports = {validateBookRequest,validateBookId}