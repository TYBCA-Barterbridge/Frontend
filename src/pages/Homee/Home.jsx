import React from "react";
import Nav2 from "../../components/Nav2/Nav2.jsx";
import BodySection from "../../components/BodySection/BodySection.jsx";
import Carousel from "../../components/Carousel/Carousel.jsx";
import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import Workshop from "../../components/Workshop/Workshop.jsx";
import CategorySection  from "../../components/CategorySection/CategorySection.jsx";
import FeaturedSkills from "../../components/FeaturedSkills/FeaturedSkills.jsx"
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="mt-[-40px] bg-[#0F9BB7] h-10"></div>
      <Nav2 />
      <Carousel />
      <CategorySection/>
      <ProductCard />
      <FeaturedSkills/>
      <BodySection />
      <Workshop />
    </>
  );
};

export default Home;
