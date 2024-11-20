// src/components/SpecialOffer/SpecialOffer.jsx
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; // 필수 CSS 임포트
import './SpecialOffer.css'; // 기존 프로젝트의 CSS 파일 사용
import  {useContext} from 'react'
import { ProductContext } from '../contexts/ProductContext';

const SpecialOffer = ({addShopData}) => {
  const {products,serverBaseUrl} = useContext(ProductContext)
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // 적절한 슬라이드 수 설정
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 300000,
    arrows: false, // 화살표 네비게이션 제거
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 999,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 660,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }

    ]
  };

  return (
    <section id="special-offer" className="bookshelf pb-5 mb-5">
      <div className="section-header align-center">
        <div className="title">
          <span>Grab your opportunity</span>
        </div>
        <h2 className="section-title">Books with offer</h2>
      </div>

      <div className="container">
        <div className="row">
          <div className="inner-content">
            <div className="product-list" data-aos="fade-up">
              <Slider {...settings} className="product-grid">

                {products.map(product => (
                  <div className="product-item" key={product.productId}>
                    <figure className="product-style">
                      <img src={serverBaseUrl+product.imageUrl} alt={product.title} className="product-item" />
                      <button type="button" className="add-to-cart" data-product-tile="add-to-cart" onClick={() => addShopData(product)}>
                        Add to Cart
                      </button>
                    </figure>
                    <figcaption>
                      <h3>{product.title}</h3>
                      <span>{product.author}</span>
                      <div className="item-price">
                        {product.prevPrice && <span className="prev-price">{product.prevPrice}</span>}
                        {product.price}
                      </div>
                    </figcaption>
                  </div>
                ))}

              </Slider>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffer
