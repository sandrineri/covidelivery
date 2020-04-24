import React from 'react';

import Product from './Product';

const Products = (props) => {
    //console.log('Products props: ', props);

    if (props.baseUnitOptions.length === 0) {
        return (<React.Fragment></React.Fragment>);
    }

    return (
        <section>
            <ul>
                {props.products.map((family) => {
                    if (family.categories.length !== 0) {

                        return (
                            <li className="products-family" key={family.id}>{family.name.toLocaleUpperCase('fr')}
                                <ul> {family.categories.map(category => {
                                    if (category.products.length !== 0) {
                                        return (
                                            <li className="products-category" key={category.id}>{category.name}

                                                <ul className="products">
                                                    <li className="prod-info-labels">
                                                        <span className="prod-info prod-info-label-product">Produit</span>
                                                        <span className="prod-info">Provenance</span>
                                                        <span className="prod-info prod-info-label-price">Prix</span>
                                                        <span className="prod-info prod-info-label-unit">Unité</span>
                                                        <span className="prod-info">Promo</span>
                                                        <span className="prod-info prod-info-label-quantity">Quantité</span>
                                                    </li>
                                                    {category.products.map(product => {
                                                        return (
                                                            <Product key={product.id} order={props.order} setOrder={props.setOrder} product={product} baseUnitOptions={props.baseUnitOptions} />
                                                        )
                                                    })}
                                                </ul>
                                            </li>
                                        )
                                    }
                                })} </ul>
                            </li>
                        )
                    }
                })}
            </ul>
        </section>
    )
}

export default Products;