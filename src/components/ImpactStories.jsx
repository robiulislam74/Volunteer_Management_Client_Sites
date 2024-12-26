import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import './styles.css';

// import required modules
import { Pagination } from 'swiper/modules';
import ImpactCard from './ImpactCard';

const ImpactStories = () => {
    return (
        <div className='lg:px-0 px-5'>
            <Swiper
                slidesPerView={1} // Default to 1 slide for smaller screens
                spaceBetween={20}
                breakpoints={{
                    640: { slidesPerView: 1.5, spaceBetween: 20 }, // Small screens
                    768: { slidesPerView: 2, spaceBetween: 30 }, // Medium screens
                    1024: { slidesPerView: 3, spaceBetween: 30 }, // Large screens
                }}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                {/* Swiper Slide 1 */}
                <SwiperSlide>
                    <ImpactCard
                        image={"https://i.ibb.co/KmnFbz6/post-02-680x457.jpg"}
                        category={"Charity"}
                        content={"Give Back Today"}
                        raised={"6,703"}
                        goal={"10,000"}
                        progress={"67%"}
                        description={
                            "Volunteers are individuals who freely offer their time, labor, and expertise."
                        }
                    />
                </SwiperSlide>
                {/* Swiper Slide 2 */}
                <SwiperSlide>
                    <ImpactCard
                        image={"https://i.ibb.co/tJ8QDBF/post-03-450x300.jpg"}
                        category={"WELFARE"}
                        content={"Unite for Good"}
                        raised={"6,454"}
                        goal={"10,000"}
                        progress={"87%"}
                        description={
                            "Volunteers are individuals who freely offer their time, labor, and expertise."
                        }
                    />
                </SwiperSlide>
                {/* Swiper Slide 3 */}
                <SwiperSlide>
                    <ImpactCard
                        image={"https://i.ibb.co/3CFtTWs/post-01-680x490.jpg"}
                        category={"Charity"}
                        content={"Build Brighter Future"}
                        raised={"6,703"}
                        goal={"10,000"}
                        progress={"67%"}
                        description={
                            "Volunteers are individuals who freely offer their time, labor, and expertise."
                        }
                    />
                </SwiperSlide>
                {/* Swiper Slide 4 */}
                <SwiperSlide>
                    <ImpactCard
                        image={"https://i.ibb.co/cvsGMd7/post-04-450x300.jpg"}
                        category={"IMPACT"}
                        content={"Help People Thrive"}
                        raised={"7,853"}
                        goal={"10,000"}
                        progress={"47%"}
                        description={
                            "Volunteers are individuals who freely offer their time, labor, and expertise."
                        }
                    />
                </SwiperSlide>
                {/* Swiper Slide 5 */}
                <SwiperSlide>
                    <ImpactCard
                        image={"https://i.ibb.co/zZvP8C6/post-05-450x300.jpg"}
                        category={"Charity"}
                        content={"Land Hope Today"}
                        raised={"5,703"}
                        goal={"10,000"}
                        progress={"67%"}
                        description={
                            "Volunteers are individuals who freely offer their time, labor, and expertise."
                        }
                    />
                </SwiperSlide>
            </Swiper>
        </div>
    )
}

export default ImpactStories