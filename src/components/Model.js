import { useParams, useNavigate } from "react-router-dom";
import { baptistetwoImg } from "./image";
import { SliderData } from "./SliderData";
import { useState } from "react";

export default function Model() {
  const { id } = useParams();
  const navigate = useNavigate();
  const oneModel = SliderData.find((model) => model.id === Number(id));
  const [mainImage, setMainImage] = useState(oneModel.image[0]);
  console.log("ID", oneModel);
  console.log(oneModel.image);

  return (
    <section className="loco">
      <p>{oneModel.location}</p>
      <div className="model">
        <img src={mainImage} alt={oneModel.id} width="500px" height="auto" />
        <button>Book!</button>
      </div>
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
  );
}

// create a piece of state that contains a src for an image

// onClick on one of the images set the state to contain the source for that image that was clicked on. The source of the event can be targeted by the event target.

// Display the state in bigger image as the source property.
