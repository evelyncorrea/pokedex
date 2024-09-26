import usePokemon from '../../../../contexts/pokemons';
import './Pagination.css';

export function Pagination() {

  const { paginate, currentPage, totalPages } = usePokemon();

  return (
    <div className="pagination-wrapper">
      <button onClick={() => paginate('previous')}>Previous</button>
      Pagination {currentPage + 1} / {totalPages}
      <button onClick={() => paginate('next')}>Next</button>
    </div>
  )
}