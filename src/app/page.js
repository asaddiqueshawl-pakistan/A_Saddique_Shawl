"use client";
import Footer from "@/components/Footer";
import FeaturedWatches from "@/components/Home/FeaturedWatches";
import Hero from "@/components/Home/Hero";
import NewArrivals from "@/components/Home/NewArrivals";
import Newsletter from "@/components/Home/Newsletter";
import PromoBanner from "@/components/Home/PromoBanner";
import Reviews from "@/components/Home/Reviews";
import ShopByCategory from "@/components/Home/ShopByCategory";
import WhyChooseUs from "@/components/Home/WhyChooseUs";
import Navbar from "@/components/Navbar";
import axios from "axios";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {

  const getProducts = async () => {
    const response = await axios.get('/api/products');
    console.log(response.data);
  }
  useEffect(() => {
    getProducts();
  })
  return (
    <>
      <Navbar />
      <Hero />
      <ShopByCategory />
      <FeaturedWatches />
      <NewArrivals />
      <WhyChooseUs />
      {/* <PromoBanner /> */}
      {/* <Reviews /> */}
      {/* <Newsletter /> */}
      <Footer />

    </>
  );
}
