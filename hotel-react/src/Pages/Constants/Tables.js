import React, { useState, useRef } from 'react'
import { Form, Table } from 'react-bootstrap'
import tableStyle from "../../assets/css/table.module.css"
import { useEffect } from 'react';
import ReactPaginate from "react-paginate";
import { Link } from 'react-router-dom';
import ConvertDateTime from '../Common_Fun/ConvertDateTime';
import ReactToPrint from 'react-to-print';
import Button from 'react-bootstrap/Button';


/* need to read instructions before use this page
data = {table data} All backend data that you want to show
title = {head:[backend key, input type]}
  - head mean th,  table head like Name and Start Date and other
  - backend key - if you want to show the start date then its key show in the backend table as {startDay: "2023-02-15"} 
    so, the backend key is startDay
  - input type - if you want to filter option in the table then input type will help you add the input type like text, number
    if you don't want to add a filter for some option you can write "none" instead of the input type
input = if you don't want to add a filter for all options then use input={false} if not then you can use input={true}
button = if the designer wants to show the edit and delete button in the table then this prop will help it pass props like
- {{"edit": "none"}} = edit means edit button and "none" mean call function when the user clicks the button and the designer will pass the button in buttonType
- {{"edit":"/room_view/"}} = when the designer passes the value as /room_view/, it's means this page will reach this location /room_view/{id}
buttonType = if the designer wants to call a function after clicking the button then button type will help to pass the function
permissions = pass backend permission to function
page = page name
select_val = {"head": "value"} if the page has a select button then pass the select value with a title name like {"Room Type":["king", "single"]}
- note:- only pass values as an array, not a dictionary like {"id": "3","all_room_type: "king"} just pass like ["king"]
extra = if the user wants to show extra data in the table which's not in the backend so, the user can pass {"extra": data}  
- note:- the user only pass the data as {"id": "value"}
trSelect = {"head":[value]} if the designer wants to add a select button in td section then trSelect option will help to add a button in td section
thSelectFun = {function} if the designer wants to call a function after clicking on td select button then thSelect fun will help the designer to call fun
onChange(()⇒{props.thSelectFun()})
addTime = if the designer wants to add time with a date in the table then add time will help the user to pass addTime like
- {'Check-In':["checkin_date addTime checkin_time ", 'date']}
Check-In = title and checkin_date mean backend data key addTime specific character checkin_time is another key for the time
*/

function Tables(props) {
  const color = { 'edit': tableStyle.primary, 'delete': tableStyle.danger, 'prime': tableStyle.primary }
  const [searchData, setSearchData] = useState('')
  const [tableData, setTableData] = useState([])
  const [newTest, setNewTest] = useState([])
  const [dateCon, setDate] = useState({})
  const [condition, setCondition] = useState(true)
  const [allData, setAllData] = useState({})
  const [pageData, setPageData] = useState([])
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0)
  const itemsPerPage = 10
  const [startDate, setStartDate] = useState([])
  const [endDate, setEndDate] = useState([])
  const allArr = ['Start Date', 'Check-In Date', 'End Date', 'Check-Out Date', 'Check-In', 'Check-Out']
  const [paginationShow, setPaginationShow] = useState(true)
  const [KeyValue, setKeyValue] = useState({})
  const [reval, setReVal] = useState([])
  const componentRef = useRef();
  const windowRef = useRef(window);

  useEffect(() => {

    paginationData()
    let keys_add = {}
    let date = {}
    let title
    let keyvalue = {}
    let Start = []
    let End = []
    let reValue = {}
    Object.keys(props.title).map((newVal) => {

      if (newVal === "Start Date") {
        Start.push(newVal)
        reValue[props.title[newVal][0]] = newVal
      }
      else if (newVal === "Check-In Date" || newVal === "Check-In") {
        Start.push(newVal)
        reValue[props.title[newVal][0]] = newVal
      }
      else if (newVal === "End Date") {
        End.push(newVal)
        reValue[props.title[newVal][0]] = newVal
      }
      else if (newVal === "Check-Out Date" || newVal === "Check-Out") {
        End.push(newVal)
        reValue[props.title[newVal][0]] = newVal
      }


      title = props.title[newVal][0]


      keys_add[title] = ''
      date[title] = false
      keyvalue[props.title[newVal][0]] = props.title[newVal][1]

    })
    setReVal(reValue)
    setStartDate(Start)
    setEndDate(End)
    setKeyValue(keyvalue)
    console.log(keys_add)
    setAllData(keys_add)
    setDate(date)
  }, [])

  const convert = (value, title) => {

    let date = false
    let id = title[0]


    if (title[1] === "date") {
      date = true
    }

    title = title[0]

    let last_name = null
    let conLast
    let time = null

    if (title.includes("first_name")) {
      last_name = title.replace("first_name", "last_name")
    }

    if (props.addTime !== undefined) {
      if (props.addTime[title] !== undefined) {

        time = props.addTime[title]

        if (time.includes("[")) {
          time = eval(time)
        }
        else {
          time = value[time]
        }

        time = ConvertDateTime(time, "time")
        console.log(time)
      }
    }


    if (title.includes('[')) {
      let values = eval(title)
      if (last_name !== null) {
        conLast = eval(last_name)
        value = `${values} ${conLast}`
      }
      else {
        value = values
      }

    }
    else {
      if (last_name !== null) {
        value = `${value[title]}  ${value = value[last_name]}`
      }
      else {
        value = value[title]
      }
    }



    if (date === true) {
      value = ConvertDateTime(value, "date")
    }

    if (title.includes("Role")) {
      value = String(value)
    }

    if (time !== null) {
      value = (<> {value} <br /> {time}</>)

    }

    return value
  }

  const paginationData = (currentPage = 0, getData = null) => {

    const startIndex = currentPage * itemsPerPage
    const endIndex = startIndex + itemsPerPage;

    let sliceData

    if (condition) {
      sliceData = props.data
    }
    else {
      sliceData = getData
    }

    let length = Object.keys(sliceData).length
    let cal = Math.ceil(length / itemsPerPage)

    setPageCount(cal)


    const currentItems = sliceData.slice(startIndex, endIndex);

    if (condition) {
      setTableData(currentItems)
    }
    else {
      setNewTest(currentItems)
    }

  }

  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
    paginationData(selectedPage, pageData)
  };

  const myFun = (title, value, date = false, head = null) => {
    setPaginationShow(false)
    setCondition(false)
    allData[title] = value
    dateCon[title] = date

    let searchData = props.data
    console.log(allData)

    let convertVal
    let last_name = null
    let replace
    let convert2
    const FixData = props.title

    Object.keys(allData).map((title) => {
      console.log("TITLE1", title, allData)
      value = allData[title]
      console.log(searchData)
      searchData = searchData.filter((val, index, o) => {
        console.log("TITLE", title)
        if (title.includes('[')) {
          if (title.includes("first_name")) {
            last_name = title.replace("first_name", "last_name")
            replace = title.replace("value[", "val[")
            last_name = last_name.replace("value[", "val[")
            convert2 = eval(last_name)
            convertVal = eval(replace)
            if (convertVal !== undefined) {
              convertVal = convertVal.toString()
            }
            if (convert2 !== undefined) {
              convert2 = convert2.toString()
            }
            convertVal = `${convertVal} ${convert2}`
          }
          else {
            replace = title.replace("value[", "val[")
            convertVal = eval(replace)
            if (convertVal !== undefined) {
              convertVal = convertVal.toString()
            }
          }
        }

        else {
          if (title.includes("first_name")) {
            last_name = title.replace("first_name", "last_name")
            convert2 = val[last_name]
            if (convert2 !== undefined) {
              convert2 = convert2.toString();
            }
            convertVal = `${val[title]} ${convert2}`
          }
          convertVal = val[title]
          if (convertVal !== undefined) {
            convertVal = convertVal.toString();
          }
        }

        if (convertVal !== undefined) {
          convertVal = convertVal.toLowerCase()
        }
        else {
          console.log(convertVal)
          return val;
        }
        if (typeof value === "string") {
          value = value.toLowerCase()
        }

        if (KeyValue[title] !== "number" && KeyValue[title] !== "date") {
          if (convertVal.includes(value)) {
            return val
          }
        }
        if (KeyValue[title] === "number" && KeyValue[title] !== "date") {
          if (convertVal === value) {
            return val
          }
        }

        if (KeyValue[title] === "date") {
          convertVal = ConvertDateTime(convertVal, "year")
          convertVal = new Date(convertVal)


          if (value !== "") {
            value = ConvertDateTime(allData[title], "year")
            value = new Date(value)
            console.log("title", title, allArr)

            if (allArr.includes(reval[title])) {
              console.log("000000000000")
              if (props.title[endDate.includes('End Date') ? 'End Date' : endDate.includes('Check-Out') ? 'Check-Out' : 'Check-Out Date'][0] === title) {
                if (value >= convertVal) {
                  return val
                }
              }

              else if (props.title[startDate.includes('Start Date') ? 'Start Date' : startDate.includes('Check-In') ? 'Check-In' : 'Check-In Date'][0] === title) {
                if (value <= convertVal) {
                  return val
                }
              }
            }
            else {
              if (value <= convertVal) {
                return val
              }
            }
          }
          else {
            if (value <= convertVal) {
              return val
            }
          }

        }

        if (convertVal === undefined) {
          console.log("00000")
          return false
        }

        if (value === undefined) {
          console.log("00000")
        }

        if (value === "") {
          return val
        }

      })

    })


    let newSearch = searchData
    setTableData(newSearch)
    setNewTest(newSearch)
    setPageData(newSearch)
    paginationData(0, newSearch)
    setSearchData({ ...searchData, [`${title}`]: value })
    setPaginationShow(true)

  }


  return (
    <>
      <Table ref={componentRef} className={`p-3 table table-hover ${tableStyle.head}`}>
        <thead style={{ backgroundColor: "#47ADFF", color: "white" }}>
          <tr>
            {/* props.title keys calls as array */}

            {Object.keys(props.title).map((title) => {
              return <th>

                {/* title key name */}

                <p className='mb-3'>{title}</p>

                {/* if props.input is true then the button like input and select button will show */}

                {props.input && (

                  // all button show according to the given values like text, select and others

                  // myFun is use for filter the data

                  // props.select_val[title] like {Room Type:["king","single"]} => props.select_val[Room Type] 
                  // note:- props.select_val key name and title key name keep both the same when you define it

                  props.title[title][1] === "select" ?

                    <Form.Select
                      onChange={(e) => { myFun(props.title[title][0], e.target.value) }}
                      aria-label="Default select example">
                      <option value="" style={{ color: "white" }}>------</option>
                      {props.select_val[title].map((option) => { return <option value={option} style={{ color: "white" }}>{option}</option> })}

                    </Form.Select>
                    :
                    props.title[title][1] === "date" ?
                      <Form.Control
                        onChange={(e) => { myFun(props.title[title][0], e.target.value, true, title) }}
                        type="date"
                        id={`${title}`} />
                      :
                      props.title[title][1] === "none" ?
                        <Form.Control type="text" style={{ visibility: "hidden" }} />
                        :
                        <Form.Control
                          onKeyUp={(e) => { myFun(props.title[title][0], e.target.value) }}
                          type={props.title[title][1] === "text" ? "text" : props.title[title][1] === "email" ? "email" : "number"}
                          id={`${title}`} />)
                }

              </th>

            })}

            {(props.print !== undefined && props.print) && <th>
              <ReactToPrint trigger={() => { return <Button id="print" className={tableStyle.print}><img style={{ width: "27%" }} src={require('../../assets/images/Printer.png')} /> Print</Button> }}
                content={() => componentRef.current}
                documentTitle='roomservice'
                pagestyle='print'
              />
            </th>}


            {/* this will cover extra space for table  */}

            {(props.extra !== undefined && props.extra !== 'none') && Object.keys(props.extra).map((ext, index) => { return <th key={index}><p className='mb-3'>{ext}</p><Form.Control type="text" style={{ visibility: "hidden" }} /></th> })}

            {props.button !== undefined && Object.keys(props.button).map((data) => {
              return ((props.permissions !== undefined && props.permissions.includes(data)) || (data !== "edit" && data !== "delete")) && <th></th>
            })}

          </tr>
        </thead>

        {/* this table only show after the page load and also tableData and newTest mean the backend data 
        condition default value is false but when user filter the data the condition value is true  */}


        {tableData.length > 0 && <tbody style={{ textAlign: "center" }}>

          {(condition ? tableData : newTest).map((value) => {

            // id or number not show in table as data

            return <tr key={value['id'] !== undefined ? value['id'] : value['number']}>

              {Object.keys(props.title).map((key) => {
                return props.title[key][0] !== 'id' && <>

                  {/* td data show with select box */}

                  {props.trSelect !== undefined && <td id={props.title[key][0]} key={props.title[key][0]}> {props.trSelect[key] !== undefined ?

                    <Form.Select
                      onChange={(e) => { props.thSelectFun(e, value) }}
                      aria-label="Default select example">
                      {props.trSelect[key].map((option) => { return <option value={option} style={{ color: "white" }} selected={convert(value, props.title[key]) === option && option}>{option}</option> })}
                    </Form.Select> :
                    convert(value, props.title[key])
                  }

                  </td>}

                  {/* if designer did't add trSelect then this will run */}

                  {props.trSelect === undefined && <td id={props.title[key][0]} key={props.title[key][0]}>{convert(value, props.title[key])}</td>}
                </>
              })}

              {(props.extra !== undefined && props.extra !== 'none') && Object.keys(props.extra).map((ext, index) => { return <td key={index}>{props.extra[ext][value['id']]}</td> })}
              {props.button !== undefined && Object.keys(props.button).map((button, i) => {
                return ((props.permissions !== undefined && props.permissions.includes(button)) || (button !== "edit" && "delete")) && <td key={i}>
                  {props.button[button] !== "none" ?
                    <Link to={`${props.button[button]}${value['id'] !== undefined ? value['id'] : value['number_id']}`} className={`btn ${(button !== "edit" || button !== "delete") ? color['prime'] : color[button]}`} type="button" >{button}</Link>
                    :
                    <button onClick={() => { props.buttonType(button, value) }} className={`btn ${(button !== "edit" && button !== "delete") ? color['prime'] : color[button]}`}>{button}</button>
                  }
                  {' '}</td>
              })}

{(props.print !== undefined && props.print) && <td></td>}

            </tr>
          })}

         

        </tbody>}

      </Table>
      <div>
        {paginationShow &&
          <ReactPaginate
            previousLabel={
              <button className={`${tableStyle['transplant-button']}`}>
                <span className={`${tableStyle['dark-blue']}`}> &lt;</span>
                <span className={`${tableStyle['light-blue']}`}>&lt;</span>
                <span className={`${tableStyle.title}`}>Previous </span>
              </button>

            }
            nextLabel={

              <button className={`${tableStyle['transplant-button']}`}>
                <span className={`${tableStyle.title}`}>Next </span>
                <span className={`${tableStyle['light-blue']}`}>&gt;</span>
                <span className={`${tableStyle['dark-blue']}`}>&gt;</span>
              </button>
            }
            className={`${tableStyle['custom-pagination']}`}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={`${tableStyle['page-num']}`}
            pageClassName={`${tableStyle['page-num']}`}
            disabledClassName={"pagination__link--disabled"}
            activeClassName={`${tableStyle.number}`}
          />
        }
      </div>
    </>
  )
}

export default Tables
