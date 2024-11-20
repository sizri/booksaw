import {

  IconButton,
  Pagination,

} from '@mui/material';
import { ProductContext } from '../contexts/ProductContext';
import { useContext } from 'react';


import DeleteIcon from '@mui/icons-material/Delete';
import { AuthContext } from '../contexts/AuthContext';


import { useState } from 'react';
const BooksList = ({ addShopData }) => {

  const { products, serverBaseUrl,  deleteProduct } = useContext(ProductContext)
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(30);
  const { Role } = useContext(AuthContext)

  const handleChange = (event, value) => {
    setPage(value);
    // window.scrollTo({ top: 0, behavior: 'smooth' });
  };



  const startIndex = (page - 1) * itemsPerPage;
  const selectedData = products.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <>
      <section id="popular-books" className="bookshelf pt-5 mt-5">
        <div className="section-header align-center">
          <div className="title">
            <span>Some quality items</span>
          </div>
          <h2 className="section-title">Books</h2>
        </div>


        <div className="container">
          <div className="col-md-14">
            <div className="tab-content">


              <div className="row">
                {
                  selectedData.map((product) => (
                    <div key={product.productId} className="col-md-2">
                      <div className="product-item">
                        <figure className="product-style">
                          <img src={serverBaseUrl + product.imageUrl} alt={product.title} className="product-item" />
                          <button type="button" className="add-to-cart"
                            onClick={() => addShopData(product)}
                          >Add to Cart</button>
                        </figure>
                        <figcaption>
                          <h3>{product.title}</h3>
                          <span>{product.author}</span>
                          <div className="item-price">{product.price}</div>
                         {Role==='ROLE_ADMIN' ?    <IconButton aria-label="delete" size="small" onClick={() => deleteProduct(product.productId)}>
                            <DeleteIcon fontSize="inherit" />
                          </IconButton> :''}
                        </figcaption>
                      </div>
                    </div>
                  ))

                }
              </div>




            </div>
          </div>
        </div>
      </section>

      <Pagination
        count={totalPages}
        page={page}
        onChange={handleChange}
        color="primary"
        style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}
      />


    </>
  )
}

export default BooksList