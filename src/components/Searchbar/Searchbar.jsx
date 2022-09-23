import { useState } from 'react';
import s from './Searchbar.module.css';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Searchbar ({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const onHadleChange = e => {
    const query = e.target.value.trim();
    setSearchQuery(query);
  };

  const onHandleSubmit = e => {
    e.preventDefault();
    onSubmit(searchQuery);
    setSearchQuery('');
    if (searchQuery === '') {
      toast.error('Please, input your query for search!', {
        autoClose: 5000,
      });
      return;
    }
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={onHandleSubmit}>
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormButtonLabel}></span>
        </button>

        <input
          className={s.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={onHadleChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};