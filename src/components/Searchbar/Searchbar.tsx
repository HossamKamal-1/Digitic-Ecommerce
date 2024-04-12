import './Searchbar.scss';
import { Search } from 'lucide-react';
import { FormEvent } from 'react';
function Searchbar() {
  function handleSearchClick(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    /* TODO: Implement search functionality */
    // implement functionality
  }
  return (
    <form className="search-form" onSubmit={handleSearchClick}>
      <input type="search" placeholder="Search product here..." />
      <button>
        <Search size="20px" />
      </button>
    </form>
  );
}

export default Searchbar;
