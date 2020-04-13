import React from 'react';

import Product from './Product';

const Products = (props) => {
    console.log('Products props: ', props);

    //const category = props.productsList.map(category => category.categories);
    //console.log('category niv 1: ', category);

    // let productsArray = [];
    // for (let i = 0; i < category.length; i++) {
    //     const category2 = category[i];
    //     //console.log('category niv 2: ', category2);

    //     for (let productsArrays = 0; productsArrays < category2.length; productsArrays++) {
    //         productsArray = category2[productsArrays].products;
    //         //console.log('productsArray ', productsArray);
    //     }
    // };


    if (props.message !== "") {
        return (
            <article></article>
        )
    }

    // if (productsArray.length === 0) {
    //     return (
    //         <article>
    //             <p>Aucun produit n'est en vente en ce moment.</p>
    //         </article>
    //     );
    // }

    return (
        <article>
            <ul>
                {props.productsList.map((family) => {
                    return (
                        <li className="products-family" key={family.id}>{family.name}
                            <ul> {family.categories.map(category => {
                                return (
                                    <li className="category" key={category.id}>{category.name}
                                        <ul>
                                            <li className="product-info-labels">
                                                <span className="product-info product-info-label product-info-label-product">Produit</span>
                                                <span className="product-info product-info-label">Provenance</span>
                                                <span className="product-info product-info-label">Prix</span>
                                                <span className="product-info product-info-label">Unité</span>
                                                <span className="product-info product-info-label">Promo</span>
                                                <span className="product-info product-info-label product-info-label-quantity">Quantité</span>
                                            </li>
                                            {category.products.map(product => {
                                                return (
                                                    <Product key={product.id} product={product} />
                                                )
                                            })}
                                        </ul>
                                    </li>
                                )
                            })} </ul>
                        </li>
                    )
                })}
            </ul>
        </article>
    )
}

export default Products;