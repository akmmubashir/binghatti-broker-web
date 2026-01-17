import React from 'react'
import ContentWrapper from '@/app/components/contentWrapper'

const HeroSection = () => {
    return (
        <ContentWrapper maxwidth='max-w-full mx-auto' className='h-dvh relative'>
            {/* video fixed section */}
            <video
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
                muted
                playsInline
                loop
                preload="auto"
                autoPlay
            >
                <source src={"/assets/common/hero.mp4"} type="video/mp4" />
            </video>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* content section */}
            <div className='relative z-10 flex flex-col items-center justify-center h-full'>
                <h1 className='text-white text-[76px] max-xl:text-[56px] max-lg:text-[32px] font-medium text-center leading-24 max-xl:leading-18 max-lg:leading-12.5 w-1/2 max-xl:w-2/3 max-lg:w-full'>
                    Luxury Real Estate Developer in Dubai
            </h1>
           
        </div>
        </ContentWrapper >
    )
}

export default HeroSection