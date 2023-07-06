import React from "react";
import adminLayout from "../../hoc/adminLayout";
import Datatable from "../../../src/components/datatable/Datatable"


class AdminUserPage extends React.Component {
    constructor(props){
        super(props);

        this.state = {}
    }

    render(){
        return <>
            <p>Users Available</p>
            
      
    <div className="list">
      <div className="listContainer">
        <Datatable/>
      </div>
    </div>
 
       </>
    }
}

export default adminLayout(AdminUserPage);