import React, {useState} from "react";
import { useForm } from "react-hook-form";
import adminLayout from "../../hoc/adminLayout";
import Loading from "../../images/Loading";
import usePropertyData from "./Hooks/usePropertyData";
import PropertyDetails from "./PropertyDetails";



const Property = ({ url }) => {

  //custom hook to get propertydata
  const [propertyData, loading] = usePropertyData();
  const [msg, setMsg] = useState('');

    //Upload Images
    const {register, handleSubmit} = useForm();
    const onSubmit = (data) => {
      let image = data.file[0]
      let formData = new FormData();
       formData.append("image_1", image);
       
      if (localStorage.getItem("logintoken")) {
        const property = localStorage.getItem("property");
        const token = JSON.parse(localStorage.getItem("logintoken"));
        const api = `${url}hotel_description/${property}`;
        fetch(api, {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + token["token"],
          },
          body: formData
        })
          .then((res) => res.json())
          .then((data) => console.log("Imagedata", data));
          setMsg('Image uploaded successfully');
      }
    }

  return (
    <div>
       {
        loading ? <Loading/>
        :     
        <PropertyDetails propertyData={propertyData} 
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        msg={msg} 
         />
       }
    </div>
  );
    
};

export default adminLayout(Property);
