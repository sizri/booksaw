const Footer = () => {
  return (
    <>
      <footer id="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="footer-item">
                <div className="company-brand">
                  <img src="images/main-logo.png" alt="logo" className="footer-logo" />
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sagittis sed ptibus
                    liberolectus nonet psryroin. Amet sed lorem posuere sit iaculis amet, ac urna.
                    Adipiscing fames semper erat ac in suspendisse iaculis.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-2">
              <div className="footer-menu">
                <h5>About Us</h5>
                <ul className="menu-list">
                  <li className="menu-item">
                    <a href="#">vision</a>
                  </li>
                  <li className="menu-item">
                    <a href="#">articles</a>
                  </li>
                  <li className="menu-item">
                    <a href="#">careers</a>
                  </li>
                  <li className="menu-item">
                    <a href="#">service terms</a>
                  </li>
                  <li className="menu-item">
                    <a href="#">donate</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-md-2">
              <div className="footer-menu">
                <h5>Discover</h5>
                <ul className="menu-list">
                  <li className="menu-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="menu-item">
                    <a href="#">Books</a>
                  </li>
                  <li className="menu-item">
                    <a href="#">Authors</a>
                  </li>
                  <li className="menu-item">
                    <a href="#">Subjects</a>
                  </li>
                  <li className="menu-item">
                    <a href="#">Advanced Search</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-md-2">
              <div className="footer-menu">
                <h5>My account</h5>
                <ul className="menu-list">
                  <li className="menu-item">
                    <a href="#">Sign In</a>
                  </li>
                  <li className="menu-item">
                    <a href="#">View Cart</a>
                  </li>
                  <li className="menu-item">
                    <a href="#">My Wishlist</a>
                  </li>
                  <li className="menu-item">
                    <a href="#">Track My Order</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-md-2">
              <div className="footer-menu">
                <h5>Help</h5>
                <ul className="menu-list">
                  <li className="menu-item">
                    <a href="#">Help center</a>
                  </li>
                  <li className="menu-item">
                    <a href="#">Report a problem</a>
                  </li>
                  <li className="menu-item">
                    <a href="#">Suggesting edits</a>
                  </li>
                  <li className="menu-item">
                    <a href="#">Contact us</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <div id="footer-bottom">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="copyright">
                <div className="row">
                  <div className="col-md-6">
                    <p>
                      © 2022 All rights reserved. Free HTML Template by{" "}
                      <a href="https://www.templatesjungle.com/" target="_blank" rel="noopener noreferrer">
                        TemplatesJungle
                      </a>
                    </p>
                  </div>

                  <div className="col-md-6">
                    <div className="social-links align-right">
                      <ul>
                        <li>
                          <a href="#">
                            <i className="icon icon-facebook"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="icon icon-twitter"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="icon icon-youtube-play"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="icon icon-behance-square"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
