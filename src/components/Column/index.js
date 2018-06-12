import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Card from '../Card'
import './Column.css';

class Column extends Component {
  static propTypes = {
    addCard: PropTypes.func,
    cards: PropTypes.array,
    editCard: PropTypes.func.isRequired,
    moveCard: PropTypes.func,
    name: PropTypes.string,
    removeCard: PropTypes.func,
  };

  handleAddClick = () => {
    const { addCard } = this.props;

    if (addCard) addCard({
      title: 'Hey',
      time: '18:00',
      priority: '10',
    });
  };

  render() {
    const { addCard, editCard, moveCard, removeCard, cards, name } = this.props;

    return (
      <div
        className="Column"
      >
          <div
            className="ColumnHeader"
          >
            <h1>
              {name}
            </h1>
            {addCard && (
              <div className="AddCard">
                <button onClick={this.handleAddClick}>Add</button>
              </div>
            )}
          </div>
          {
            cards.map(({ id, title, time, priority }, index) => (
              <Card
                key={`${id}`}
                onDelete={removeCard && removeCard(index)}
                onEdit={editCard && editCard(index)}
                onMove={moveCard && moveCard(index)}
                priority={priority}
                time={time}
                title={title}
              />
            ))
          }
      </div>
    );
  }
}

export default Column;
