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

export default App;
