import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import RoleTable from './RoleTable';

const RoleSearch = ({url, setMessage}) => {
    const [searchData, setSearchData] = useState();
    const {register, handleSubmit, reset } = useForm();
    const onSubmit = (searchData) => {
        if (localStorage.getItem("logintoken")) { 
            const property = localStorage.getItem("property")
            const token = (JSON.parse(localStorage.getItem("logintoken")))
             const api = (`${url}permission_pages/${property}/`);
             fetch(api, {
              method: 'POST',
              headers: {
                'content-type': 'application/json',
                'Authorization': "Bearer " + token['token']
              },
      
              body: JSON.stringify(
              searchData
              )
             })
             .then(res => res.json())
             .then(data => setSearchData(data.users_list))
          }
          reset();
    }

return (
<div>


<div>
<RoleTable url={url} searchData={searchData} setMessage={setMessage}/>
</div>
 </div>
    );
};

export default RoleSearch;