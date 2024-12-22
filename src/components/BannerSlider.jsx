import React from 'react'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';

const CustomPrevArrow = ({ className, style, onClick }) => (
    <div
      className={`${className} bg-gray-800 bg-opacity-50 rounded-full flex justify-center items-center`}
      style={{ ...style, left: '10px', zIndex: 1 }}
      onClick={onClick}
    >
    </div>
  );
  
  const CustomNextArrow = ({ className, style, onClick }) => (
    <div
      className={`${className} bg-primary bg-opacity-50 rounded-full flex justify-center items-center`}
      style={{ ...style, right: '10px', zIndex: 1 }}
      onClick={onClick}
    >
  
    </div>
  );


const BannerSlider = () => {
    const settings = {
        infinite: true, // Infinite loop
        speed: 500, // Transition speed
        slidesToShow: 1, // Show one slide at a time
        slidesToScroll: 1, // Scroll one slide at a time
        autoplay: true, // Auto-play slides
        autoplaySpeed: 3000, // Time in ms between auto-plays
        nextArrow: <CustomNextArrow />, // Custom Next Arrow
        prevArrow: <CustomPrevArrow />, // Custom Previous Arrow
        responsive: [
          {
            breakpoint: 640, // Mobile view
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
            },
          },
          {
            breakpoint: 1024, // Tablet and up
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      };
    
      const slides = [
        {
          id: 1,
          title: ' Volunteer Management Made Simple',
          description: 'From recruitment to reporting, simplify every step of the journey.',
          image: 'https://i.ibb.co.com/60fsHhg/home-community-donation-5.jpg',
        },
        {
          id: 2,
          title: "Your Mission, Our Solution",
          description: 'Effortlessly manage volunteers and focus on what matters—making a difference.',
          image: 'https://i.ibb.co.com/T4JNXqf/cause-4-640x476.jpg',
        },
        {
          id: 3,
          title: 'Inspiring Action, Simplifying Coordination',
          description: 'Unite your team, streamline operations, and maximize community impact.',
          image: 'https://i.ibb.co.com/6YG0sHM/cause-6-640x476.jpg',
        },
      ];
  return (
    <div className="max-w-screen-lg mx-auto py-6">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} className="relative">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-60 sm:h-96 object-cover rounded-lg"
            />
            <div className="absolute p-10 inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white rounded-lg">
             <h2 className="text-3xl sm:text-4xl font-bold font-russoOne mb-4">{slide.title}</h2>
              <p className="text-sm sm:text-lg">{slide.description}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
);

}

export default BannerSlider