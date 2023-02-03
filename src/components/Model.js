import { useParams } from "react-router-dom";
import { SliderData } from "./SliderData";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Model() {
  const { id } = useParams();
  const oneModel = SliderData.find((model) => model.id === Number(id));
  const [mainImage, setMainImage] = useState(oneModel.image[0]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="loco">
      <section className="about">
        <div className="aboutContentWrapper">
          <div className="modelAboutTitles">
            <p>Name:</p>
            <p className="">Location:</p>
            <p className="">Age:</p>
            <p className="">Events:</p>
            <p className="">About:</p>
          </div>
          <div className="modelAboutContent">
            <p>{oneModel.name}</p>
            <p>{oneModel.location}</p>
            <p>{oneModel.age}</p>
            <p>{oneModel.events}</p>
            <p className="abouthim">{oneModel.about}</p>
          </div>
        </div>

        {/* <p>
          <span style={{ color: "salmon" }}>
            <b>Name:</b>
          </span>
          {oneModel.name}
        </p>

        <p style={{ fontSize: 35 }}>
          <span style={{ color: "salmon" }}>
            <b>Location:</b>
          </span>
          {oneModel.location}
        </p>

        <p style={{ fontSize: 30 }}>
          <span style={{ color: "salmon" }}>
            <b>Age:</b>
          </span>
          {oneModel.age}
        </p>
        <p className="abouthim">
          <span style={{ color: "salmon", fontSize: 25 }}>
            <b>About:</b>
          </span>
          <span style={{ fontSize: 22, fontFamily: "Roboto" }}>
            {oneModel.about}
          </span>
        </p> */}
        <div className="smallImages">
          {oneModel.image.map((oneImage, index) => (
            <button
              key={index}
              className="modelImagesBtn"
              onClick={() => setMainImage(oneModel.image[index])}
            >
              <img
                width="150px"
                height="auto"
                className="modelImages"
                src={oneImage}
                alt={oneImage}
              />
            </button>
          ))}
        </div>
      </section>
      <div className="model">
        <img src={mainImage} alt={oneModel.id} width="500px" height="auto" />
        <Link to="./book-model">
          <button className="bookme">Book me</button>
        </Link>
      </div>
    </section>
  );
}

// create a piece of state that contains a src for an image

// onClick on one of the images set the state to contain the source for that image that was clicked on. The source of the event can be targeted by the event target.

// Display the state in bigger image as the source property.
