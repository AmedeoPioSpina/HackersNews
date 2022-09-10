const UnixConverter = (UnixTime) => {
  const milliseconds = UnixTime * 1000;
  const timeObject = new Date(milliseconds);
  const convertedTime = timeObject.toLocaleString();
  return convertedTime;
};

const addNews = (news) => {
  console.log(news);
  Object.values(news).map(trg => {
    console.log(trg)
    console.log("ciao");
    const divNews = document.createElement("div");
    divNews.className = "news";
    const h3 = document.createElement("h3")
    h3.textContent = trg.title;
    divNews.appendChild(h3);
    const divNewsUrl = document.createElement("div");
    divNewsUrl.className = "newsUrl";
    const anchor = document.createElement("a");
    anchor.href = trg.url;
    anchor.textContent = trg.url;
    divNewsUrl.appendChild(anchor);
    divNews.appendChild(divNewsUrl);
    const divNewsBy = document.createElement("div");
    divNewsBy.className = "divNewsBy";
    divNewsBy.textContent = trg.by;
    divNews.appendChild(divNewsBy);
    const divNewsRelease = document.createElement("div");
    divNewsRelease.className = "divNewsRelease";
    divNewsRelease.textContent = UnixConverter(news.time);
    divNews.appendChild(divNewsRelease);
    const allNews = document.querySelector(".allNews");
    allNews.appendChild(divNews);
  });
};

const getNews = (idsAry) => {
  const newsAry = []
  Object.values(idsAry).map( async (id) => {
    await fetch("https://hacker-news.firebaseio.com/v0/item/" + id + ".json?print=pretty")
    .then((res) => res.json())
    .then((data) => {newsAry.push(data);})
    .catch((err) => console.log(err))
  });
  return newsAry;
}

const fetchIdNews = async() => {
  let ids;
  await fetch("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty")
  .then((res) => res.json())
  .then((data) => {ids = data;})
  .catch((err) => console.log(err));
  return ids;
}

(async () => {
  const idsNewsAry = await fetchIdNews();
  const allNewsAry = await getNews(idsNewsAry);
  addNews(allNewsAry);
})();