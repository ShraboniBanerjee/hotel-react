import React, { Component } from 'react'
import load from  '../assets/images/loading.gif'

class Loading extends Component {
    constructor(props){
        super(props);

        this.state = {}
    }
    render() {
    return (
      <div className='text-center'>
        <img style={{marginLeft:'1200px !important;'}} src={load} alt="loading" />
      </div>
    )
  }
}

export default Loading;
