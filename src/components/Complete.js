import React, { useState } from "react";
import { findModelById } from "./SliderData";
import { useParams } from "react-router-dom";

export default function Complete({ booking }) {
  const { id } = useParams();

  const oneModel = findModelById(id);

  const [mainImage, setMainImage] = useState(oneModel.image[1]);

  return (
    <>
      {" "}
      <h1 className="bookertee"> Booking Complete! </h1>
      <div className="completed">
        {/* <h1> Booking Complete! </h1> */}
        <p className="congrats">
          Congratulations{" "}
          <span style={{ color: "salmon" }}>{booking.name}</span>, you have
          booked {oneModel.name}! <br />
          <br />
          <p className="pchild">Enjoy your time together.</p>{" "}
        </p>

        <img
          className="complete"
          src={mainImage}
          alt={oneModel.image[1]}
          width="400px"
          height="auto"
        />
      </div>
    </>
  );
}
