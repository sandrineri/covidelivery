import React from 'react';

import Product from './Product';

const Products = (props) => {
    console.log('Products props: ', props);

    if (props.message !== "") {
        return (
            <article></article>
        )
    }

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