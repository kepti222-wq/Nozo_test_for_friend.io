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
   
});

app.get ('/cart', (req, res) => {
    res.render('cart')
});

app.get ('/user', (req, res) => {
    res.render('user')
});

app.get('/favorites', (req, res) => {
    res.render('favorites', { 
        pageTitle: 'Избранное - NOZO',
        products: products 
    });
});


app.get ('/orderlist', (req, res) => {
    res.render('orderlist')
});

app.get('/chuvak', (req, res) => {
    res.render('chuvak');
});

app.get ('/error', (req, res) => {
    res.render('error')
});

app.get ('/error_buy', (req, res) => {
    res.render('error_buy')
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/search', (req, res) => {
    const querty = (req.query.q || '').toLowerCase().trim();
    let searchResults = [];

    if (querty) {
        searchResults = products.filter(product =>
            product.name.toLowerCase().includes(querty) 
        );
    }

    res.render('search', {
        pageTitle: 'Поиск на Nozo',
        query: req.query.q || '',
        searchResults: searchResults,
    });
});


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


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`server started: http://localhost:${PORT}`)
})