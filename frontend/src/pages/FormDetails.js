import React from 'react'
import Form from './Form'
import "./FormDetails.css"
import { NavLink, useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect} from 'react'

const FormDetails = () => {

    const navigate = useNavigate()

    const [getFinanceRecord, setFinanceRecord] = useState(getFinanceRecord)
    const [error, setError] = useState(null);
    console.log(getFinanceRecord)

    const {Id} = useParams("")
    console.log(Id)

    const getFinanceData = async (e) => {
        const response = await fetch("/getfinance/${Id}", {
            method:"GET",
            headers:{
                "Content-type":"application/json"
            }
        })

        const json = await response.json()
        console.log(json)

        if(!response.ok){
            setError(json.error);
        }

        if(response.ok){
            setError(null)
            console.log("New finance record added", json)
        }
    }

    useEffect(() => {
        getFinanceData()
    }, [])

    //deleteFinanceRecord function
    const deleteFinanceRecord = async ({salesId}) => {
        const response1 = await fetch ("/deletefinance/${salesId}",{
            method:"DELETE",
            headers:{
                "Content-type":"application/json"
            }
        })

        const json = await response1.json()
        console.log(json)

        if(!response1.ok){
            setError(json.error);
        }

        if(response1.ok){
            setError(null)
            navigate("/")
            console.log("Finance record deleted", json)
            getFinanceData()
        }
    }

  return (
    <div className="table-container">
      <h1>Finance Details</h1>
      <br></br>
      <table className="table">
        <thead>
            <tr className="table-head">
                <th scope="col">Sales ID</th>
                <th scope="col">Invoice ID</th>
                <th scope="col">Date And Time</th>
                <th scope="col">Amount</th>
                <th scope="col">Branch ID</th>
            </tr>
        </thead>
        <tbody>
            {getFinanceRecord.map((current) => (
                <tr className="table-data">
                <td>{current.salesId}</td>
                <td>{current.invoiceId}</td>
                <td>{current.dateAndTime}</td>
                <td>{current.amount}</td>
                <td>{current.branchId}</td>
                <td>
                    <NavLink><button>Edit</button></NavLink>
                    <button onClick={()=>deleteFinanceRecord(getFinanceData._salesId)}>Delete</button>
                </td>
            </tr>
            )) 
            }
            {error && <div className="error">{error}</div>}
        </tbody>
      </table>
    </div>
  )
}

export default FormDetails
