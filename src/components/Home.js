import "./Home.css";
import ImageSlider from "./ImageSlider";
import { SliderData } from "./SliderData";

const Home = () => {
  return (
    <main className="main">
      <section>
        <h1>
          Welcome to Friend Ferry, where companionship and social connections
          are just a click away. Our selection of local companions are perfect
          for walks, dates, and social events. Join us and make lasting memories
          today.
        </h1>
        <button className="button">Join Now</button>
      </section>
      {/* search bar */}
      <section>
        <ImageSlider slides={SliderData} />
      </section>
    </main>
  );
};

export default Home;
