// Workreport.jsx
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Workreport = () => {
  const [text, setText] = useState("");
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [text3, setText3] = useState("");
  const [text4, setText4] = useState("");

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <h2 className="mb-4 text-center fw-bold text-primary border-3 pb-0"
            style={{ fontSize: "2rem", letterSpacing: "0.5px" }}>
          📝 Daily Work Report </h2>
        <div className="form-floating mb-4">
            <textarea
              className="form-control rounded-4 shadow-sm"
              placeholder="Enter text here..."
              id="text1"
              style={{ height: "130px", resize: "none" }}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <label htmlFor="text1">Work Update 10:00 AM - 12:00 PM:</label>
          </div>

          <div className="form-floating mb-4">
            <textarea
              className="form-control rounded-4 shadow-sm"
              placeholder="Enter text here..."
              id="text2"
              style={{ height: "130px", resize: "none" }}
              value={text1}
              onChange={(e) => setText1(e.target.value)}
            />
            <label htmlFor="text2">Work Update 12:01 PM - 2:00 PM: </label>
          </div>

          <div className="form-floating mb-4">
            <textarea
              className="form-control rounded-4 shadow-sm"
              placeholder="Enter text here..."
              id="text3"
              style={{ height: "130px", resize: "none" }}
              value={text2}
              onChange={(e) => setText2(e.target.value)}
            />
            <label htmlFor="text3">Work Update 2:00 PM - 4:00 PM:</label>
          </div>

          <div className="form-floating mb-4">
            <textarea
              className="form-control rounded-4 shadow-sm"
              placeholder="Enter text here..."
              id="text4"
              style={{ height: "130px", resize: "none" }}
              value={text3}
              onChange={(e) => setText3(e.target.value)}
            />
            <label htmlFor="text4">Work Update 4:00 PM - 6:00 PM:</label>
          </div>

          <div className="form-floating mb-4">
            <textarea
              className="form-control rounded-4 shadow-sm"
              placeholder="Enter text here..."
              id="text5"
              style={{ height: "130px", resize: "none" }}
              value={text4}
              onChange={(e) => setText4(e.target.value)}
            />
            <label htmlFor="text5">Work Update 6:00 PM - 8:00 PM:</label>
          </div>

           <div className="text-end">
          <button type="submit" className="btn btn-primary px-4">
            Submit
          </button>
        </div>

        </div>
      </div>
    </div>
  );
};

export default Workreport;
