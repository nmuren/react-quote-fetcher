import React from "react";

const quoteAPI = `https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json`;

//async/await based Request
/*const QuoteFetcher = quoteAPI => {
  const request = async () => {
    const response = await fetch(quoteAPI);
    const json = await response.json();
    const data = json.quotes;
    data.map(item => quoteList.push({ text: item.quote, author: item.author }));
  };
  request();
};
QuoteFetcher(quoteAPI);*/

//Promised-based Request
/*const QuoteFetcher = quoteAPI => {
  fetch(quoteAPI)
    .then(response => response.json())
    .then(data => {
      data.quotes.map(item =>
        quoteList.push({ text: item.quote, author: item.author })
      );
    });
};
QuoteFetcher(quoteAPI);*/

export default class App extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      quote: ``,
      author: ``,
      tweet: ``,
      quoteList: [],
      dataLoaded: false
    };
    this.newQuote = this.newQuote.bind(this);
  }

  componentDidMount() {
    this.loadData(quoteAPI);
  }

  loadData(quoteAPI) {
    fetch(quoteAPI)
      .then(response => response.json())
      .then(data => {
        this.setState({
          quoteList: data.quotes,
          dataLoaded: true
        });
      });
  }

  newQuote() {
    //console.log("in newQuote", this.state.quoteList.length);
    try {
      const quote = this.state.quoteList[
        Math.floor(Math.random() * this.state.quoteList.length)
      ];
      this.setState({
        quote: quote.quote,
        author: quote.author
      });
      this.prepareTweet();
    } catch (err) {
      console.log("There has been an error with the newQuote() generation!");
    }
  }

  prepareTweet() {
    this.setState({
      tweet:
        `https://twitter.com/intent/tweet?hashtags=quotes&text=` +
        encodeURIComponent('"' + this.state.quote + '" ' + this.state.author)
    });
  }

  render() {
    return (
      <div className="container">
        {this.state.author === `` ? this.newQuote() : null}
        <div id="quote-box">
          {!this.state.dataLoaded ? (
            <p id="text" className="mb-0">
              Why don't you try a new quote ;)
            </p>
          ) : (
            <blockquote className="blockquote text-center">
              <p id="text" className="mb-0">
                {this.state.quote}
              </p>
              <footer id="author" className="blockquote-footer">
                {this.state.author}
              </footer>
            </blockquote>
          )}
          <button
            id="new-quote"
            className="btn btn-primary m-1"
            onClick={this.newQuote}
          >
            New Quote
          </button>
          {this.state.tweet === null || this.state.tweet.length === 63
            ? //`https://twitter.com/intent/tweet?hashtags=quotes&text=%22%22%20`
              this.prepareTweet()
            : null}
          <a
            id="tweet-quote"
            className="btn btn-primary m-1"
            title="Tweet this quote!"
            target="_blank"
            rel="noopener noreferrer"
            href={this.state.tweet}
          >
            Tweet <i className="fab fa-twitter" />
          </a>
        </div>
      </div>
    );
  }
}
