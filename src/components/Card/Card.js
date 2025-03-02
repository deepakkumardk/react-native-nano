import React, {useEffect} from 'react';
import {Card as PaperCard} from 'react-native-paper';

function Card({elementProps, getViewItems, onElementLoaded}) {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);
  return (
    <PaperCard {...elementProps} {...elementProps['props']}>
      {getViewItems(elementProps['content'], true, onElementLoaded)}
    </PaperCard>
  );
}

export default Card;
