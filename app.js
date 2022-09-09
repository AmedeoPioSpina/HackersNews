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

const getNews = (idsAry) => {
  idsAry.map(async(idArt) => {
    await fetch("https://hacker-news.firebaseio.com/v0/item/" + idArt + ".json?print=pretty")
    .then((res) => res.json())
    .then((data) => {addNews(data); console.log(data)})
    .catch((err) => console.log(err))
  });
}

const getIdNews = async() => {
  await fetch("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty")
  .then((res) => res.json())
  .then((data) => {Object.values(data).map((id) => idsNewsAry.push(id)); console.log(idsNewsAry)})
  .catch((err) => console.log(err))
}

let idsNewsAry = [];
const allNews = document.querySelector(".allNews");


const initNews = async() => {
  await getIdNews();
  await getNews(idsNewsAry);
}

initNews();