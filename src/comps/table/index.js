import React, {useEffect, useState, useRef} from 'react'
import './style.css'
import { Icon} from "@blueprintjs/core";
import { CONFIG } from '../../config'


const Table = ({data, onClick, color, load}) => {
  const [sortConfig, setConfig] = useState({key: '', direction: ''})
  const [sortedData, setSorted] = useState(null)
  const [tableData, setTableData] = useState(data ? data : [])
  const tableRef = useRef()


  useEffect(()=>{
    if(tableRef.current !== undefined){
      tableRef.current.scrollIntoView({
        behavior: "smooth"
      });
    }
  })

  useEffect(()=>{
    setSorted(sortData())
  },[sortConfig])

  const sortData = () => {
    let sorted = [...tableData]
    sorted.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    return sorted
  }

const requestSort = (key) => {
  let direction = 'ascending';
  if (sortConfig.key === key && sortConfig.direction === 'ascending') {
    direction = 'descending';
  }
  setConfig({ key, direction });
}

  var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  });

  return (
    <table>
      <tr>
        <th>Company</th>
        <th>Contact</th>
        <th>Country</th>
      </tr>
      <tr>
        <td>Alfreds Futterkiste</td>
        <td>Maria Anders</td>
        <td>Germany</td>
      </tr>
      <tr>
        <td>Centro comercial Moctezuma</td>
        <td>Francisco Chang</td>
        <td>Mexico</td>
      </tr>
    </table>
  )
}


export default Table;