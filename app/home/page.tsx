import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import HeroSection from "./components/heroSection";
import AboutSection from "./components/aboutSection";

const HomePage = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default HomePage;
