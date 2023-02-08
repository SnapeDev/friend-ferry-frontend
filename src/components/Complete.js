import React from "react";
import { useState } from "react";
import { SliderData } from "./SliderData";
import { useParams } from "react-router-dom";

export default function Complete() {
  const { id } = useParams();
  const oneModel = SliderData.find((model) => model.id === parseInt(id));
  console.log("HELLOOOOOOOOOOOO", oneModel);
  // const [mainImage, setMainImage] = useState(oneModel);

  return (
    <div>
      <h1> Booking Complete! </h1>
      <p>
        Congratulations Jane, you have booked Bart! Enjoy your time together.{" "}
      </p>
      {/* <img
        className="complete"
        src={mainImage}
        alt={oneModel.image[1]}
        width="400px"
        height="auto"
      /> */}
    </div>
  );
}
