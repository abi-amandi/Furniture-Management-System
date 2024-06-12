import React from 'react';

const Footer = () => {

    return (
        <footer className="bg-dark text-light text-center text-lg-start">
            {/* Section: Social media */}
            <section className="d-flex justify-content-center p-4" style={{ backgroundColor: "#21D192" }}>
                {/* Left */}
                <div className="me-5">
                    <span className="fw-bold">Get connected with us on social networks:</span>
                </div>
                {/* Left */}

                {/* Right */}
                <div>
                    <a href="/" className="text-white me-4" onClick={(e) => e.preventDefault()}>
                        <i className="fab fa-facebook-f fa-lg"></i>
                    </a>
                    <a href="/" className="text-white me-4" onClick={(e) => e.preventDefault()}>
                        <i className="fab fa-twitter fa-lg"></i>
                    </a>
                    <a href="/" className="text-white me-4" onClick={(e) => e.preventDefault()}>
                        <i className="fab fa-google fa-lg"></i>
                    </a>
                    <a href="/" className="text-white me-4" onClick={(e) => e.preventDefault()}>
                        <i className="fab fa-instagram fa-lg"></i>
                    </a>
                    <a href="/" className="text-white me-4" onClick={(e) => e.preventDefault()}>
                        <i className="fab fa-linkedin fa-lg"></i>
                    </a>
                    <a href="/" className="text-white me-4" onClick={(e) => e.preventDefault()}>
                        <i className="fab fa-github fa-lg"></i>
                    </a>
                </div>
                {/* Right */}
            </section>
            {/* Section: Social media */}

            {/* Section: Links */}
            <section className="p-4" style={{ backgroundColor: "#FFFFFF", color: "#000000" }}>
                <div className="container text-center text-md-start">
                    <div className="row mt-3">
                        <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mb-4 my-4">
                            <h6 className="text-uppercase fw-bold">Isuru Spectro Furniture Store</h6>
                            <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{ width: "60px", backgroundColor: "#7c4dff", height: "2px" }} />
                            <p>
                                We are dedicated to providing high-quality furniture
                                solutions to enhance your living space. Explore our wide range of products, from elegant sofas
                                to functional storage solutions, and create a home that reflects your unique style and comfort.
                                Let us help you transform your house into a warm and inviting home.
                            </p>
                        </div>

                        <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mb-4 my-4">
                            <h6 className="text-uppercase fw-bold">Products</h6>
                            <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{ width: "60px", backgroundColor: "#7c4dff", height: "2px" }} />
                            <p>
                                <a href="#!" className="text-dark me-4" onClick={(e) => e.preventDefault()} style={{ textDecoration: "none" }}>Sofas</a>
                            </p>
                            <p>
                                <a href="#!" className="text-dark me-4" onClick={(e) => e.preventDefault()} style={{ textDecoration: "none" }}>Beds</a>
                            </p>
                            <p>
                                <a href="#!" className="text-dark me-4" onClick={(e) => e.preventDefault()} style={{ textDecoration: "none" }}>Wardrobes</a>
                            </p>
                            <p>
                                <a href="#!" className="text-dark me-4" onClick={(e) => e.preventDefault()} style={{ textDecoration: "none" }}>Dining Tables</a>
                            </p>

                        </div>

                        <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mb-4 my-4">
                            <h6 className="text-uppercase fw-bold">Contact</h6>
                            <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{ width: "60px", backgroundColor: "#7c4dff", height: "2px" }} />
                            <p><i className="fas fa-home me-3"></i> Isuru Spectro Furniture Store, Ja-Ela</p>
                            <p><i className="fas fa-envelope me-3"></i> spectro@gmail.com</p>
                            <p><i className="fas fa-phone me-3"></i> +94 713452435</p>
                            <p><i className="fas fa-print me-3"></i> +94 784353876</p>
                        </div>
                    </div>
                </div>
            </section>
        </footer>
    );
};

export default Footer;
