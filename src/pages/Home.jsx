import React from 'react'
import Navigation from "../components/Navigation.jsx";
import Nav2 from "../components/Nav2.jsx";
import BodySection from "../components/BodySection.jsx";
import Footer from "../components/Footer.jsx";
import Carousel from '../components/Carousel.jsx';
import ProductCard from '../components/ProductCard.jsx';
import styles from "./Home.module.css";
const Home = () => {
  return (
    <>
      <div className={styles.top}>
        .
      </div>
      <Nav2/>
      <Carousel/>
      <ProductCard/>
      <BodySection/>
      <BodySection/>
      
    </>
  )
}

export default Home;
