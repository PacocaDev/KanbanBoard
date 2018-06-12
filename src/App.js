import React, { Component } from 'react';
import './App.css';
import Board from './containers/Board/index';

const columns = ['Backlog','To Do','In Progress','Testing','Done'];

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Kanban Board</h1>
        </header>
        <Board columns={columns} />
      </div>
    );
  }
}

export default App;
