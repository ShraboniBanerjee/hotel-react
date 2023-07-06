import React from "react";
import Table from "../../src/components/table/Table";
import adminLayout from "../hoc/adminLayout";
import Datatable from "../../src/components/datatable/Datatable"


class AdminBlankPage extends React.Component {
    constructor(props){
        super(props);

        this.state = {}
    }

    render(){
        return <>
            <p>Room Services Available</p>
            <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div>
      
    {/*<div className="list">
      <div className="listContainer">
        <Datatable/>
      </div>
    </div>
    <p></p>*/}

       </>
    }
}

export default adminLayout(AdminBlankPage);