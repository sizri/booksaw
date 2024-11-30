// src/components/Tabs/Tabs.js
import React, { useState, useContext} from 'react';
import { ProductContext } from '../contexts/ProductContext';

const Popularbooks = ({ addShopData }) => {
  const [activeTab, setActiveTab] = useState('모두');
  const { products, serverBaseUrl } = useContext(ProductContext);


  const tabs = [
    { id: '모두', label: '전체' },
    { id: '비즈니스', label: '비즈니스' },
    { id: '기술', label: '기술' },
    { id: '로맨스', label: '로맨스' },
    { id: '모험', label: '모험' },
  ];


  return (
    <section id="popular-books" className="bookshelf py-5 my-5">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="section-header align-center">
              <div className="title">
                <span>Some quality items</span>
              </div>
              <h2 className="section-title">Popular Books</h2>
            </div>
            <ul className="tabs">
              {tabs.map(tab => (
                <li
                  key={tab.id}
                  data-tab-target={`#${tab.id}`}
                  className={`tab ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </li>
              ))}
            </ul>
            <div className="tab-content">
              {tabs.map(tab => (
                <div
                  key={tab.id}
                  id={tab.id}
                  className={`tab-pane ${activeTab === tab.id ? 'active' : ''}`}
                  data-tab-content
                > 
                  <div className="row">
                    {products !== null ? (
                      (() => {
                        const productsToShow = tab.id === '모두' ? products : products.filter(product => product.genre === tab.id);
                        return productsToShow.length > 0 ? (
                          productsToShow.map(product => (
                            <div key={product.productId} className="col-md-3">
                              <div className="product-item">
                                <figure className="product-style">
                                  <img src={serverBaseUrl + product.imageUrl} alt={product.title} className="product-item" />
                                  <button type="button" className="add-to-cart" onClick={() => addShopData(product)}>Add to Cart</button>
                                </figure>
                                <figcaption>
                                  <h3>{product.title}</h3>
                                  <span>{product.author}</span>
                                  <div className="item-price">{product.price}\</div>
                                </figcaption>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className='container'>
                          <h3 className="item-title text-center p-5">이 카테고리에 해당하는 책이 없습니다</h3>
                          </div>
                        );
                      })()
                    ) : (
                      <h1>책이 없습니다.</h1>
                    )}




                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="btn-wrap align-center">
              <a href="/books" className="btn btn-outline-accent btn-accent-arrow" tabIndex="0">View all products <i className="icon icon-ns-arrow-right"></i></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Popularbooks;
