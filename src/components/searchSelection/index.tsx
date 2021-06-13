import React from 'react';
import { Container } from '../QualitySelection/styles';
import InfoModal from '../InfoModal';
import { Link, useHistory } from 'react-router-dom';

const SearchSelection = (props: any): any => {
  // let history = useHistory();
  // function handleChange(value: any) {
  //   history.push(`/search`);
  // }

  return (
    <Container>
      <label htmlFor="search">Select a type of search : </label>
      <br />
      <select
        onChange={(e) => {
          props.onChange(e.target.value);
        }}
        name="search"
        id="searchQuality"
        {...props}
      >
        <option value="">Choose a type</option>
        <option value="categories">Categories</option>
        <option value="channels">Channels</option>
      </select>
      {/* <InfoModal text={'Works best with "Source"'} /> */}
    </Container>
  );
};

export default SearchSelection;
