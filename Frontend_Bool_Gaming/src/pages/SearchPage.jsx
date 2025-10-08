import axios from "axios"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";

const SearchPage = () => {
  const [videogames, setVideogames] = useState([])
  const [search, setSearch] = useState("");
  const naviga = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchVideogames = () => {
    axios.get(`${API_URL}/videogames`)
      .then((resp) => {
        setVideogames(resp.data);
      })
      .catch((err) => naviga("not-found"))
  };

  useEffect(fetchVideogames, [])

  const filteredGames = videogames.filter(game =>
    game.title.toLowerCase().includes(search.toLowerCase()) || String(game.pegi).toLowerCase().includes(search) || game.types.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <div className="row gy-4">
        <div className="col-12 p-130">
          <SearchBar onSearch={setSearch} />
        </div>
        <div className="col-12">
          <h1 className="text-center color-white mt-3">BOOLGAMING</h1>
        </div>
        {filteredGames.map(videogame => {
          return (
            <div className="col-12 col-md-6 col-lg-4 text-center" key={videogame.id}>
              <div className="card">
                <Link to={`/detailpage/${videogame.slug}`}>
                  <img src={`${API_URL}/img/videogames/${videogame.image}`} className="card-img-top" style={{ height: "500px", width: "100%" }} />
                  <div className="card-body">
                    <p className="card-text"><strong>{videogame.title}</strong></p>
                    <p className="card-text"><strong>Price:</strong> {videogame.price}€</p>
                  </div>
                </Link>
              </div>
            </div>
          )
        }
        )}
      </div>
    </div>
  )
}

export default SearchPage