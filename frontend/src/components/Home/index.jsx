import React, { useState } from 'react';

import './Home.css';

const Home = () => {
  const [searchStr, setSearchStr] = useState('');

  return (
    <>
      <h2>Find remote jobs from any part of the world</h2>

      <form>
        <input
          type='text'
          placeholder='Search by job title or company name...'
          required
          value={searchStr}
          onChange={(e) => setSearchStr(e.target.value)}
        />
        <input
          type='submit'
          value='search'
        />
      </form>
    </>
  );
};

export default Home;
