import usePokemon from "../../../../contexts/pokemons";
import "./Pagination.css";

export function Pagination() {

  const { paginate, currentPage, totalPages } = usePokemon();

  return (
    <div className="pagination-wrapper">
      <button
        className="previous-button"
        disabled={currentPage === 1}
        onClick={() => paginate("previous")}
      >
        <img width="40px" src="arrow-icon.png" alt="previous button" />
      </button>
      <h3>
        {currentPage} / {totalPages}
      </h3>
      <button 
        className="next-button" 
        disabled={currentPage === totalPages}
        onClick={() => paginate("next")}
      >
        <img width="40px" src="arrow-icon.png" alt="next-button" />
      </button>
    </div>
  )
}