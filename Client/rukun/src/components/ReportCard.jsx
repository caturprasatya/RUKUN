import React from 'react'
import Moment from 'react-moment';

export default function ReportCard(props) {
  const { title, amount, note, category, type, createdAt} = props.transaction

  function toIDR (value) {
    return `Rp. ${value?.toLocaleString()}`
  }

  return (
    <tr>
      <th scope="row">{type === "expance" ? "expense" : "income"}</th>
      <td>{category}</td>
      <td>{note}</td>
      <td><Moment format="D MMMM YYYY, HH:mm a" withTitle>{createdAt}</Moment></td>
      <td style={{textAlign:"end", color: (type === "expance") ? 'red' : 'black'}}>{toIDR(amount)}</td>
    </tr>
  )
}
