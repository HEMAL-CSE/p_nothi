// Workreport.jsx
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Workreport = () => {
  const [text, setText] = useState("");
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [text3, setText3] = useState("");
  const [text4, setText4] = useState("");

  // const [items, setItems] = useState([])
  

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <h2 className="mb-4 text-center fw-bold text-primary border-3 pb-0"
            style={{ fontSize: "2rem", letterSpacing: "0.5px" }}>
          📝 Daily Work Report </h2>

{/* 1st Slot */}
      <div className="d-flex border rounded-4 p-0 overflow-hidden shadow-sm" style={{ minHeight: "132px" }}>
      {/* Left Time Slot Section (Narrowed) */}
      <div
        className="bg-light d-flex align-items-center justify-content-center px-2"
        style={{
          minWidth: "101px", // ⬅️ Reduced from 120px
          borderRight: "1px solid #dee2e6",
          fontWeight: "500",
          fontSize: "0.88rem",
          textAlign: "center"}}> 9:00 AM - 12:00 PM
      </div>

      {/* Right Text Area Section */}
      <div className="flex-grow-1">
        <textarea
          className="form-control border-0 h-100 rounded-0 p-3"
          placeholder="Enter work update here..."
          id="text1"
          style={{ height: "100%", minHeight: "130px", resize: "none" }}
          value={text}
          onChange={(e) => setText(e.target.value)}/>
      </div>
    </div> 
       <br/>
    <div className="text-end">
          <button type="submit" className="btn btn-primary px-3">
            Submit
          </button>
        </div> <br/>


{/* 2nd Slot */}
      <div className="d-flex border rounded-4 p-0 overflow-hidden shadow-sm" style={{ minHeight: "132px" }}>
      {/* Left Time Slot Section (Narrowed) */}
      <div
        className="bg-light d-flex align-items-center justify-content-center px-2"
        style={{
          minWidth: "101px", // ⬅️ Reduced from 120px
          borderRight: "1px solid #dee2e6",
          fontWeight: "500",
          fontSize: "0.88rem",
          textAlign: "center"}}> 12:00 AM - 2:00 PM
      </div>

      {/* Right Text Area Section */}
      <div className="flex-grow-1">
        <textarea
          className="form-control border-0 h-100 rounded-0 p-3"
          placeholder="Enter work update here..."
          id="text1"
          style={{ height: "100%", minHeight: "130px", resize: "none" }}
          value={text}
          onChange={(e) => setText(e.target.value)}/>
      </div>
    </div> <br/>

  <div className="text-end">
          <button type="submit" className="btn btn-primary px-3">
            Submit
          </button>
      </div> <br/>

    {/* 3rd Slot */}
      <div className="d-flex border rounded-4 p-0 overflow-hidden shadow-sm" style={{ minHeight: "132px" }}>
      {/* Left Time Slot Section (Narrowed) */}
      <div
        className="bg-light d-flex align-items-center justify-content-center px-2"
        style={{
          minWidth: "101px", // ⬅️ Reduced from 120px
          borderRight: "1px solid #dee2e6",
          fontWeight: "500",
          fontSize: "0.88rem",
          textAlign: "center"}}> 2:00 PM - 4:00 PM
      </div>

      {/* Right Text Area Section */}
      <div className="flex-grow-1">
        <textarea
          className="form-control border-0 h-100 rounded-0 p-3"
          placeholder="Enter work update here..."
          id="text1"
          style={{ height: "100%", minHeight: "130px", resize: "none" }}
          value={text}
          onChange={(e) => setText(e.target.value)}/>
      </div>
    </div> <br/>

      <div className="text-end">
          <button type="submit" className="btn btn-primary px-3">
            Submit
          </button>
        </div> <br/>

    {/* 4th Slot */}
      <div className="d-flex border rounded-4 p-0 overflow-hidden shadow-sm" style={{ minHeight: "132px" }}>
      {/* Left Time Slot Section (Narrowed) */}
      <div
        className="bg-light d-flex align-items-center justify-content-center px-2"
        style={{
          minWidth: "101px", // ⬅️ Reduced from 120px
          borderRight: "1px solid #dee2e6",
          fontWeight: "500",
          fontSize: "0.88rem",
          textAlign: "center"}}> 4:00 PM - 6:00 PM
      </div>

      {/* Right Text Area Section */}
      <div className="flex-grow-1">
        <textarea
          className="form-control border-0 h-100 rounded-0 p-3"
          placeholder="Enter work update here..."
          id="text1"
          style={{ height: "100%", minHeight: "130px", resize: "none" }}
          value={text}
          onChange={(e) => setText(e.target.value)}/>
      </div>
    </div> <br/>

     <div className="text-end">
          <button type="submit" className="btn btn-primary px-3">
            Submit
          </button>
        </div> <br/>


    {/* Last Slot */}
      <div className="d-flex border rounded-4 p-0 overflow-hidden shadow-sm" style={{ minHeight: "100px" }}>
      {/* Left Time Slot Section (Narrowed) */}
      <div
        className="bg-light d-flex align-items-center justify-content-center px-2"
        style={{
          minWidth: "101px", // ⬅️ Reduced from 120px
          borderRight: "1px solid #dee2e6",
          fontWeight: "500",
          fontSize: "0.88rem",
          textAlign: "center"}}> 6:00 PM - 8:00 PM
      </div>

      {/* Right Text Area Section */}
      <div className="flex-grow-1">
        <textarea
          className="form-control border-0 h-100 rounded-0 p-3"
          placeholder="Enter work update here..."
          id="text1"
          style={{ height: "100%", minHeight: "130px", resize: "none" }}
          value={text}
          onChange={(e) => setText(e.target.value)}/>
      </div>
    </div> <br/>

           <div className="text-end">
          <button type="submit" className="btn btn-primary px-3">
            Submit
          </button>
        </div>

        </div>
      </div>
    </div>
  );
};

export default Workreport;
