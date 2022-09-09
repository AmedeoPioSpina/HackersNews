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
  const allNews = document.querySelector(".allNews");
  allNews.appendChild(divNews);
};

const getNews = (idsAry) => {
  const newsAry = []
  Object.values(idsAry).map((news) => {
    console.log(idsAry);
    fetch("https://hacker-news.firebaseio.com/v0/item/" + idnews + ".json?print=pretty")
    .then((res) => res.json())
    .then((data) => {newsAry.push(data); console.log(newsAry)})
    .catch((err) => console.log(err))
  });
  console.log(newsAry);
  return newsAry;
}

const fetchIdNews = () => {
  fetch("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty")
  .then((res) => res.json())
  .then((data) => {return data})
  .catch((err) => console.log(err))
}

(async () => {

  const idsNewsAry = await fetchIdNews();
  const allNewsAry = await getNews(idsNewsAry);
  addNews(allNewsAry);

})();