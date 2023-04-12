import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect} from 'react'

const FormEdit = () => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        salesId:"",
        invoiceId:"",
        dateAndTime:"",
        amount:"",
        branchId:""
    })

    const setData = (e) =>{
        const {salesId, value} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [salesId]:value
        }))
    }

    const {id} = useParams("")
    console.log(id)

    const getData = async (e) => {

        const response = await fetch ('/getfinance/${id}', {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        })

        const json = await response.json()
        console.log(json)

        if(!response.ok){
            console.log("Error occured")
        }

        if(response.ok){
            console.log("Get finance record", json)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const EditFinanceDetails = async (e) => {
        e.preventDefault()

        const formData = {salesId, invoiceId, dateAndTime, amount, branchId}

        const response1 = await fetch ('/updatefinance/${id}', {
            method:"PATCH",
            headers:{
                "Content-Type":"applocation/json"
            },
            body: JSON.stringify({
                salesId, invoiceId, dateAndTime, amount, branchId
            })
        })

        const json1 = await response1.json()
        console.log(json1)

        if(!response1.ok){
            console.log("Error occured")
        }

        if(response1.ok){
            console.log("Get finance record", json1)
            navigate("/")
        }
    }

  return (
    <div className="form-container">
      <form className="form-class" onSubmit={handleSubmit}>
        <div className="form-sub-container">
          <div>
            <label className="form-label">Sales ID</label>
          </div>
          <div>
            <input
              type="text"
              className="form-text"
              onChange={setData}
              value={formData.salesId}
            />
          </div>
        </div>
        <div className="form-sub-container">
          <div>
            <label className="form-label">Invoice ID</label>
          </div>
          <div>
            <input
              type="text"
              className="form-text"
              onChange={setData}
              value={formData.invoiceId}
            />
          </div>
        </div>
        <div className="form-sub-container">
          <div>
            <label className="form-label">Date and Time</label>
          </div>
          <div>
            <input
              type="text"
              className="form-text"
              onChange={setData}
              value={formData.dateAndTime}
            />
          </div>
        </div>
        <div className="form-sub-container">
          <div>
            <label className="form-label">Amount</label>
          </div>
          <div>
            <input
              type="text"
              className="form-text"
              onChange={setData}
              value={formData.amount}
            />
          </div>
        </div>
        <div className="form-sub-container">
          <div>
            <label className="form-label">Branch ID</label>
          </div>
          <div>
            <input
              type="text"
              className="form-text"
              onChange={setData}
              value={formData.branchId}
            />
          </div>
        </div>
        <div className="btn-container">
          <button type="submit" onClick={EditFinanceDetails} className="btn-update">UPDATE</button>
        </div>
      </form>
    </div>
  )
}

export default FormEdit
