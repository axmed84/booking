import React, { useContext, useState } from "react";
import "./header.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faCar, faPerson, faPlane, faTaxi } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { DateRange } from "react-date-range";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {format} from 'date-fns'
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";

const Header = ({type}) => {
    const [destination, setDestination] = useState("")
    const [openDate, setOpenDate] = useState(false)
    const [dates, setDates] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
      ]);

      const [openOptions, setOpenOptions] = useState(false)
      const [options, setOptions] = useState({
        adult:1,
        children:0,
        room:1,
      })

      const navigate = useNavigate()

      const handeOption = (name, operation) => {
        setOptions(prev=>{return {
            ...prev, [name]: operation === "i" ? options[name] +1 : options[name] -1,
        }})
      }

      const {dispatch} = useContext(SearchContext)

      const handeSearch = () => {
        dispatch({type:"NEW_SEARCH",payload:{destination, dates, options}})
        navigate("/hotels", {state: {destination, dates, options}})
      }
    return(
        <div className="header">
            <div className={type === "list" ? "headercontainer listmode" : "headercontainer" }>
     <div className="headerlist">
        <div className="icons active">
        <FontAwesomeIcon icon={faBed} />
        <span>Stays</span>
        </div>
        <div className="icons">
        <FontAwesomeIcon icon={faPlane} />
        <span>Flights</span>
        </div>
        <div className="icons">
        <FontAwesomeIcon icon={faCar} />
        <span>Car Rentals</span>
        </div>
        <div className="icons">
        <FontAwesomeIcon icon={faBed} />
        <span>Attractions</span>
        </div>
        <div className="icons">
        <FontAwesomeIcon icon={faTaxi} />
        <span>Aiport taxis</span>
        </div>
     </div>
     { type !== "list" &&
        <>

     <h1 className="headertitle">A lifetime discounts? It's Genius</h1>
     <p className="headerdesc">
        Get rewarded for your travels - unlock instant saving of 10% or
        more with a free Lamabooking account
     </p>
     <button className="headerbtn">Signin/Register</button>
     <div className="headersearch">
        <div className="headersearchitem">
        <FontAwesomeIcon icon={faBed} className="headericon"/>
            <input type="text" placeholder="where are you going"
            className="headersearchinput"
            onChange={e=>setDestination(e.target.value)}
            />
        </div>
        <div className="headersearchitem">
        <FontAwesomeIcon icon={faCalendar} className="headericon"/>
            <span onClick={() =>setOpenDate(!openDate)} className="headersearchtext">{`${format(dates[0].startDate, "M/d/yyyy")} to ${format(dates[0].endDate, "M/d/yyyy")}`}</span>
         { openDate && <DateRange
            editableDateInputs={true}
            onChange={item => setDates([item.selection])}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            ranges={dates}
            className="date"
            minDate={new Date()}
            />}
        </div>
        <div className="headersearchitem">
        <FontAwesomeIcon icon={faPerson} className="headericon"/>
        <span onClick={()=>setOpenOptions(!openOptions)} className="headersearchtext">{`${options.adult} adult . ${options.children} children . ${options.room} room`}</span>
        {openOptions &&<div className="options">
            <div className="optionitem">
                <span className="optiontext">Adult</span>
                <div className="optioncounter">
                    <button
                    disabled={options.adult <= 1}
                     className="optioncounterButton" onClick={()=>handeOption("adult", "d")}>-</button>
                    <span className="optioncounterNumber">{options.adult}</span>
                    <button className="optioncounterButton" onClick={()=>handeOption("adult", "i")}>+</button>
                    </div>
            </div>
            <div className="optionitem">
                <span className="optiontext">Children</span>
                <div className="optioncounter">
                    <button 
                    disabled={options.children <=1}
                    className="optioncounterButton" onClick={()=>handeOption("children", "d")}>-</button>
                    <span className="optioncounterNumber">{options.children}</span>
                    <button className="optioncounterButton" onClick={()=>handeOption("children", "i")}>+</button>
                    </div>
            </div>
            <div className="optionitem">
                <span className="optiontext">Room</span>
                <div className="optioncounter">
                    <button 
                    disabled={options.room <= 1}
                    className="optioncounterButton" onClick={()=>handeOption("room", "d")}>-</button>
                    <span className="optioncounterNumber">{options.room}</span>
                    <button className="optioncounterButton" onClick={()=>handeOption("room", "i")}>+</button>
                    </div>
            </div>
        </div>}
        </div>
        <div className="headersearchitem">
        <button className="headerbtn" onClick={handeSearch}>Search</button>
        </div>
     </div></>}
     </div>
        </div>
    )

}
export default Header