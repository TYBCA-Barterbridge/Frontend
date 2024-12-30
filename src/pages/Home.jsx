import React from 'react'
import Navigation from "../components/Navigation.jsx";
import Nav2 from "../components/Nav2.jsx";
import BodySection from "../components/BodySection.jsx";
import Footer from "../components/Footer.jsx";
import Carousel from '../components/Carousel.jsx';
import ProductCard from '../components/ProductCard.jsx';
const Home = () => {
  return (
    <>
      <Navigation/>
      <Nav2/>
      <Carousel/>
      <ProductCard/>
      <BodySection/>
      <BodySection/>
      <Footer/>
    </>
  )
}

export default Home;
