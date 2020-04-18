import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

import Product from './Product';

const Products = (props) => {
    console.log('Products props: ', props);

    if (props.lastModified === "") {
        return (
            <article className="stalls"></article>
        )
    }

    const formatLastModif = format(new Date(props.lastModified), 'eeee d MMMM yyyy', {locale: fr});
    const deliveryDate = format(new Date(props.lastModified).setDate(new Date(props.lastModified).getDate()+ 1), 'eeee d MMMM yyyy', {locale: fr});
    console.log(deliveryDate);

    return (
        <article className="stalls">
            <section>
                <p>Mise à jour le&nbsp;
                    <span>
                        {formatLastModif}
                    </span>
                </p>
                <p>Pour une livraison du&nbsp;
                    <span>{deliveryDate}</span>
                </p>
            </section>
            <section>
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
            </section>
        </article>
    )
}

export default Products;