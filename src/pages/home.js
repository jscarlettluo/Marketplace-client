import React, { Component } from 'react'
import Grid from '@material-ui/core/grid';
import Listing from '../components/Listing';


const axios = require('axios');

class Home extends Component {
    state = {
        listings: null
    };
    componentDidMount() {
        axios.get('/listings')
            .then(res => {
                console.log(res.data);
                this.setState({
                    listings: res.data
                })
            })
            .catch(err => {
                console.error(err)
            });
    };
    render() {
        let showListing = this.state.listings ? (this.state.listings.map((listing) => <Listing key={listing.listingId} listing={listing}/>)) : (<p>Loading...</p>);
        return (
            <Grid container spacing={3}>
                <Grid item sm={8} xs={12}>
                    {showListing}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <p>Some profile</p>
                </Grid>
            </Grid>
        );
    }
}

export default Home
