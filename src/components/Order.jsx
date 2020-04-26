import React from 'react';


const Order = (props) => {
    //console.log('Order props: ', props);

    const closeOrder = () => {
        props.setOrderDisplay('display-none');
        props.setOrdersDisplay('display-flex');
    }

    return (
        <React.Fragment>
            <div className="buttons-container">
                <div className="print-btn">
                    <button>
                        Imprimer la commande
                            <span className="btn-icon">
                            <i className="fas fa-print"></i>
                        </span>
                    </button>
                </div>

                <div className="back-btn">
                    <button onClick={closeOrder}>
                        Retourner à la liste
                            <span className="btn-icon">
                            <i className="fas fa-undo-alt"></i>
                        </span>
                    </button>
                </div>
            </div>

            <h2>Commande</h2>
            <section className="delivery-infos-container">
                <h3>Informations de livraison <span className="deliver-title-sub">(pas de frais de livraison - pas de montant minimum)</span></h3>
                <div className="delivery-infos">
                    <p className="deliv-label dl1">Nom&nbsp;:
                            <span className="deliv-info deliv-name">{props.currentOrder.userName}</span>
                    </p>
                    <p className="deliv-label dl2">Commande n°&nbsp;:
                            <span className="deliv-info">{props.currentOrder.id}</span>
                    </p>
                    <p className="deliv-label dl3">Téléphone&nbsp;:
                            <span className="deliv-info deliv-phone">{props.currentOrder.userPhone}</span>
                    </p>
                    <p className="deliv-label dl4">E-mail&nbsp;:
                            <span className="deliv-info">{props.currentOrder.userEmail}</span>
                    </p>
                    <p className="deliv-label dl5">Adresse&nbsp;:
                            <span className="deliv-info deliv-adress">{props.currentOrder.userAddress}</span>
                    </p>
                    <p className="deliv-label dl6">Date de la commande&nbsp;:
                            <span className="deliv-info">{props.currentOrderDate}</span>
                    </p>
                    <p className="deliv-label dl7">Complément d'info&nbsp;:
                            <span className="deliv-info">{props.currentOrder.userExtra}</span>
                    </p>
                    {/* <p className="deliv-label dl8">Réglement par&nbsp;:
                            <span className="deliv-info"></span>
                        </p> */}
                </div>
            </section>

            <section className="delivery-order">
                <ul>
                    <li className="prod-info-labels order-deliv-labels">
                        <span className="order-info order-name-label">Produit</span>
                        <span className="order-info order-cat-label">Catégorie</span>
                        <span className="order-info order-origin-label">Provenance</span>
                        <span className="order-info order-price-label">Prix à l'unité</span>
                        <span className="order-info order-quantity-label">Commande</span>
                    </li>
                    {props.orderDetails.map(product => {
                        return (
                            <li className="order-prod" key={product.id}>
                                <span className="order-info order-name">{product.name}</span>
                                <span className="order-info order-cat">{product.categoryName.toLowerCase()}</span>
                                <span className="order-info order-origin">{product.origin}</span>
                                <span className="order-info order-price">{product.price.replace('.', ',')} € / {product.baseUnitName}</span>
                                <span className="order-info order-quantity">{product.amount} {product.selectedUnitName}(s)</span>
                            </li>
                        )
                    })}
                </ul>
            </section>
        </React.Fragment>
    )
}

export default Order;