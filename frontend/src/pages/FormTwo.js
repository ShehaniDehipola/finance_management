import React from 'react'
import {useState} from 'react'
import Data from '../Components/Data'
import * as XLSX from 'xlsx'

const FormTwo = () => {

    //on change states
    const [excelFile, setExcelFile] = useState(null)
    const [excelFileError, setExcelFileError] = useState(null)

    console.log(excelFile)

    //submit
    const [excelData, setExcelData] = useState(null)
    //it will contain array of objects

    //allowing excel files only
    const fileType=['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
    //handleFile function
    const handleFile = (e) => {
        let selectedFile = e.target.files[0] //whatever file we select, it will be saved in selectedFile variable
        if(selectedFile){
            //console.log(selectedFile.type)
            if(selectedFile && fileType.includes(selectedFile.type)){

                //to convert file to an array buffer
                let reader = new FileReader()
                reader.readAsArrayBuffer(selectedFile)
                reader.onload = (e) => {
                    setExcelFileError(null)
                    setExcelFile(e.target.result)
                }
            }
            else{
                setExcelFileError("Please select only excel file types")
                setExcelFile(null)
            }
        }
        else{
            console.log("Please select your file")
        }
    }

    //handleSubmit function
    const handleSubmit = (e) => {
        e.preventdefault()
        if(excelFile !== null){
            const workbook = XLSX.read(excelFile, {type:'buffer'})
            const worksheetName = workbook.SheetNames[0]
            const worksheet = workbook.Sheets[worksheetName] //all the data in file are assigned to this worksheet variable
            const data = XLSX.utils.sheet_to_json(worksheet)
            setExcelData(data)
        }
        else{
            setExcelData(null)
        }
    }

  return (
    <div className="container"> 

      {/*upload file section*/}
      <div className="form">
      <form className="form-group" autoComplete="off" onSubmit={handleSubmit}>
        <label><h5>Upload Excel File</h5></label>
        <br></br>
        <input type='file' className="form-control" onChange={handleFile} required></input>
        {excelFileError && <div className="text-danger">{excelFileError}</div>}
        <button type='submit' className='btn btn-success'>Submit</button>
      </form>
      </div>

      <br></br>
      <hr></hr>

      {/*view file section*/}
      <h5>View Excel File</h5>
      <div className="viewer">
        {excelData === null && <>No file selected</>}
        {excelData !== null && (
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
                        <Data excelData={excelData}></Data> {/*passing excel data as a prop*/}
                    </tbody>
                </table>
            </div>
        )}
      </div>
    </div>
  )
}

export default FormTwo
