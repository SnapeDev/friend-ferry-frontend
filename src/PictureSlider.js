import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { SliderData } from "./components/SliderData";

export default function PictureSlider() {
  console.log("pictures", SliderData);

  return (
    <div>
      <Carousel>
        {SliderData.map((slide) => (
          <>
            <img src={slide.image} />
          </>
        ))}
      </Carousel>
    </div>
  );
}
