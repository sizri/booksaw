// SliderComponent.jsx
import { useContext} from 'react';
import Slider from 'react-slick';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './SliderComponent.css'; // 커스텀 CSS
import { ProductContext } from '../contexts/ProductContext';



function CustomArrow(props) {
  const { className, style, onClick, direction } = props;
  return (
    <button
      className={` ${direction} slick-arrow`}
      style={{ ...style, display: 'block',
        right: direction === 'next' ? '-200px' : 'auto',
        left: direction === 'prev' ? '-225px' : 'auto',
        background: '##8C8C8C',
        width:'50px',
        height:'50px'

       }}
      onClick={onClick}
    >
      <i className={`icon icon-arrow-${direction==='prev'?'left':'right'}`}></i>
     
    </button>
  );
}
const SliderComponent = () => {
  const {products,serverBaseUrl} = useContext(ProductContext)

 

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true, // 자동 재생 활성화
  autoplaySpeed: 5000, 
    prevArrow: <CustomArrow direction='prev'/>,
    nextArrow: <CustomArrow direction='next'/>,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      }
    ]
  };

  return (
    <section id="billboard">
      <div className="container">
        <div className="row">
          <div className="col-md-12">

          <div className="main-slider-container">
      <Slider {...settings}>
        {/* 첫 번째 슬라이드 */} 
        {products.map((product)=> (
            <div className="slide" key={product.productId}>
            <div className="banner-content">
                    <h2 className="banner-title">{product.title}</h2>
                    <p>{product.description}</p>
                    <div className="btn-wrap">
                      <a href="#" className="btn btn-outline-accent btn-accent-arrow">Read More<i
                          className="icon icon-ns-arrow-right"></i></a>
                    </div>
                  </div>
                  
                  <div className="slide-image">
                
                  <img src={serverBaseUrl+product.imageUrl} alt="banner" className="banner-image"/>
                  </div>
                  
            </div>
    

        )

        )}
        

   
      </Slider>
    </div>

          </div>
        </div>
      </div>
    </section>
  );
};


export default SliderComponent;
