import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import HeroSection from "./components/heroSection";
import AboutSection from "./components/aboutSection";
import ProjectList from "./components/projectList";
import AwardSection from "./components/awardSection";
import WhyInvestSection from "./components/whyInvestSection";

const HomePage = () => {
    return (
        <div>
            <Header />
            <HeroSection />
            <AboutSection />
            <ProjectList />
            <AwardSection />
            <WhyInvestSection />
            <Footer />
        </div>
    );
};

export default HomePage;
