import { useState, useEffect } from 'react';
import Header from "./components/Header";
import MainContent from './components/MainContent';
import Sidebar from './components/Sidebar';

function App() {
  const [animeList, setAnimeList] = useState([]);
  const [topAnime, setTopAnime] = useState([]);
  const [search, setSearch] = useState("");

  const getTopAnime = async () => {
    const temp = await fetch(`https://api.jikan.moe/v3/top/anime/1/bypopularity`)
      .then(res => res.json());
    
    setTopAnime(temp.top.slice(0,5));
  }

  useEffect(() => {
    getTopAnime();
  }, [])

  const HandleSearch = (e) => {
    e.preventDefault();

    FetchAnime(search);
  }

  const FetchAnime = async (query) => {
    const temp = await fetch(`https://api.jikan.moe/v3/search/anime?q=${query}&order_by=title&sort=asc&limit=10`)
      .then(res => res.json());

    setAnimeList(temp.results);
  }

  return (
    <div className="App">
      <Header />
      <div className="content-wrap">
        <Sidebar topAnime={topAnime} />
        <MainContent 
          HandleSearch={HandleSearch}
          search={search}
          setSearch={setSearch}
          animeList={animeList} />        
      </div>
    </div>
  );
}

export default App;
