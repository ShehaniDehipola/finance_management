import React from "react";
import { useState } from "react";

import "./form.css";

const Form = () => {
  const [salesId, setSalesId] = useState("");
  const [invoiceId, setInvoiceId] = useState("");
  const [dateAndTime, setdateAndTime] = useState("");
  const [amount, setAmount] = useState("");
  const [branchId, setBranchId] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const financeRecord = {
        salesId,
        invoiceId,
        dateAndTime,
        amount,
        branchId,
      };

      const response = await fetch("http://localhost:4000/api/FinanceDetails", {
        method: "POST",
        body: JSON.stringify(financeRecord),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
      }

      if (response.ok) {
        setSalesId("");
        setInvoiceId("");
        setdateAndTime("");
        setAmount("");
        setBranchId("");
        setError(null);
        console.log("New finance record added", json);
      }
    } catch (error) {
      setError("Something went wrong");
    }
  };

  return (
    <div className="form-container">
      <form className="form-class" onSubmit={handleSubmit}>
        <div className="form-sub-container">
          <div>
            <label className="form-label">Enter sales ID</label>
          </div>
          <div>
            <input
              type="text"
              className="form-text"
              onChange={(e) => setSalesId(e.target.value)}
              value={salesId}
            />
          </div>
        </div>
        <div className="form-sub-container">
          <div>
            <label className="form-label">Enter invoice ID</label>
          </div>
          <div>
            <input
              type="text"
              className="form-text"
              onChange={(e) => setInvoiceId(e.target.value)}
              value={invoiceId}
            />
          </div>
        </div>
        <div className="form-sub-container">
          <div>
            <label className="form-label">Enter date and time</label>
          </div>
          <div>
            <input
              type="text"
              className="form-text"
              onChange={(e) => setdateAndTime(e.target.value)}
              value={dateAndTime}
            />
          </div>
        </div>
        <div className="form-sub-container">
          <div>
            <label className="form-label">Enter amount</label>
          </div>
          <div>
            <input
              type="text"
              className="form-text"
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
            />
          </div>
        </div>
        <div className="form-sub-container">
          <div>
            <label className="form-label">Enter branch ID</label>
          </div>
          <div>
            <input
              type="text"
              className="form-text"
              onChange={(e) => setBranchId(e.target.value)}
              value={branchId}
            />
          </div>
        </div>
        <div className="btn-container">
          <button className="btn-cancel">CANCEL</button>
          <button className="btn-submit">SUBMIT</button>
          {error && <div className="error">{error}</div>}
        </div>
      </form>
    </div>
  );
};

export default Form;
