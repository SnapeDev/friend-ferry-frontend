import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
// import { useForm } from "react-hook-form";

import "react-datepicker/dist/react-datepicker.css";

const BookModel = ({ isAuth }) => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState();
  // const [name, setName] = useState("");
  // const [hours, setHours] = useState();
  // const [minutes, setMinutes] = useState("");
  const [input, setInput] = useState({
    name: "",
    location: "",
  });

  useEffect(() => {
    if (!isAuth) {
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
  const handleSubmit = (event) => {
    console.log("input", input);
    event.preventDefault();
  };

  const hour = moment(startDate).format("hh");
  const hourRate = 200;

  return (
    <section className="call">
      <form className="myform" onSubmit={handleSubmit}>
        <h1 className="confirm">Book Companion:</h1> <br />
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
              selected={startDate}
              onChange={(date) => setStartDate(date)}
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
        <button className="submit" type="submit" />
      </form>
    </section>
  );
};

export default BookModel;
