import React from 'react';
import { Link } from 'react-router-dom';
import PropertySlideShow from './PropertySlideShow';

import PropertyMap from './PropertyMap';

const PropertyDetails = ({propertyData, handleSubmit, onSubmit, register, msg}) => {
  const {hotel_name, website_name, address, description, image_1, image_2, image_3, image_4} = propertyData;
  return (
    <div>
        <div className="d-flex flex-column justify-content-center align-items-center gap-1">
        <h1 className="fs-4">{`${hotel_name} properties`}</h1>  
        <div>
          <span>
            <i class="fa fa-globe" aria-hidden="true"></i>
          </span>
          <b className="p-2">{website_name}</b>
        </div>
        <p>
          <span>
            <i class="fa fa-map-marker me-1" aria-hidden="true"></i>
          </span>
          {address}
        </p>
      </div>
      <p className="lh-lg">{description}</p>
      <div className='d-flex justify-content-end'>
      <Link className='btn btn-info p-1' to="/edit-property">Edit Property</Link>
      </div>
    <div>
      {msg && <p className='alert alert-success w-25'>{msg}</p>}
    </div>
      <div className='pt-5'>
    <PropertySlideShow image_1={image_1} image_2={image_2} image_3={image_3} image_4={image_4}/>
      </div>
      <div className="d-flex justify-content-center align-items-center py-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="fileUpload" className="btn btn-warning me-2">Upload Photo</label>
          <input type="file" id="fileUpload" accept='image/*' {...register("file")} hidden />
          <button className="btn btn-primary" type="submit">Save</button>
        </form>
      </div>

      {/* Map */}
      <div className="py-5">
        <PropertyMap/>
        {/*For Backup: <GoogleMap/> */}
      </div>
    </div>
  );
};

export default PropertyDetails;