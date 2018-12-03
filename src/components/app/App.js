import React, { Component } from 'react';
import './App.scss';
import superagent from 'superagent';

const apiURL = 'http://localhost:3000';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      decks: [],
    }
  }

  fetchDecks = () => {
    superagent.get(`${apiURL}/content`)
      .then(response => {
        const decks = JSON.parse(response.text);
        this.setState({ decks });
      })
      .catch(console.error)
  }

  componentDidMount() {
    this.fetchDecks();
  }

  render() {
    console.log(this.state);
    return (
      <React.Fragment>
        <h1>Welcome. Take a look at my decks</h1>
        {
          this.state.decks.map((deck, i) => (
          <section className="deck" key={i}>
            <h2>{ deck.deckTitle }</h2>
            <ul>
            {
              deck.records.map((card, i) =>
                <li key={i} className="card">
                  <h3>{ card.title }</h3>
                  <p>{ card.copy }</p>
                  <ul>
                    {
                      card.links.map((link, i) => 
                        <li key={i}><a href={link.href}>{link.title}</a></li>
                      )
                    }
                  </ul>
                  <img 
                    src={ card.media.href }
                    alt={ card.media.alt }
                    />
                  <h4>{ card.media.title }</h4>
                </li>
              )
            }
            </ul>
          </section>)
          )
        }
      </React.Fragment>
    );
  }
}

// {title: "Card 1", copy: "Card 1 Copy Here...", media: {…}, links: Array(2)}

// links: Array(2)
// 0: {type: "primary", title: "Click Me", href: "https://www.foo.com"}
// 1: {type: "secodary", title: "Not Me", href: "https://www.bar.com"}
// length: 2
// __proto__: Array(0)
// media:
// alt: "This is a picture"
// href: "https://placehold.it/200x100"
// title: "This is the title of the picture"

export default App;
