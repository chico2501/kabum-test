import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MdAddShoppingCart, MdSearch } from 'react-icons/md';
import { formatPrice } from '../../util/format';
import api from '../../services/api';

import * as CartActions from '../../store/modules/cart/actions';

import { ProductList, SearchBar } from './styles';

const Home = ({ amount, addToCart }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchStatus, setSearchStatus] = useState(false);

  function getProducts() {
    api
      .get('products')
      .then(function(response) {
        if (response.status === 204 || response.status === 404) {
          return false;
        }
        return response.data;
      })
      .then(response => {
        const data = response.map(product => ({
          ...product,
          priceFormatted: formatPrice(product.price),
        }));

        setProducts(data);
      });
  }

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    const results = products.filter(
      product =>
        product.id === searchTerm ||
        product.title.toLowerCase().includes(searchTerm)
    );

    if (results.length > 0) {
      setSearchStatus(false);
    } else {
      setSearchStatus(true);
    }
    setSearchResults(results);
  }, [products, searchTerm]);

  const handleAddProduct = product => {
    addToCart(product);
  };

  const searchProduct = e => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <SearchBar>
        <div>
          <MdSearch size={30} color="#333" />
          <input
            type="text"
            placeholder="Pesquise o produto desejado"
            name="search"
            value={searchTerm}
            onChange={searchProduct}
          />
        </div>
        {searchStatus && (
          <div className="notfound">Nenhum produto encontrado.</div>
        )}
      </SearchBar>

      <ProductList>
        {searchResults.map(product => (
          <li key={product.id}>
            <Link to={`/produto/${product.id}`}>
              <img src={product.image} alt={product.title} />
              <strong>{product.title}</strong>
              <span>{product.priceFormatted}</span>
            </Link>

            <button type="button" onClick={() => handleAddProduct(product)}>
              <div>
                <MdAddShoppingCart size={16} color="#FFF" />{' '}
                {amount[product.id] || 0}
              </div>
              <span>ADICIONAR AO CARRINHO</span>
            </button>
          </li>
        ))}
      </ProductList>
    </>
  );
};

const mapStateToProps = state => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;

    return amount;
  }, {}),
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

Home.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  amount: PropTypes.object.isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
