import React from "react";
import { useState } from "react";
import { SliderData } from "./SliderData";
import { useParams } from "react-router-dom";

export default function Complete() {
  const { id } = useParams();
  const oneModel = SliderData.find((model) => model.id === Number(id));
  const [mainImage, setMainImage] = useState(oneModel.image[1]);

  return (
    <img
      className="complete"
      src={mainImage}
      alt={oneModel.image[1]}
      width="400px"
      height="auto"
    />
  );
}
