import React from "react";
import Slider from "react-slick";

const Carousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
    };

    return (
        <Slider {...settings}>
            <div>
                <h3>Slide 1</h3>
            </div>
            <div>
                <h3>Slide 2</h3>
            </div>
            <div>
                <h3>Slide 3</h3>
            </div>
            <div>
                <h3>Slide 4</h3>
            </div>
            <div>
                <h3>Slide 5</h3>
            </div>
            <div>
                <h3>Slide 6</h3>
            </div>
        </Slider>
    );
};

export default Carousel;
