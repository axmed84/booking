import Featured from '../../components/featured/Featured'
import FeaturedProbeties from '../../components/featuredproperties/FeaturesProberties'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import MailList from '../../components/mailList/MailList'
import NavBar from '../../components/navbar/NavBar'
import PropertyList from '../../components/probertylist/ProbertyList'
import "./home.css"

const Home = () => {
    return(
        <div>
        <NavBar />
        <Header />

        <div className="homecontainer">
            <Featured />
            <h1 className="hometitle">Browse by proberty type</h1>
            <PropertyList />
            <h1 className="hometitle">Home guests love</h1>
            <FeaturedProbeties />
            <MailList />
            <Footer />
        </div>
        </div>
    )
}

export default Home