import React, { useEffect } from 'react';
import { showLoading } from '../helpers/loading';
import Card from './Card';
import { getNewArrivals } from '../redux/actions/filterActions';
import { getProducts } from '../redux/actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getNewArrivals());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    const { newArrivals } = useSelector(state => state.filters);
    const { loading } = useSelector(state => state.loading);

    return (
        <div>
            <section className='home-page'>
                <div className='banner-image'>
                    <img src='/images/background-img.png' alt='Banner' className='banner-img' />
                    <div className='banner-content'>
                        <h1>Isuru Spectro Furniture Store...</h1>
                        <p>Discover our wide range of high-quality furniture pieces for your home.</p>
                    </div>
                </div>
            </section>

            <section className="about top" id="about">
                <div className="container flex">
                    <div className="left">
                        <div className="img">
                            <img src="/images/ab1.jpg" alt="" className="image1" />
                            <img src="/images/ab2.jpeg" alt="" className="image2" />
                        </div>
                    </div>
                    <div className="right">
                        <div className="heading">
                            <h5>A Home Away From Home, Perfected</h5>
                            <h2>Welcome to Isuru Spectro Furniture Store...</h2>
                            <p>Welcome to Isuru Spectro Furniture Store, where comfort meets style in every piece. Nestled in the heart of Ja-Ela, our store is your ultimate destination for premium furniture that transforms your house into a home. With our exquisite attention to detail and a wide range of high-quality furnishings, we guarantee to exceed your expectations in creating the perfect living space.</p>
                            <p>Indulge in the luxury of our meticulously crafted furniture, designed to enhance the ambiance of your home. Whether you're seeking elegant sofas, cozy beds, or functional dining sets, our collection caters to your every need and preference.</p>
                            <p>Experience the joy of furnishing your space with pieces that reflect your personality and elevate your lifestyle. Visit Isuru Spectro Furniture Store today and embark on a journey of discovering the perfect furnishings for your home.</p>
                        </div>
                    </div>
                </div>
            </section>

            <hr />

            {loading ? (
                <div className='text-center'>{showLoading()}</div>
            ) : (
                <div className='container'>
                    <h3 className='py-5'>New Arrivals</h3>
                    {newArrivals && newArrivals.length > 0 && (
                        <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4'>
                            {newArrivals.map(newArrival => (
                                <div key={newArrival._id} className='col mb-10 mx-4'>
                                    <Card product={newArrival} homePage={true} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            <hr />

            <section className='home-page'>
                <div className='banner-image 2'>
                    <img src='/images/bg4.jpg' alt='Banner' className='banner-img2' />
                    <div className='banner-content1'>
                        <h1>ARE YOU A SUPPLIER?</h1>
                        <br/>
                        <p>Explore our diverse collections, meticulously curated to cater to every taste and preference. From timeless classics to contemporary marvels, our furniture transcends trends, offering enduring elegance that withstands the test of time. Whether you're furnishing a cozy corner or revamping your entire home, we have the perfect pieces to suit your vision.</p>
                        <br/>
                        <h2>HERE'S A GREAT CHANCE TO JOIN WITH OUR TEAM TO SUPPLY YOUR QUALITY PRODUCTS!!!</h2>
                        <br/>
                        <div className='d-grid gap-2 col-6 mx-auto'>
                            <button className='btn btn-danger btn-lg d-block mb-10 py-4' onClick={() => navigate('/addquatation')}>
                                CLICK HERE
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
