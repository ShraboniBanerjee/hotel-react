import { useState, useEffect } from "react";


const usePropertyData = () => {

    const [propertyData, setpropertyData] = useState({});
    const [loading, setLoading] = useState(false);

    console.log("propertyData", propertyData);
  
    //Get property Details from API
    useEffect(() => {
      const getData = async() => {
          setLoading(true);
        if (localStorage.getItem("logintoken")) {
          const property =  localStorage.getItem("property");
          const token = JSON.parse(localStorage.getItem("logintoken"));
          const api = `https://django.rhgl9cf0lt9s2.ap-south-1.cs.amazonlightsail.com/hotel_description/${property}`;
          await fetch(api, {
            method: "GET",
            headers: {
              "content-type": "application/json",
              Authorization: "Bearer " + token["token"],
            },
          })
            .then((res) => res.json())
            .then((data) => {
              setpropertyData(data)
            });
            setLoading(false);
        }
      }
      getData();
    }, []);

    return [propertyData, loading]
}

export default usePropertyData;

