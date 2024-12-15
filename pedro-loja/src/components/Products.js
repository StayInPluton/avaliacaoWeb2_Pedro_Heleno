import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    setLoading(true);
    setError(null);

    axios({
      method: 'GET',
      url: 'https://fakestoreapi.com/products',
    })
      .then(response => {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch(error => {
        setError('Ocorreu um erro ao carregar os produtos. Tente novamente mais tarde.');
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });

    axios({
      method: 'GET',
      url: 'https://fakestoreapi.com/products/categories',
    })
      .then(response => {
        setCategories(response.data);
        console.log(response.data);
      })
      .catch(error => {
        setError('Ocorreu um erro ao carregar os produtos. Tente novamente mais tarde.');
        console.log(error);
      });
  }, []);

  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

  return (
    <div className='mt-3'>
      <div className="container">
        <div className="row">
          <div className=''>
              <h5>Filtrar Produtos</h5>

              <select
                className="form-select"
                onChange={e => setSelectedCategory(e.target.value)}
                value={selectedCategory}
              >
                <option value="">Todas as Categorias</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
          </div>

          {/* TODO resolver parte do 'cerregando' */}
          <div className="container text-center mt-5 mb-5">
            {loading && <h2>Carregando...</h2>}
            {error && <h2 className="text-danger">{error}</h2>}
          </div>


          
          {filteredProducts.map(product => (
            <div className="col-sm-4 d-flex justify-content-center mb-4" key={product.id}>

              <div className="card" style={{ width: '18rem' }}>
                <div className="card-header">{product.title}</div>
                <img
                  src={product.image}
                  className="img-thumbnail"
                  alt="Clique aqui"
                  style={{ height: '200px', objectFit: 'contain', width: '100%' }}
                />
                <div className="card-body">
                  <h5 className="card-text">{`Preço: $ ${product.price}`}</h5>
                  <h6 className="card-text">{product.category}</h6>
                </div>
                <div className="card-body">
                  <a href="#" className="card-link">
                    <button type="button" className="btn btn-danger">
                      Comprar
                    </button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
