import React from 'react';
import { Container } from '../QualitySelection/styles';
import InfoModal from '../InfoModal';

const SearchSelection = ({ ...rest }): any => {
  return (
    <Container>
      <label htmlFor="quality">Select a type of search :  </label><br />
      <select name="quality" id="searchQuality" {...rest}>
        <option value="categories">Categories</option>
        <option value="channels">Channels</option>
      </select>
      {/* <InfoModal text={'Works best with "Source"'} /> */}
    </Container>
  );
};

export default SearchSelection;
