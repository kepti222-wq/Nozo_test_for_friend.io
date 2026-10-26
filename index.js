const express = require('express');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { Products, products } = require('./views/blocks/products_list');
const Product_specifications = require('./views/blocks/Product_specifications');

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));

app.get ('/', (req, res) => {
    const productsHtml = ReactDOMServer.renderToString(React.createElement(Products));
    
    res.render('index', {     
        productsHtml: productsHtml,
    
    });
   
})

app.get ('/cart', (req, res) => {
    res.render('cart')
})

app.get ('/orderlist', (req, res) => {
    res.render('orderlist')
})

app.get('/product/:article', (req, res) => {
  const article = req.params.article;
  const product = products.find(p => p.article === article);

  if (!product) {
    return res.redirect('/error');
  }
  
  const adImages = ['Frame1.png', 'Frame2.png', 'Frame3.png'];

  const randomAd = adImages[Math.floor(Math.random() * adImages.length)];

  const productSpecs = Product_specifications[article] || [];

  const recommendations = products.filter(p => p.article !== article);
  const productsHtml = ReactDOMServer.renderToString(
    React.createElement(Products, { products: recommendations })
  );
  
  res.render('product', { 
    product: product,
    pageTitle: product.name,
    randomAd: randomAd, 
    specs: productSpecs,
    productsHtml: productsHtml,
  });
});


app.get ('/error', (req, res) => {
    res.render('error')
})
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`server started: http://localhost:${PORT}`)
})
