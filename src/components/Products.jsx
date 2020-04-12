import React from 'react';

import Product from './Product';

const Products = (props) => {
    console.log('Products props: ', props);

    if (props.baseUnitOptions.length === 0) {
        return (<React.Fragment />);
    }

    const familiesToDisplay = [];
    props.products.forEach(family => {
        family.categories.forEach(category => {
            if (category.products.length !== 0) familiesToDisplay.push(family.id);
        });
    });
    const uniqueFamiliesToDisplay = [...new Set(familiesToDisplay)];


    return (
        <section>
            <ul>{props.products.filter(family => uniqueFamiliesToDisplay.includes(family.id)).map((family) => (
                <li className="products-family" key={family.id}>{family.name.toLocaleUpperCase('fr')}
                    <ul>{family.categories.filter(category => category.products.length !== 0).map(category => (
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
                                {category.products.map(product => (
                                    <Product key={product.id} product={product} baseUnitOptions={props.baseUnitOptions} />
                                ))}
                            </ul>
                        </li>
                    ))}
                    </ul>
                </li>
            ))}
            </ul>
        </section>
    );
};

export default Products;
