import React from 'react';
import EditableLabel from 'react-inline-editing';
import PropTypes from 'prop-types';

import './Card.css';

class Card extends React.Component {
  static propTypes = {
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
    onMove: PropTypes.func,
    priority: PropTypes.string,
    time: PropTypes.string,
    title: PropTypes.string,
  };

  onDelete() {
    const { onDelete } = this.props;
    if (onDelete) onDelete();
  }

  onEdit(field, newValue) {
    const { onEdit } = this.props;
    if (onEdit) onEdit(field, newValue);
  }

  onMove() {
    const { onMove } = this.props;
    if (onMove) onMove();
  }

  render() {
    const {
      title,
      time,
      onMove,
      priority
    } = this.props;

    return (
      <div className="Card"
      >
        <EditableLabel
          text={title}
          onFocusOut={value => this.onEdit('title', value)}
        />
        <EditableLabel
          text={time}
          onFocusOut={value => this.onEdit('time', value)}
        />
        <EditableLabel
          text={priority}
          onFocusOut={value => this.onEdit('priority', value)}
        />
        {onMove && (
          <button
            onClick={() => this.onMove()}
          >
            Move
          </button>
        )}
        <button
          onClick={() => this.onDelete()}
        >
          Delete
        </button>
      </div>
    );
  }
}

export default Card;
