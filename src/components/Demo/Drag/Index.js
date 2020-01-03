import React, { useState, useCallback } from 'react'
import Card from './Card'
import update from 'immutability-helper'
const style = {
  width: 'auto',
}
const Container = ({dataDragDrop,className,responseDragDrop}) => {
  {
    const [cards, setCards] = useState(dataDragDrop)
    const moveCard = useCallback(
      (dragIndex, hoverIndex) => {
        const dragCard = cards[dragIndex]
        setCards(
          update(cards, {
            $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
          }),
        )
      },
      [cards],
    )
    const renderCard = (card, index) => {
      return (
        <Card
          key={card.id}
          index={index}
          id={card.id}
          text={card.text}
          moveCard={moveCard}
          className={className}
        />
      )
    }
    responseDragDrop(cards);
    return (
      <React.Fragment >
        <React.Fragment  >{cards.map((card, i) => renderCard(card, i))}</React.Fragment>
      </React.Fragment>
    )
  }
}
export default Container