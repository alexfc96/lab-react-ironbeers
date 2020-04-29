import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Axios from 'axios';

const STATUS = {
  ISLOADING : 'loading',
  ISLOADED : 'loaded',
  ERROR : 'error'
}

class ShowInfoBeer extends Component{

  state = {
    status : STATUS.ISLOADING,
    beerSelected : ""
  }

  showInfoBeer(){
    const {beerSelected} = this.state;
    return <div>
            <div className="show-all-info-beer">
              <img className="img-of-beer" src={beerSelected.image_url} alt={beerSelected.name} />
              <div className="info-beer">
                <Link to={beerSelected._id}><h3>{beerSelected.name}</h3></Link>
                {beerSelected.attenuation_level} of attenuation
                <h5>{beerSelected.tagline}</h5>
                {beerSelected.description} 
                <p>Created by: {beerSelected.name}</p>
                <p>Contributed by: {beerSelected.contributed_by}</p>
              </div>
            </div>
            <hr/>
          </div>
  }

  componentDidMount(){
    if(this.props.beer){
      this.setState({
        beerSelected: this.props.beer,
        status : STATUS.ISLOADED
      })
    } else {
      const idBeer = this.props.match.params.id;
      Axios.get('https://ih-beers-api2.herokuapp.com/beers')
      .then(response =>{
        const selectBeer = response.data.find((beer => beer._id === idBeer))
        this.setState({
          beerSelected: selectBeer,
          status : STATUS.ISLOADED
        })
      })
      .catch(error =>{
        this.setState({
          status : STATUS.ERROR
        })
      })
    }

  }

  render(){
    // const {beer} = this.props
    const {status} = this.state

    return(
      <div>
        {status === 'loading' && <h3>Loading data</h3> }
        {status === 'loaded' && this.showInfoBeer()}
      </div>
    )
  }
}

export default ShowInfoBeer