import React, { Component } from 'react';
import axios from 'axios';
import '../style.scss';

// used to access a location acquired from google, given the latitude and longitude of the member
const GOOGLE = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
const API_KEY = '&key=AIzaSyAvS_jJkCNolyHgRRF15VFGwdlWkK7nYTA';

class MemberTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = { address: null };

    this.renderAddress = this.renderAddress.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  // use axios call to access member location from the latitude and longitude given in the json file
  componentDidMount() {
    axios.get(`${GOOGLE}${this.props.member.lat_long[0]},${this.props.member.lat_long[1]}${API_KEY}`).then((response) => {
      this.setState({ address: response.data.results[1].formatted_address });
    })
    .catch((error) => {
      this.setState({ address: null });
    });
  }

  // render the address once axios has received it
  renderAddress() {
    if (this.state.address != null) {
      return (
        <div className="address">From: {this.state.address}</div>
      );
    } else {
      return <div />;
    }
  }

// template for all of the DALI members
  render() {
    return (
      <div className="member">
        <div className="image">
          <img src={`http://mappy.dali.dartmouth.edu/${this.props.member.iconUrl}`} alt={this.props.member.name} />
        </div>
        <div className="member-info">
          <div className="name">{this.props.member.name}</div>
          <div className="tagline">{this.props.member.message}</div>
          {this.renderAddress()}
        </div>
      </div>
    );
  }
}

export default MemberTemplate;
