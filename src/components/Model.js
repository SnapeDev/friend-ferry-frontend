import { useParams, useNavigate } from "react-router-dom";
import { SliderData } from "./SliderData";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Model() {
  const { id } = useParams();
  console.log(typeof id);
  const oneModel = SliderData.find((model) => model.id === Number(id));
  const [mainImage, setMainImage] = useState(oneModel.image[0]);
  const navigate = useNavigate();

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
        <div className="next">
          <button className="bookhim" onClick={() => navigate(-1)}>
            Back
          </button>
          <br />
          <Link to="./book-model">
            <button className="bookme">Book me</button>
          </Link>
        </div>

        {/* <button onClick={() => navigate(-1)}>prev</button>
        <button onClick={() => navigate(`/model/${parseInt(id, 10)}`)}>
          next
        </button> */}
      </div>
    </section>
  );
}
