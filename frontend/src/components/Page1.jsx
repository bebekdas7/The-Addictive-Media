import React, { useState } from "react";
import "../styles/page1.css";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Page1 = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [day, setDay] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const [active, setActive] = useState(1);
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleSlide1 = (e) => {
    e.preventDefault();
    if (!fname || !lname || !day || !month || !year) {
      toast.error("Please fill all the fields");
      return;
    }
    //for day, mont, year
    if (day < 1 || day > 31) {
      toast.error("Please enter a valid day");
      return;
    }
    if (month < 1 || month > 12) {
      toast.error("Please enter a valid month");
      return;
    }
    if (year < 1900 || year > 2022) {
      toast.error("Please enter a valid year");
      return;
    }
    setActive(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //for phone no.
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      toast.error("Please enter a valid phone number");
      return;
    }
    const result = await axios.post("http://localhost:8000/upload-detail", {
      name: fname + " " + lname,
      dob: `${day}/${month}/${year}`,
      phone: phone,
      email: email,
    });
    if (result.data.success == true) {
      toast.success("Details uploaded successfully");
      setTimeout(() => {
        navigate("/page2", { state: result.data });
      }, 1000);
    } else {
      toast.error(result.data.message);
    }
  };
  return (
    <main className="page1-main d-flex align-items-center justify-content-center">
      {/* //slide1 */}
      <form className="d-flex" onSubmit={handleSubmit}>
        <section className={`slide1 ${active === 1 ? "" : "disable"}`}>
          <header className="text-center sans">
            <h5 className="mb-0">Enter your personal details</h5>
          </header>
          {/* first slide input field */}
          <div className="mt-4 d-flex flex-column">
            <label htmlFor="fname" className="">
              First Name
            </label>
            <input
              type="text"
              placeholder="First Name"
              className="form-control mt-1"
              onChange={(e) => setFname(e.target.value)}
            />

            <label htmlFor="lname" className=" mt-3">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Last Name"
              className="form-control mt-1"
              onChange={(e) => setLname(e.target.value)}
            />
          </div>
          <label htmlFor="dob" className="mt-3 mb-1">
            Enter Your Date of Birth
          </label>
          <div className="dob-select px-3 d-flex align-items-center gap-3 ">
            <input
              type="number"
              name=""
              id=""
              className="form-control"
              placeholder="Day"
              onChange={(e) => setDay(e.target.value)}
            />
            <input
              type="number"
              name=""
              id=""
              className="form-control"
              placeholder="Month"
              onChange={(e) => setMonth(e.target.value)}
            />
            <input
              type="number"
              name=""
              id=""
              className="form-control"
              placeholder="Year"
              onChange={(e) => setYear(e.target.value)}
            />
          </div>
          <div className="text-center mt-4">
            <button className="btn btn-warning w-25" onClick={handleSlide1}>
              Next
            </button>
          </div>
        </section>

        {/* //slide 2 */}
        <section
          className={`slide2 d-flex flex-column ${
            active === 2 ? "" : "disable"
          }`}
        >
          <header className="text-center sans">
            <h5 className="mb-0">Enter your contact details</h5>
          </header>
          {/* Second slide input field */}
          <div className="mt-4 d-flex flex-column">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              placeholder="Phone Number"
              className="form-control mt-1"
              required
              onChange={(e) => setPhone(e.target.value)}
            />

            <label htmlFor="email" className=" mt-3">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Email Address"
              className="form-control mt-1"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="text-center mt-3 mb-2">
            <input
              type="submit"
              value="Submit"
              className="btn btn-success w-25"
            />
          </div>
        </section>
      </form>
      <Toaster />
    </main>
  );
};

export default Page1;
