import React, { useState } from 'react';
import { Container } from './styles';

import produce from 'immer';
import BordContext from './context';
import List from '../List';
import { loadLists } from '../../services/api';

const data = loadLists();

function Board() {
  const [lists, setList] = useState(data);

  function move (fromList, toList, from, to) {
    setList(produce(lists, draft => {
      const dragged = draft[fromList].cards[from]

      draft[fromList].cards.splice(from, 1);
      draft[toList].cards.splice(to, 0, dragged);
    }))
  }

  return ( 
    <BordContext.Provider value={{ lists, move}}>
      <Container>
        {lists.map( (list, index) => <List key={list.title} index={index} data={list} />)}
      </Container>
    </BordContext.Provider>
  );
}

export default Board;