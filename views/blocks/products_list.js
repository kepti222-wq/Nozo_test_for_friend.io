const React = require('react');

const products = [
        { 
        id: 1,
        name: 'чьйорт фембой kav1nsky4 ленивая жопа где стримы',
        link: '/',
        sale_Price:'1796',
        price:'4 376',
        article: '18462058',
        logo: '/img/product_logo/kvn.jpg',
        

        },

        { 
        id: 2 , 
        name: 'фурри друг kkll46 на час ',
        sale_Price:'819',
        price:'1 140',
        link: '/',
        article: '15046820',
        logo: '/img/product_logo/kkll.jpg',
        
        },

        { 
        id: 3 ,
        name: 'робот пылесос zhucnannn с функцией просмотра оняме',
        sale_Price:'1 113',
        price:'6 453',
        link: '/',
        article: '25035749',
        logo: '/img/product_logo/zhuchann.png',

        },

        { 
        id: 4 , 
        name: 'макс флеме.',
        link: '/',
        sale_Price:'2 987',
        price:'1 378',
        article: '37102946',
        logo: '/img/product_logo/maksfleme.png',

        },

        { 
        id: 5 ,
        name: 'игрушка р1 из KOLABA PREVISHE SVO,27cm ',
        link: '/',
        sale_Price:'6 987',
        price:'7 376',
        article: '48273651',
        logo: '/img/product_logo/araka.png',
        },

        { 
        id: 6 ,
        name: 'zhucnannnnn',
        link: '/',
        sale_Price:'1 987',
        price:'2 376',
        article: '59384726',
        logo: '/img/product_logo/placeholder.png',
        },

        { 
        id: 7 ,
        name: 'zhucnannnnnnnnnnnnn',
        link: '/',
        sale_Price:'1 9827',
        price:'2 3276',
        article: '60493827',
        logo: '/img/product_logo/placeholder.png',
        }
    ];
// мяу когда нить я буду крутым програмисмистиком но пока что я просто копирую сраный код с дипсика XDDD
 class Products extends React.Component {
  render() {

    const list = this.props.products || products;

    return React.createElement(
      'div',
      { className: 'products-grid' },
      list.map((el) =>  
        React.createElement(
          'a',
          {
            key: el.id,
            href: `/product/${el.article}`,
            className: 'product-card-link'
          },
          React.createElement(
            'div',
            { className: 'product-card' },
            React.createElement('img', { src: el.logo, alt: el.name, className: 'product-image' }),
            React.createElement('h3', { className: 'product-name' }, el.name),
            React.createElement(
              'div',
              { className: 'product-prices' },
              el.sale_Price && parseInt(el.sale_Price.replace(/\s/g, '')) < parseInt(el.price.replace(/\s/g, ''))
                ? React.createElement(
                    'div',
                    { className: 'prices-with-discount' },
                    React.createElement('span', { className: 'sale-price', key: 'sale' }, `${el.sale_Price} ₽`),
                    React.createElement('span', { className: 'old-price', key: 'old' }, `${el.price} ₽`)
                  )
                : React.createElement('span', { className: 'regular-price', key: 'regular' }, `${el.price} ₽`)
            )
          )
        )
      )
    );
  }
}

module.exports = { Products, products }; 