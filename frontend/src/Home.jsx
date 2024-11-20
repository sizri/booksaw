
import SliderComponent from './components/SliderCompnent';
import React, { useEffect } from 'react';
import AOS from 'aos';

import Header from './components/Header';
import FeaturedBooks from './components/Featuredbooks';
import BestSelling from './components/BestSelling';
import Popularbooks from './components/Popularbooks';
import Footer from './components/Footer';
import SubscribeSection from './components/Subscribe';
import SpecialOffer from './components/SpecialOffer'
function Home({addShopData,ShopData}) {

  console.log('FeaturedBooks Props:', { addShopData});
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
    });
  }, []);

  return (
    <>
      <Header></Header>
      <SliderComponent></SliderComponent>
      <FeaturedBooks addShopData={addShopData}></FeaturedBooks>
      <BestSelling></BestSelling>
      <Popularbooks addShopData={addShopData}></Popularbooks>
      <SpecialOffer addShopData={addShopData}></SpecialOffer>
      <SubscribeSection></SubscribeSection>
      <Footer></Footer>
    </>
  )
}

export default Home