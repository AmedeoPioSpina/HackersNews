let target;

fetch("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty")
  .then((response) => response.json())
  .then((data) => {target = data; console.log(data)});

let index = 5467;

fetch("https://hacker-news.firebaseio.com/v0/item/"+ index + ".json?print=pretty")
    .then((response) => response.json())
    .then((data) => console.log(data));