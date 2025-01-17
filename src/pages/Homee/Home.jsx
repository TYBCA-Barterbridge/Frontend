import React from "react";

import Nav2 from "../../components/Nav2/Nav2.jsx";
import BodySection from "../../components/BodySection/BodySection.jsx";

import Carousel from "../../components/Carousel/Carousel.jsx";
import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import styles from "./Home.module.css";
import Workshop from "../../components/Workshop/Workshop.jsx";
const Home = () => {
  return (
    <>
      <div className={styles.top}>.</div>
      <Nav2 />
      <Carousel />
      <ProductCard />
      <BodySection />
      <Workshop />
    </>
  );
};

export default Home;
