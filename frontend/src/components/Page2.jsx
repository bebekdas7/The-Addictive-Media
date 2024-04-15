import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/page2.css";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import axios from "axios";

const Page2 = () => {
  const location = useLocation();
  const [disable, setDisable] = useState(false);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [address3, setAddress3] = useState("");
  const [address4, setAddress4] = useState("");
  const [address5, setAddress5] = useState("");
  const [address6, setAddress6] = useState("");
  const [address7, setAddress7] = useState("");
  const [address8, setAddress8] = useState("");
  const [address9, setAddress9] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  //handle add address
  const handleAddAddress = () => {
    toast.success("Address field 3 added");
    setDisable(true);
  };
  //handle remove address
  const handleRemoveAddress = () => {
    setDisable(false);
    toast.success("Address field 3 removed");
  };

  //form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    try {
      const result = await axios.put(
        `http://localhost:8000/update-address?id=${location.state.result._id}`,
        {
          address1,
          address2,
          address3,
          address4,
          address5,
          address6,
          address7,
          address8,
          address9,
        }
      );
      console.log(result);
      if (result.data.success == true) {
        toast.success(result.data.message);
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      }
    } catch (error) {
      console.log("Error", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="page2 d-flex align-items-center justify-content-center">
      <form onSubmit={handleSubmit}>
        <section className="px-3 py-4">
          <h3 className="sans text-center">
            Enter your previous address {location.state.result.name}
          </h3>
          <div className="address-field mt-4">
            <label htmlFor="address1">Previous Address 1</label>
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Address line 1*"
              required
              onChange={(e) => setAddress1(e.target.value)}
            />
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Address line 2*"
              required
              onChange={(e) => setAddress2(e.target.value)}
            />
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Address line 3*"
              required
              onChange={(e) => setAddress3(e.target.value)}
            />
          </div>
          <div className="address-field mt-4">
            <label htmlFor="address2">Previous Address 2</label>
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Address line 1"
              onChange={(e) => setAddress4(e.target.value)}
            />
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Address line 2"
              onChange={(e) => setAddress5(e.target.value)}
            />
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Address line 3"
              onChange={(e) => setAddress6(e.target.value)}
            />
          </div>

          {/* //third address */}
          {disable && (
            <div className="address-field mt-4">
              <label htmlFor="address3">Previous Address 3</label>
              <input
                type="text"
                className="form-control mt-2"
                placeholder="Address line 1"
                onChange={(e) => setAddress7(e.target.value)}
              />
              <input
                type="text"
                className="form-control mt-2"
                placeholder="Address line 2"
                onChange={(e) => setAddress8(e.target.value)}
              />
              <input
                type="text"
                className="form-control mt-2"
                placeholder="Address line 3"
                onChange={(e) => setAddress9(e.target.value)}
              />
            </div>
          )}
          <div className="links d-flex flex-column align-items-center mt-5">
            <button className="btn btn-success w-25" type="submit">
              Submit
            </button>
            <button className="links-button" onClick={handleAddAddress}>
              Add Another Address
            </button>
            <button className="links-button" onClick={handleRemoveAddress}>
              Remove Address
            </button>
          </div>
        </section>
      </form>
      <Toaster />
    </main>
  );
};

export default Page2;
