import React from 'react';
import { Component } from 'react';

class Book extends Component 
{

  render() 
  {
    return (
      <div key={this.props.id}>

        {this.props.imageUrl && (<img src={this.props.imageUrl} alt={this.props.title}/>)}
        <h5><a href={this.props.link}>{this.props.title}</a></h5>
        <p>{this.props.description}</p>
        <p>Categories: {this.props.categories}</p>

      </div>
    );
  }
}

export default Book;
