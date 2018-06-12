import React from 'react';
import PropTypes from 'prop-types';
import hash from 'object-hash';

import Column from '../../components/Column/index';
import './Board.css';

class Board extends React.Component {
  static propTypes = {
    columns: PropTypes.array,
  };

  static defaultProps = {
    columns: [],
  };

  static getDerivedStateFromProps(props, state) {
    const { columns } = props;

    if (!state.initialized && columns && columns.length) {

      let stateColumns = {};
      columns.forEach(column => stateColumns[column] = []);

      return {
        columns: stateColumns,
        initialized: true,
      };
    }

    return null;
  };

  state = {
    columns: {},
    initialized: false,
  };

  editCard = columnKey => cardIndex => (field, newValue) => {
    const { columns } = this.state;
    const { [columnKey]: cards, ...rest } = columns;
    const newInfo = Object.assign(cards[cardIndex], { [field]: newValue });

    cards.splice(cardIndex, 1, newInfo);
    console.log(`${columnKey} cards:`, cards);

    this.setState({
      columns: {
        [columnKey]: cards,
        ...rest
      }
    });
  };

  removeCard = columnKey => cardIndex => () => {
    const { columns } = this.state;
    const { [columnKey]: cards, ...rest } = columns;

    const removed = cards.splice(cardIndex, 1);
    console.log(`${columnKey} cards after removal:`, cards);
    console.log(`removed:`, removed);

    this.setState({
      columns: {
        [columnKey]: cards,
        ...rest
      }
    });

    return removed;
  };

  addCard = (columnKey, newCard) => {
    const { columns } = this.state;
    const { [columnKey]: previousCards, ...rest } = columns;
    const cards = previousCards.concat([{
      id: hash({ columnKey, length: previousCards.length, ...newCard }),
      ...newCard
    }]);

    console.log(`${columnKey} cards:`, cards);

    this.setState({
      columns: {
        [columnKey]: cards,
        ...rest
      }
    });
  };

  getAddCardMethod = (columnKey, index) =>
    index === 0 ? info => this.addCard(columnKey, info)
      : undefined;

  moveCard = (columnKey) => (cardIndex) => () => {
    const { columns } = this.props;
    const columnIndex = columns.indexOf(columnKey);

    if (~columnIndex && columnIndex < columns.length - 1) {
      const removed = this.removeCard(columnKey)(cardIndex)();
      this.addCard(columns[columnIndex + 1], removed[0]);
    }
  };

  getMoveCardMethod = (columnKey) => {
    const { columns } = this.props;
    const columnIndex = columns.indexOf(columnKey);

    if (~columnIndex && columnIndex < columns.length - 1) {
      return this.moveCard(columnKey)
    }

    return undefined;
  };

  render() {
    const { columns } = this.state;

    return (
      <div className="Board">
        {
          this.props.columns.map((key, index) => (
            <Column
              addCard={this.getAddCardMethod(key, index)}
              cards={columns[key]}
              editCard={this.editCard(key)}
              key={`${key}${index}`}
              moveCard={this.getMoveCardMethod(key)}
              name={key}
              removeCard={this.removeCard(key)}
            />
          ))
        }
      </div>
    );
  }
}

export default Board;
