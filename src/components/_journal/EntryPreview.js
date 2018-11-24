import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Card, Image, Button } from 'semantic-ui-react'
import auth from '../../auth.js';
import api from '../../api.js';


class EntryPreview extends Component {
  constructor() {
    super();
    this.state = { imageDeleted: false }
  }

  displayDate = timeStamp => {
    let newDateArray = timeStamp.split('T');
    let justDate = newDateArray[0];
    return justDate;
  }

  handleDelete = (event) => {
    console.log('clicked', this.props.data.id, auth.getToken());
    api.requestDeleteEntry(this.props.data.id, auth.getToken())
      .then(this.setState(st => (
        { imageDeleted: true }
      )))
  }

  render() {
    return (
      <Grid.Column>
        {this.state.imageDeleted ? <Card.Header>Entry successfully deleted. </Card.Header> :
          <Card>
            <Link to={`/dashboard/readentry/${this.props.data.id}`}>
              <Image src={this.props.data.thumbnail_image_url} height='226px' width='290px' />
            </Link>
            <Card.Content>
              <Card.Header>
                {this.props.data.title}
              </Card.Header>
              <Card.Meta>
                <span className='date'>
                  {this.displayDate(this.props.data.createdAt)}
                </span>
              </Card.Meta>
              <Card.Content extra>
                <Button onClick={this.handleDelete} icon='trash' size='small' ></Button>
              </Card.Content>
            </Card.Content>
          </Card>
        }
      </Grid.Column>
    );
  }
}

export default EntryPreview;
