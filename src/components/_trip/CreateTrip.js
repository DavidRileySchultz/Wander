import React, { Component } from 'react';

class CreateTrip extends Component {

    submitTrip = (event) => {
        event.preventDefault();
        var trip = {
            name: event.target.tripName.vaue,
        }
        this.props.createTrip(trip)
    }

    render() {
        return (
            <div className="createTrip-container">
            <div className="createTrip-inner-container">
            <h1 className="capitalized-header">Welcome</h1>
            <h2>Start a new Trip!</h2>
                <form onSubmit={this.submitTrip}>
                <input
                    id="tripName"
                    name="tripName"
                />
                <h3>We'll get more details from you once you create your trip</h3>
                <button className="button center-loading">Create your trip!</button>
                </form>
            </div>
            </div>
        )
    }
}

const mapState = (state) => {
    return {
        user: state.user
    }
}
const mapDispatch = (dispatch) => {
    return {
        createTrip: (newTrip) => {
            return{
                createTrip: (newTrip) => {
                    return dispatch(postTrip(newTrip))
                    .then(trip => {
                        var tripId = trip.trip.id
                        history.pushState(`/trips/tripdetailsetup/${tripId}`)
                    })
                }
            }
        }
    }
}

export default connect(mapState, mapDispatch)(CreateTrip)