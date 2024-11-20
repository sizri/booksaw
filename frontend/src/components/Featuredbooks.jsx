import { useContext } from 'react';
import { ProductContext } from '../contexts/ProductContext';

const FeaturedBooks = ({addShopData}) => {
  
 

  const {products,serverBaseUrl} = useContext(ProductContext)


  const clients = [
    '/assets/images/client-image1.png',
    '/assets/images/client-image2.png',
    '/assets/images/client-image3.png',
    '/assets/images/client-image4.png',
    '/assets/images/client-image5.png',
  ];


  return (
    <>
      {/* Client Holder Section */}
      <section id="client-holder" data-aos="fade-up">
        <div className="container">
          <div className="row">
            <div className="inner-content">
              <div className="logo-wrap">
                <div className="grid">
                  {clients.map((clientImage, index) => (
                    <a href="#" key={index}>
                      <img src={clientImage} alt={`client-${index + 1}`} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section id="featured-books" className="py-5 my-5">
        <div className="container">
          {/* Section Header */}
          <div className="row">
            <div className="col-md-12">
              <div className="section-header align-center">
                <div className="title">
                  <span>Some quality items</span>
                </div>
                <h2 className="section-title">Featured Books</h2>
              </div>

              {/* Product List */}
              <div className="product-list" data-aos="fade-up">
                <div className="row">
                  {products.map((product) => (
                    <div className="col-md-3" key={product.productId}>
                      <div className="product-item">
                        <figure className="product-style">
                          <img
                            src={serverBaseUrl+product.imageUrl}
                            alt={product.title}
                            className="product-item"
                          />
                          <button
                            type="button"
                            className="add-to-cart"
                            data-product-tile="add-to-cart"
							onClick={() => addShopData(product)}
                          >
                            Add to Cart
                          </button>
                        </figure>
                        <figcaption>
                          <h3>{product.title}</h3>
                          <span>{product.author}</span>
                          <div className="item-price">{product.price}</div>
                        </figcaption>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* View All Products Button */}
          <div className="row">
            <div className="col-md-12">
              <div className="btn-wrap align-right">
                <a href="/books" className="btn-accent-arrow">
                  View all products{' '}
                  <i className="icon icon-ns-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};



export default FeaturedBooks;
