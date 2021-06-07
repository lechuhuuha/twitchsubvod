import React, { useEffect, useState } from 'react';
import { getLocalStorage } from '../../services/localStorage';
import { Container, Ul, Li } from './styles';

interface savedSearchedProps {
  onUpdate: Function;
}

const SavedSearched = (props: any) => {
  // props.onUpdate();
  let arrUser = getLocalStorage();
  let li = arrUser.map((item, key) => {
    return (
      <Li key={key}>
        <a href="">{item}</a>
      </Li>
    );
  });
  return (
    <>
      <Container>
        <h3>List of streamers you have searched</h3>
        <Ul>{li}</Ul>
      </Container>
    </>
  );
};
export default SavedSearched;
