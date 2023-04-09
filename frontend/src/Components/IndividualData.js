import React from 'react'

const IndividualData = ({individualExcelData}) => {
  return (
    <div>
      <th>{individualExcelData.SalesID}</th>
      <th>{individualExcelData.InvoiceID}</th>
      <th>{individualExcelData.DateAndTime}</th>
      <th>{individualExcelData.Amount}</th>
      <th>{individualExcelData.BranchID}</th>
    </div>
  )
}

export default IndividualData
