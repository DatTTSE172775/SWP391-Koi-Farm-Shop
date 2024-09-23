import React from 'react';
import './ProductList.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductList = () => {
    const products = [
        { id: 1, name: 'Koi Fish 1', price: '$50', desc:'Koi description',image: 'https://plus.unsplash.com/premium_photo-1723672584731-52b5f1a67543?q=80&w=1998&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { id: 2, name: 'Koi Fish 2', price: '$60', desc:'Koi description',image: 'https://plus.unsplash.com/premium_photo-1723672584731-52b5f1a67543?q=80&w=1998&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { id: 3, name: 'Koi Fish 3', price: '$70', desc:'Koi description',image: 'https://plus.unsplash.com/premium_photo-1723672584731-52b5f1a67543?q=80&w=1998&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { id: 4, name: 'Koi Fish 4', price: '$30', desc:'Koi description',image: 'https://plus.unsplash.com/premium_photo-1723672584731-52b5f1a67543?q=80&w=1998&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { id: 5, name: 'Koi Fish 5', price: '$20', desc:'Koi description',image: 'https://plus.unsplash.com/premium_photo-1723672584731-52b5f1a67543?q=80&w=1998&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { id: 6, name: 'Koi Fish 6', price: '$80', desc:'Koi description',image: 'https://plus.unsplash.com/premium_photo-1723672584731-52b5f1a67543?q=80&w=1998&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    ];

    return (
        <div className='container'>
        <div className="product-list row">
            {products.map(product => (
                <div className="product-item col-md-3 col-sm-6" key={product.id}>
                    <img src={product.image} alt={product.name} className="product-image" />
                    <h3 className='product-name'>{product.name}</h3>
                    <p className='product-price'>{product.price}</p>
                    <p className='product-desc'>{product.desc}</p>
                    <button className='btn btn-primary'>Detail</button>
                </div>
            ))}
        </div>
        </div>
    );
};

export default ProductList;