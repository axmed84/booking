import React, { useContext, useState } from "react";
import './hotel.css'
import NavBar from "../../components/navbar/NavBar";
import Header from "../../components/header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faLocation, faXmark } from "@fortawesome/free-solid-svg-icons";
import Footer from "../../components/footer/Footer";
import MailList from "../../components/mailList/MailList";
import useFetch from "../../hooks/useFetch";
import { useLocation } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";

const Hotel = () => {
  const location = useLocation ()
  const id = location.pathname.split("/")[2]
  const [slideNumber, setSlideNumber] = useState(0)
  const [open, setOpen] = useState(false)

  const { data, loading, error } = useFetch(`http://localhost:8000/api/hotels/find/${id}`)

  const { dates, options } = useContext(SearchContext)

  const MILISECONDS_PER_DAY = 1000 * 60 * 60 * 24
  function dayDifference(date1,date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILISECONDS_PER_DAY)
    return diffDays
  }

  const days = (dayDifference(dates[0].endDate, dates[0].startDate));

  console.log(dates)

      const handleOpen = (i) => {
        setSlideNumber(i);
        setOpen(true);
      }

      const handlemove = (direction => {
        let newSlideNumber;
        if(direction==="l"){
          newSlideNumber = slideNumber === 0 ? 5 : slideNumber-1
        }else{
          newSlideNumber = slideNumber === 5 ? 0 : slideNumber+1
        }

        setSlideNumber(newSlideNumber)
      })
    return(
        <div>
            <NavBar/>
            <Header type="list"/>
            { loading ? ("loading") : (<div className="hotelcontainer">
             {open && <div className="slider">
             <FontAwesomeIcon icon={faXmark} className="close" onClick={()=>setOpen(false)}/>
             
             <div className="sliderwrapper">
             <FontAwesomeIcon icon={faArrowLeft} className="arrow" onClick={()=>handlemove("l")}/>
              <img src={data.photos[slideNumber]} alt="" className="sliderimg" />
              <FontAwesomeIcon icon={faArrowRight} className="arrow" onClick={()=>handlemove("r")}/>
             </div>
            
              </div>}
                <div className="hotelwrapper">
                    <button className="booknow">Reserve or Book Now</button>
                    <h1 className="hoteltitle">{data?.name}</h1>
                    <div className="hoteladdress">
                        <FontAwesomeIcon icon={faLocation}/>
                        <span>{data?.address}</span>
                    </div>
                    <span className="hotelDistance">
            Excellent location – {data.distance} from center
          </span>
          <span className="hotelPriceHighlight">
            Book a stay over {data?.cheapestPrice} at this property and get a free airport taxi
          </span>
          <div className="hotelImage">
            {data.photos?.map((photo, i)=>(
                <div className="hotelimgwrapper">
                    <img onClick={()=> handleOpen(i)} src={photo} alt="" className="hotelImg" />
                </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsText">
            <h1 className="hotelTitle">{data?.title}</h1>
              <p className="hotelDesc">
                {data?.desc}
              </p>
            </div>
            <div className="hotelDetailsPrice">
            <h1>Perfect for a {days}-night stay!</h1>
              <span>
                Located in the real heart of Krakow, this property has an
                excellent location score of 9.8!
              </span>
              <h2>
                <b>${days * data?.cheapestPrice * options.room}</b> ({days} nights)
              </h2>
              <button>Reserve or Book Now!</button>
            </div>
          </div>
          <MailList/>
          <Footer/>
                </div>
            </div>)}
        </div>
    )
}

export default Hotel