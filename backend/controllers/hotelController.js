import Hotel from "../models/Hotel.js"

export const createHotel = async (req,res,next) => {
    const newHotel = new Hotel(req.body)
try {
    const savedHotel = await newHotel.save()
    res.status(200).json(savedHotel)
} catch (err) {
    next(err)
}
}
export const updateHotel = async (req,res,next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(
            req.params.id, {$set: req.body},{new: true})
        res.status(200).json(updatedHotel)
    } catch (err) {
        next(err)
    }
}
export const deleteHotel = async (req,res,next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndDelete(
            req.params.id
        )
        res.status(200).json("Hotel Has Been Deleted")
    } catch (err) {
        next(err)
    }
}
export const getHotel = async (req,res,next) => {
    try {
        const hotel = await Hotel.findById(
            req.params.id
        )
        res.status(200).json(hotel)
    } catch (err) {
        next(err)
    }
}
// Code-ka Macalinka lkn iima Shaqeen
// export const getHotels = async (req, res, next) => {
//     const { min, max, ...others } = req.query;
//     try {
//       const hotels = await Hotel.find({
//         ...others,
//         cheapestPrice: { $gt: min | 1, $lt: max || 999 },
//       }).limit(req.query.limit);
//       res.status(200).json(hotels);
//     } catch (err) {
//       next(err);
//     }
//   };

export const getHotels = async (req, res, next) => {
    const { min, max, limit, ...others } = req.query;

    // Convert min and max to numbers with default values
    const minPrice = Number(min) || 1;
    const maxPrice = Number(max) || 999;

    // Convert limit to a number
    const queryLimit = Number(limit);

    // Debugging logs
    // console.log("Received query parameters:", req.query);
    // console.log("Parsed parameters: min =", minPrice, "max =", maxPrice);
    // console.log("Limit:", queryLimit);
    // console.log("Other parameters:", others);

    try {
        // Build the query object
        const query = {
            ...others,
            cheapestPrice: { $gt: minPrice, $lt: maxPrice }
        };

        // console.log("Constructed MongoDB query:", query);

        // Fetch hotels from the database with limit
        const hotels = await Hotel.find(query).limit(queryLimit || 10);
        // console.log("Query result:", hotels);

        res.status(200).json(hotels);
    } catch (err) {
        console.error("Error fetching hotels:", err);
        next(err);
    }
};
export const countByCity = async (req,res,next) => {
    const cities = req.query.cities.split(",")
    try {
        const list = await Promise.all(cities.map(city=>{
            return Hotel.countDocuments({city:city})
        }))
        res.status(200).json(list)
    } catch (err) {
        next(err)
    }
}
export const countByType = async (req,res,next) => {
    try {
    const hotelCount = await Hotel.countDocuments({type:"hotel"})
    const apartmentCount = await Hotel.countDocuments({type:"apartment"})
    const resortCount = await Hotel.countDocuments({type:"resort"})
    const villaCount = await Hotel.countDocuments({type:"villa"})
    const cabinCount = await Hotel.countDocuments({type:"cabin"})
    
        res.status(200).json([
            { type: "hotel", count: hotelCount },
            { type: "apartments", count: apartmentCount },
            { type: "resorts", count: resortCount },
            { type: "villas", count: villaCount },
            { type: "cabins", count: cabinCount }
        ])
    } catch (err) {
        next(err)
    }
}