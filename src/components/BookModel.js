import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";
import { SliderData } from "./SliderData";

// import { useForm } from "react-hook-form";

import "react-datepicker/dist/react-datepicker.css";

const BookModel = ({ user }) => {
  const { id } = useParams();
  const oneModel = SliderData.find((model) => model.id === Number(id));
  const [mainImage, setMainImage] = useState(oneModel.image[1]);
  const navigate = useNavigate();
  // const [startDate, setStartDate] = useState();
  // const [name, setName] = useState("");
  // const [hours, setHours] = useState();
  // const [minutes, setMinutes] = useState("");
  const [input, setInput] = useState({
    name: "",
    event: "",
    location: "",
    datetime: new Date(),
    amout: 0,
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  const handleChange = (evt) => {
    const value = evt.target.value;
    setInput({
      ...input,
      [evt.target.name]: value,
    });
  };

  const handleDateChange = (date) => {
    if (!date) {
      return;
    }

    // making a calculation of the rate
    const amount = hourRate;
    setInput((prev) => {
      return { ...prev, datetime: date, amount };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // we would also need to validate the input before redirecting

    navigate("/payment", { state: input });
  };

  // const hour = moment(startDate).format("hh");
  const hourRate = 200;

  return (
    <section className="call">
      <form className="myform" onSubmit={handleSubmit}>
        <h1 className="confirm">Book {oneModel.name}:</h1> <br />
        <label>Name</label>
        <input name="name" value={input.name} onChange={handleChange} /> <br />
        <label>Location</label>
        <input name="location" value={input.location} onChange={handleChange} />
        <br />
        <label>Event</label>
        <input name="event" value={input.event} onChange={handleChange} />
        <div className="calendar">
          <label>
            Date of booking:
            <DatePicker
              // className="datepick"
              selected={input.datetime}
              onChange={handleDateChange}
              showTimeSelect
              timeIntervals={60}
              // minTime={setHours(setMinutes(new Date(), 0), 17)}
              // maxTime={setHours(setMinutes(new Date(), 30), 20)}
              dateFormat="MMMM d, yyyy h:mm aa"
            />
          </label>
        </div>
        <h2 style={{ color: "black" }}>
          {" "}
          The amount total for your booking is €{hourRate}
        </h2>
        <button className="submit" type="submit">
          Submit
        </button>
      </form>
      <div>
        <img
          className="booked"
          src={mainImage}
          alt={oneModel.image[1]}
          width="400px"
          height="auto"
        />
      </div>
    </section>
  );
};

export default BookModel;
