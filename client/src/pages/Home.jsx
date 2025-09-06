import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Testimonials from "../components/Testimonials";
import Hero from "./Hero";
import WhyChooseUs from "./WhyChooseUs";
import ElegantAccordion from "./Accordion";
import BookingForm from "../components/BookingForm";
import Banner from "./Banner";
import OffersPage from "./OffersPage";
import TourDetailsPage from "./TourDetailsPage";

export default function Home() {
  // const [tours, setTours] = useState([]);
  // const [cars, setCars] = useState([]);

  // // Filters
  // const [search, setSearch] = useState("");
  // const [minPrice, setMinPrice] = useState("");
  // const [maxPrice, setMaxPrice] = useState("");
  // const [type, setType] = useState("");

  // Fetch data on mount
  // useEffect(() => {
  //   fetchTours();
  //   fetchCars();
  // }, []);

  // const fetchTours = async () => {
  //   try {
  //     const res = await axios.get("http://localhost:5000/api/tours", {
  //       params: { search, minPrice, maxPrice, type },
  //     });
  //     console.log("Tours API response:", res.data);
  //     setTours(res.data.data || []); // ✅ ensures array
  //   } catch (err) {
  //     console.error("Error fetching tours:", err.message);
  //     setTours([]);
  //   }
  // };

  // const fetchCars = async () => {
  //   try {
  //     const res = await axios.get("http://localhost:5000/api/cars");
  //     console.log("Cars API response:", res.data);
  //     setCars(res.data.data || []); // ✅ ensures array
  //   } catch (err) {
  //     console.error("Error fetching cars:", err.message);
  //     setCars([]);
  //   }
  // };

  return (
    <div className="">
      <Helmet>
        <title>Northeast Travels | Explore Tours & Car Rentals</title>
        <meta
          name="description"
          content="Book tours and car rentals easily with Northest Travels."
        />
        <meta
          name="keywords"
          content="tours, travel, cars, rentals, holiday packages, guwahati, meghalaya tour, cherapunjee"
        />
      </Helmet>

      {/* Hero Section */}
      <Banner />
      <OffersPage />
      <TourDetailsPage />
      <Hero />

      <WhyChooseUs />

      <ElegantAccordion />
    </div>
  );
}
