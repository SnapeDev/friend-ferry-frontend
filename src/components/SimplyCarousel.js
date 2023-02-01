import { useState } from "react";
import ReactSimplyCarousel from "react-simply-carousel";
import { SliderData } from "./SliderData";
import { Link } from "react-router-dom";

export default function SimplyCarousel() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  return (
    <div className="carouselWrapper">
      <ReactSimplyCarousel
        activeSlideIndex={activeSlideIndex}
        onRequestChange={setActiveSlideIndex}
        itemsToShow={1}
        itemsToScroll={1}
        forwardBtnProps={{
          //here you can also pass className, or any other button element attributes
          style: {
            alignSelf: "center",
            background: "black",
            border: "none",
            borderRadius: "50%",
            color: "white",
            cursor: "pointer",
            fontSize: "20px",
            height: 30,
            lineHeight: 1,
            textAlign: "center",
            width: 30,
          },
          children: <span>{`>`}</span>,
        }}
        backwardBtnProps={{
          //here you can also pass className, or any other button element attributes
          style: {
            alignSelf: "center",
            background: "black",
            border: "none",
            borderRadius: "50%",
            color: "white",
            cursor: "pointer",
            fontSize: "20px",
            height: 30,
            lineHeight: 1,
            textAlign: "center",
            width: 30,
          },
          children: <span>{`<`}</span>,
        }}
        responsiveProps={[
          {
            itemsToShow: 4,
            itemsToScroll: 1,
            minWidth: 768,
          },
        ]}
        speed={400}
        easing="linear"
      >
        {/* here you can also pass any other element attributes. Also, you can use your custom components as slides */}

        {SliderData.map((slide) => (
          <Link to={`/model/${slide.id}`}>
            <img
              src={slide.image[0]}
              alt={slide.image}
              className="sliderImages"
            />
          </Link>
        ))}
      </ReactSimplyCarousel>
    </div>
  );
}
