import React from "react";
import { useState } from "react";
import { read, utils } from "xlsx";
import XLSX from 'xlsx';
import IndividualData from "../Components/IndividualData";
import './FormTwo.css'

const FormTwo = () => {
  //on change states
  const [excelFile, setExcelFile] = useState(null);
  const [excelFileError, setExcelFileError] = useState(null);

  console.log(excelFile);

  //submit
  const [excelData, setExcelData] = useState(null);
  //it will contain array of objects

  //allowing excel files only
  const fileType = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];
  //handleFile function
  const handleFile = async (e) => {
    try {
      let selectedFile = e.target.files[0]; //whatever file we select, it will be saved in selectedFile variable
      if (selectedFile && fileType.includes(selectedFile.type)) {
        //console.log(selectedFile.type)
        const data = await selectedFile.arrayBuffer();
        const workbook = read(data, { type: "buffer" }); //reading excel file as workbook
        console.log("workbook", workbook);

        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];
        console.log("worksheet", worksheet);
        const jsonData = utils.sheet_to_json(worksheet); //coverting sheet data into json
        setExcelData(jsonData);

        console.log("jsonData", jsonData);
      } else {
        setExcelFileError("Please select only excel file types");
        setExcelFile(null);
      }
    } catch (error) {
      console.log("error", error);
      setExcelFileError("An error occurred. Please try again");
    }
  };

  //handleSubmit function
  const handleSubmit = (e) => {
    e.preventdefault();
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName]; //all the data in file are assigned to this worksheet variable
      const data = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(data);
    } else {
      setExcelData(null);
    }
  };

  return (
    <div className="container">
      {/*upload file section*/}
      <div className="form">
        <form className="form-group" autoComplete="off" onSubmit={handleSubmit}>
          <label>
            <h5>Upload Excel File</h5>
          </label>
          <br></br>
          <input
            type="file"
            className="form-control"
            onChange={handleFile}
            required
          ></input>
          {excelFileError && (
            <div className="text-danger">{excelFileError}</div>
          )}
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </form>
      </div>

      <br></br>
      <hr></hr>

      {/*view file section*/}
      <h5 className="h5">View Excel File</h5>
      <div className="viewer">
        {/* {excelData === null && <>No file selected</>} */}
        {excelData !== null && excelData.length ? (
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                           <th scope="col">Sales ID</th> 
                           <th scope="col">Invoice ID</th> 
                           <th scope="col">Date And Time</th> 
                           <th scope="col">Amount</th> 
                           <th scope="col">Branch ID</th> 
                        </tr>
                    </thead>
                    <tbody>
                        {
                            excelData.map((individualExcelData) => <IndividualData key={individualExcelData.SalesID} individualExcelData={individualExcelData}/>)
                        }
                    </tbody>
                </table>
            </div>
        ): null}
      </div>
    </div>
  );
};

export default FormTwo;
