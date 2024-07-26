import React, { useState } from "react";
import NavBar from "../../components/navbar/NavBar";
import Header from "../../components/header/Header";
import './list.css'
import { useLocation } from "react-router-dom";
import {format} from 'date-fns'
import { DateRange } from "react-date-range";
import SearchItem from "../../components/Searchitem/SearchItem";
import useFetch from "../../hooks/useFetch";

const List = () => {
    const location = useLocation();
    const [destination, setDestination] = useState(location.state.destination)
    const [dates, setDates] = useState(location.state.dates)
    const [opendate, setOpenDate] = useState(false)
    const [options, setOptions] = useState(location.state.options)
    const [min, setMin] = useState(undefined)
    const [max, setMax] = useState(undefined)

    const { data, loading, error, reFetch } = useFetch(
        `http://localhost:8000/api/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`
    );

    const handleClick = () => {
        reFetch
    }
    
    return(
        <div>
            <NavBar />
            <Header type="list"/>
            <div className="listcontainer">
                <div className="listwrapper">
                    <div className="listsearch">
                        <h1 className="lstitle">Search</h1>
                        <div className="lsitem">
                            <label>Destination</label>
                            <input placeholder={destination} type="text"/>
                        </div>
                        <div className="lsitem">
                            <label>Check-in date</label>
                            <span onClick={()=>setOpenDate(!opendate)}>{`${format(dates[0].startDate, "M/d/yyyy")} to 
                            ${format(dates[0].endDate, "M/d/yyyy")}`}</span>
                            { opendate &&( <DateRange
                            onChange={item=>setDates([item.selection])} 
                            minDate={new Date()}
                            ranges={dates} />)}
                        </div>
                        <div className="listitem">
                            <label>Options</label>
                            <div className="isoptons">
                            <div className="isoptionistem">
                                <span className="isoptiontext">
                                    Min price <small>per night</small>
                                </span>
                                <input type="number" onChange={e=>setMin(e.target.value)} className="isoptioninput" />
                            </div>
                            <div className="isoptionistem">
                                <span className="isoptiontext">
                                    Max price <small>per night</small>
                                </span>
                                <input type="number" onChange={e=>setMax(e.target.value)} className="isoptioninput" />
                            </div>
                            <div className="isoptionistem">
                                <span className="isoptiontext">
                                    Adult 
                                </span>
                                <input type="number" min={1} className="isoptioninput" placeholder={options.adults} />
                            </div>
                            <div className="isoptionistem">
                                <span className="isoptiontext">
                                    Children
                                </span>
                                <input type="number" min={1} className="isoptioninput" placeholder={options.children} />
                            </div>
                            <div className="isoptionistem">
                                <span className="isoptiontext">
                                    Room
                                </span>
                                <input type="number" min={1} className="isoptioninput" placeholder={options.room} />
                            </div>
                            </div>
                        </div>
                        <button onClick={handleClick}>Search</button>
                    </div>
                    <div className="listresult">
                        {loading ? "loading" : <>
                        {data.map(item=>(
                        <SearchItem item={item} key={item._id}/>
                        ))}
                        </>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default List