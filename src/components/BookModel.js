import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";
import { SliderData } from "./SliderData";

// import { useForm } from "react-hook-form";

import "react-datepicker/dist/react-datepicker.css";

const hourRate = 200;
const calculateRate = (nb) => {
  return hourRate * nb;
};

const BookModel = ({ user, booking, setBooking }) => {
  const { id } = useParams();
  const oneModel = SliderData.find((model) => model.id === Number(id));
  console.log("ONE MODEL IN BOOKMODEL", oneModel);
  const [mainImage, setMainImage] = useState(oneModel.image[1]);
  const navigate = useNavigate();
  // const [startDate, setStartDate] = useState();
  // const [name, setName] = useState("");
  // const [hours, setHours] = useState();
  // const [minutes, setMinutes] = useState("");
  // const [input, setInput] = useState({
  //   name: "",
  //   event: "",
  //   location: "",
  //   datetime: new Date(),
  //   nbHours: 0,
  //   amount: 0,
  // });

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setBooking((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleNbHoursChange = (evt) => {
    const hours = parseInt(evt.target.value);
    setBooking((prev) => {
      return {
        ...prev,
        nbHours: hours,
        modelId: id,
        amount: calculateRate(hours),
      };
    });
  };

  const handleDateChange = (date) => {
    if (!date) {
      return;
    }

    setBooking((prev) => {
      return { ...prev, datetime: date };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // we would also need to validate the input before redirecting

    navigate("/payment", { state: booking });
  };

  console.log("input on re-render", booking);

  return (
    <section className="call">
      <form className="myform" onSubmit={handleSubmit}>
        <h1 className="confirm">Book {oneModel.name}:</h1> <br />
        <label>Name</label>
        <input name="name" value={booking.name} onChange={handleChange} />{" "}
        <br />
        <label>Location</label>
        <input
          name="location"
          value={booking.location}
          onChange={handleChange}
        />
        <br />
        <label>Event</label>
        <input name="event" value={booking.event} onChange={handleChange} />
        <div className="calendar">
          <label htmlFor="date-picker">
            Date of booking:
            <DatePicker
              id="date-picker"
              // className="datepick"
              selected={booking.datetime}
              onChange={handleDateChange}
              showTimeSelect
              timeIntervals={60}
              // minTime={setHours(setMinutes(new Date(), 0), 17)}
              // maxTime={setHours(setMinutes(new Date(), 30), 20)}
              dateFormat="MMMM d, yyyy h:mm aa"
            />
          </label>
        </div>
        <div>
          <label htmlFor="number-of-hours">
            <select
              value={booking.nbHours}
              name="nbHours"
              id="number-of-hours"
              onChange={handleNbHoursChange}
            >
              <option value="1">1 hours</option>
              <option value="2">2 hours</option>
              <option value="3">3 hours</option>
              <option value="4">4 hours</option>
              <option value="5">5 hours</option>
              <option value="6">6 hours</option>
              <option value="7">7 hours</option>
              <option value="8">8 hours</option>
              <option value="9">9 hours</option>
              <option value="10">10 hours</option>
            </select>
          </label>
        </div>
        <h2 style={{ color: "black" }}>
          {" "}
          The amount total for your booking is €{calculateRate(booking.nbHours)}
        </h2>
        <div className="next">
          <button className="submit" onClick={() => navigate(-1)}>
            Back
          </button>
          <button className="submit" type="submit">
            Submit
          </button>
        </div>
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
