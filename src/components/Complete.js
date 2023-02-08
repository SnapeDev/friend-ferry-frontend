import React, { useState } from "react";
import { findModelById } from "./SliderData";
import { useParams } from "react-router-dom";

export default function Complete() {
  const { id } = useParams();

  const oneModel = findModelById(id);
  console.log("HELLOOOOOOOOOOOO", oneModel);
  const [mainImage, setMainImage] = useState(oneModel.image[1]);

  return (
    <div>
      <h1> Booking Complete! </h1>
      <p>
        Congratulations Jane, you have booked Bart! Enjoy your time together.{" "}
      </p>
      <img
        className="complete"
        src={mainImage}
        alt={oneModel.image[1]}
        width="400px"
        height="auto"
      />
    </div>
  );
}
