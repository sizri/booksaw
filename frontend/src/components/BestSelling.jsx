import { useContext, useEffect } from 'react';
import { ProductContext } from '../contexts/ProductContext';

const BestSelling = () => {
	const { products, serverBaseUrl } = useContext(ProductContext);

	useEffect(() => {
		console.log("products:", products);
	});

	const product = products[0]; // 첫 번째 product만 가져옴

	return (
		<section id="best-selling" className="leaf-pattern-overlay">
			<div className="corner-pattern-overlay"></div>
			<div className="container">
				<div className="row justify-content-center">
					{product && (
						<div className="col-md-8">
							<div className="row">
								<div className="col-md-6">
									<figure className="products-thumb">
										<img src={serverBaseUrl + product.imageUrl} alt="book" className="single-image" />
									</figure>
								</div>
								<div className="col-md-6">
									<div className="product-entry">
										<h2 className="section-title divider">{product.title}</h2>
										<div className="products-content">
											<div className="author-name"><p>{product.author}</p></div>
											{/* <h3 className="item-title">Birds gonna be happy</h3> */}
											<p>{product.description}</p>
											<div className="item-price">{product.price}</div>
											<div className="btn-wrap">
												<a href="/books" className="btn-accent-arrow">shop it now <i className="icon icon-ns-arrow-right"></i></a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</section>
	);
};

export default BestSelling;
