import React from "react";

const IndividualData = ({ individualExcelData }) => {
  return (
    <tr key={individualExcelData.SalesID}>
      <td>{individualExcelData.SalesID}</td>
      <td>{individualExcelData.InvoiceID}</td>
      <td>{individualExcelData.DateAndTime}</td>
      <td>{individualExcelData.Amount}</td>
      <td>{individualExcelData.BranchID}</td>
    </tr>
  );
};

export default IndividualData;
