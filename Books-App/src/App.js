import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import './App.css';
import Book from './Book';


class App extends Component
{
  constructor(props)
  {
    super(props);

    this.state = {
      bookList: [],
      isLoading: false,
      searchTerm: "Harry Potter",
      searchMessage: ""
    }
  }

  componentDidMount()
  {
    this.getData();
  }

  handleChange = (e) =>
  {
    this.setState({ [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });
  }

  handleButtonClicked = (e) =>
  {
    e.preventDefault();

    if (this.state.searchTerm)
    {
      this.setState({ isLoading: true, searchTerm: this.state.searchTerm });
      this.getData();
    }
  }

  getData = () =>
  {
    const term = this.state.searchTerm;

    const promise = axios.get(`https://www.googleapis.com/books/v1/volumes?q=${term}`);
    promise.then((response) =>
    {
        this.setState({ isLoading: false });

        if (response.data.totalItems === 0)
        {
          this.setState({
            bookList: [],
          });
        }
        else
        {
          this.setState({
            bookList: response.data.items,
          });
        }
      }
    );
  }

  render()
  {
    return (
      <div className="App">
        <h1>Books App</h1>

        <form onClick={this.handleButtonClicked}>
          <input
            id="searchTerm"
            name="searchTerm"
            type="text"
            value={this.state.searchTerm}
            onChange={this.handleChange} />
          <button type="submit">Go!</button>
        </form>

        <div className="bookList">
          {this.state.bookList.map(book => (
            <Book key={book.id}
                      id={book.id}
                      title={book.volumeInfo.title}
                      link={book.volumeInfo.previewLink}
                      description={book.volumeInfo.description}
                      imageUrl={book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.smallThumbnail }
                      categories={book.volumeInfo.categories} />
          ))}
        </div>
      </div>
    );
  }
}
export default App;
