const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password,users)=>{
    let validUsers=users.filter((user)=>{
        return(user.username===username && user.password===password);
    })
    if (validUsers.length >0) {
        return true;
    } else {
        return false;
    }
    //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const username=req.body.username;
  const password=req.body.password;
  if (!username || !password) {
    return res.status(404).json({message:'error logging in'});
  }
  if (authenticatedUser(username,password,users)) {
    let accessToken=jwt.sign({
        data:password
    },'access',{ expiresIn: 60*60});
    req.session.authorisation={
        accessToken,username
    }
    return res.status(200).send({message:'user successfully logged in'});
  } else {
    return res.status(208).send({message:"Invalid Login, Check username and password"});
  }
  return res.status(300).json({message: "Yet to be implemented"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const isbn=req.params.isbn;
  const reviews=req.body.reviews;
  let arr=Object.values(books[isbn]);
  let arr1=Object.values(arr[2]);
  arr1.push(reviews);
  arr.pop()
  arr.push(JSON.parse(JSON.stringify(arr1)));
  books[isbn]['reviews']=JSON.parse(JSON.stringify(arr1));
  res.send('review added');
  return res.status(300).json({message: "Yet to be implemented"});
});
regd_users.delete("/auth/review/:isbn", (req, res) => {
    //Write your code here
    const isbn=req.params.isbn;
    let arr=Object.values(books[isbn]);
    let arr1=Object.values(arr[2]);
    arr1.pop();
    arr.pop()
    arr.push(JSON.parse(JSON.stringify(arr1)));
    books[isbn]['reviews']=JSON.parse(JSON.stringify(arr1));
    res.send('review deleted');
    return res.status(300).json({message: "Yet to be implemented"});
  });
 
module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;

