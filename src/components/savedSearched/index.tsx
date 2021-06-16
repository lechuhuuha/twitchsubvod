import React from 'react';
import {
  deleteItem,
  getLocalStorage,
} from '../../services/localStorage';
import { Container, Ul, Li } from './styles';

// interface savedSearchedProps {
//   onUpdate: Function;
//   onSelect: Function;
// }

const SavedSearched = (props: any) => {
  // props.onUpdate();
  let arrUser = getLocalStorage();

  let li = arrUser.map((item, key) => {
    return (
      <Li key={key}>
        <button
          onClick={() => {
            props.onSelect(item);
          }}
        >
          {item}
        </button>
        <button
          style={{ cursor: 'pointer' }}
          onClick={() => {
            deleteItem(item);
            props.onUpdate();
          }}
        >
          X
        </button>
      </Li>
    );
  });
  return (
    <>
      <Container>
        <h3>List of streamers you have searched</h3>
        <Ul> {li}</Ul>
      </Container>
    </>
  );
};
export default SavedSearched;
