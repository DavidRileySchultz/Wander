import React, { Component } from 'react';
import { connect } from 'react-redux';


export class TripDetails extends Component {
    constructor() {
        super()

        this.state = {
            friendSearch: '',
            email: '',
            friendEmails: [],
            name: '',
        }
    }

    componentDidMount() {
        var tripId = this.props.match.params.tripId
        this.props.getTrip(tripId)
    }

    handleChange = event => {
        const search = event.target.value
        this.setState({email: search})
    }

    addFriend = event => {
        event.preventDefault()
            if(this.state.email) {
                this.setState({friendEmails: [...this.state.friendEmails, this.state.email
                ]})
            this.props.getUsers({
                email: this.state.email,
                id: Number(this.props.match.params.tripId),
                organizer: false,
                joined: false
            })
            }
        this.setState({email: ''})
    }

    render() {
        const { name } = this.state
        const isEnabled =
            name.length > 0;
        const { friendEmails } = this.state
        return (
            <div className="create-trip-container">
                <div className="createTrip-inner-container">
                
                </div>
            </div>
        )
    }
}