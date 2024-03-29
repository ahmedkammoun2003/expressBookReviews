const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');


public_users.post("/register", (req,res) => {
  //Write your code here
  const username=req.body.username;
  const password=req.body.password;
  if (username && password) {
    if (users.indexOf({'username':username,'password':password})==-1) {
        users.push({'username':username,'password':password});
        return res.status(200).json({message:"user successfully registered,you can login"});
    } else {
        return res.status(404).json({message:"user already registered"});
    }
  }
   return res.status(404).json({message:"Unable to register"});
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books,null,4));
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn=req.params.isbn;
  res.send(books[isbn]);
  return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author=req.params.author;
  let arr1=new Array();
  let arr=Object.keys(books);
  arr.forEach(e => {
    if (books[e]['author']==author) {
        arr1.push(books[e]);
    }
    res.send(arr1);
  });
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title=req.params.title;
  let arr1=new Array();
  let arr=Object.keys(books);
  arr.forEach(e => {
    if (books[e]['title']==title) {
        arr1.push(books[e]);
    }
    res.send(arr1);
  });
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn=req.body.isbn;
  res.send(books[isbn]['review']);
  return res.status(300).json({message: "Yet to be implemented"});
});
function fetchBooksWithCallback(callback) {
    axios.get('https://ahmedkamoun-5000.theiadockernext-1-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/')
        .then(response => {
            callback(null, response.data);
        })
        .catch(error => {
            callback(error, null);
        });
}

// Creating a promise from the fetchDataWithCallback function
function fetchDataPromise() {
    return new Promise((resolve, reject) => {
        fetchBooksWithCallback((error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    });
}
function fetchBooksWithCallbackisbn(callback,isbn) {
    axios.get('https://ahmedkamoun-5000.theiadockernext-1-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/isbn/'+isbn)
        .then(response => {
            callback(null, response.data);
        })
        .catch(error => {
            callback(error, null);
        });
}


function fetchDataPromiseisbn(isbn) {
    return new Promise((resolve, reject) => {
        fetchBooksWithCallbackisbn((error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        },isbn);
    });
}
function fetchBooksWithCallbackauthor(callback,author) {
    axios.get('https://ahmedkamoun-5000.theiadockernext-1-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/author/'+author)
        .then(response => {
            callback(null, response.data);
        })
        .catch(error => {
            callback(error, null);
        });
}


function fetchDataPromiseauthor(author) {
    return new Promise((resolve, reject) => {
        fetchBooksWithCallbackisbn((error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        },author);
    });
}
function fetchBooksWithCallbacktitle(callback,title) {
    axios.get('https://ahmedkamoun-5000.theiadockernext-1-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/title/'+title)
        .then(response => {
            callback(null, response.data);
        })
        .catch(error => {
            callback(error, null);
        });
}


function fetchDataPromisetitle(title) {
    return new Promise((resolve, reject) => {
        fetchBooksWithCallbackisbn((error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        },title);
    });
}
module.exports.general = public_users;
