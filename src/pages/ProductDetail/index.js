import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MdAddShoppingCart } from 'react-icons/md';
import { formatPrice } from '../../util/format';
import api from '../../services/api';

import * as CartActions from '../../store/modules/cart/actions';

import { Product } from './styles';

const ProductDetail = ({ amount, addToCart, match }) => {
  const [product, setProduct] = useState({});
  const { id } = match.params;

  useEffect(() => {
    function getProduct() {
      api
        .get(`products/${id}`)
        .then(function(response) {
          if (response.status === 204 || response.status === 404) {
            return false;
          }
          return response.data;
        })
        .then(response => {
          setProduct({
            ...response,
            priceFormatted: formatPrice(response.price),
          });
        });
    }
    getProduct();
  }, [id]);

  const handleAddProduct = prod => {
    addToCart(prod);
  };

  return (
    <Product>
      <div className="image">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="infos" key={product.id}>
        <h1>{product.title}</h1>
        <span>{product.priceFormatted}</span>

        <button type="button" onClick={() => handleAddProduct(product)}>
          <div>
            <MdAddShoppingCart size={16} color="#FFF" />{' '}
            {amount[product.id] || 0}
          </div>
          <span>ADICIONAR AO CARRINHO</span>
        </button>
      </div>
      <div className="description">{product.description}</div>
    </Product>
  );
};

const mapStateToProps = state => ({
  cart: state.cart.map(product => ({
    ...product,
    subtotal: formatPrice(product.price * product.amount),
  })),
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;

    return amount;
  }, {}),
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

ProductDetail.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  amount: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  match: PropTypes.object.isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
