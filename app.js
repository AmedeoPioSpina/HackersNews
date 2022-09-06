const UnixConverter = (UnixTime) => {
  const milliseconds = UnixTime * 1000;
  const timeObject = new Date(milliseconds);
  const convertedTime = timeObject.toLocaleString();
  return convertedTime;
};

const addNews = (news) => {
  const divNews = document.createElement("div");
  divNews.className = "news";
  const h3 = document.createElement("h3")
  h3.textContent = news.title;
  divNews.appendChild(h3);
  const divNewsUrl = document.createElement("div");
  divNewsUrl.className = "newsUrl";
  const anchor = document.createElement("a");
  anchor.href = news.url;
  anchor.textContent = news.url;
  divNewsUrl.appendChild(anchor);
  divNews.appendChild(divNewsUrl);
  const divNewsBy = document.createElement("div");
  divNewsBy.className = "divNewsBy";
  divNewsBy.textContent = news.by;
  divNews.appendChild(divNewsBy);
  const divNewsRelease = document.createElement("div");
  divNewsRelease.className = "divNewsRelease";
  divNewsRelease.textContent = UnixConverter(news.time);
  divNews.appendChild(divNewsRelease);
  allNews.appendChild(divNews);
};

const getNews = () => {
  newsAry.forEach(idArt => {
  fetch("https://hacker-news.firebaseio.com/v0/item/" + idArt + ".json?print=pretty")
  .then((response) => response.json())
  .then((data) => {addNews(data)});
  });
};

let newsAry = [];
let allArticles;
const allNews = document.querySelector(".allNews");

const getIdNews = async() => {
    const resp = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty");
    if(!resp.ok){
      const message = resp.status;
      throw new Error(message);
    }
    const dataJSON = await resp.json();
      Object.values(dataJSON).map(value => {
        newsAry.push(value);
        console.log(value);
      });
      getNews();
}

getIdNews().catch(e => {
  console.log(e);
});