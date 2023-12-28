import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer"
import { useEffect, useState } from "react";
const Body = () => {
    const [listOfRestaurant, setlistOfRestaurant] = useState([]);
    const [filteredRestaurant, setFilteredRestaurant] = useState([]);
    const [searchText, setSearchText] = useState("");
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        const data = await fetch(
            "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
        );
        const json = await data.json();
        console.log(json);
        setlistOfRestaurant(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setFilteredRestaurant(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    }
    return listOfRestaurant.length === 0 ? <Shimmer /> : 
     (
        <div className="body">
            <div className="filter">
                <div className="search">
                    <input type="text"
                        className="search-box"
                        value={searchText}
                        onChange={(e) => {
                            setSearchText(e.target.value)
                        }}
                    />
                    <button onClick={() => {
                        console.log(searchText);
                        // fliter the restaurant card and update the UI
                        const filteredRestaurant = listOfRestaurant.filter((res) =>
                            res.name && res.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase)
                        );
                        setFilteredRestaurant(filteredRestaurant);
                        }}
                    >
                      search
                    </button>
                </div>
                <button
                    className="filter-btn"
                    onClick={() => {
                        const filteredList = listOfRestaurant.filter(
                            (res) => res.info.avgRating > 4
                            );
                            setFilteredRestaurant(filteredList);
                    }}
                >
                    Top Rated Restaurants
                </button>
            </div>
            <div className="restaurant-container">
                {filteredRestaurant.map((restaurant) => (
                    <RestaurantCard key={restaurant.info.id} resData={restaurant} />
                ))}
            </div>
        </div>
    )
}
export default Body;