import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

import Product from './Product';

const Products = (props) => {
    console.log('Products props: ', props);

    
    if (props.baseUnitOptions.length === 0) {
        return (<React.Fragment></React.Fragment>);
    }

    if (props.lastModified === "") {
        return (
            <article className="stalls"></article>
        )
    }

    const lastModifiedDate = new Date(props.lastModified);
    const datePattern = 'eeee d MMMM yyyy';

    const formatLastModif = format(lastModifiedDate, datePattern, { locale: fr });
    const deliveryDate = format(lastModifiedDate.setDate(lastModifiedDate.getDate() + 1), datePattern, { locale: fr });
    //console.log(deliveryDate);

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
                                                        <Product key={product.id} product={product} baseUnitOptions={props.baseUnitOptions}/>
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
                <button type="submit"><i className="fas fa-shopping-basket"></i></button>
            </section>
        </article>
    )
}

export default Products;