import React from 'react';
import EloToDoInput from './EloToDoInput';
import EloToDoList from './EloToDoList';

class EloToDo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'input'
    };
    this.createEloList = this.createEloList.bind(this);
    this.reset = this.reset.bind(this);
  }

  createEloList(list) {
    const items = list.map(item => {
      return {
        rating: 1000,
        task: item.trim()
      }
    });
    this.setState({items: items, view: 'elo'});
  }

  reset() {
    this.setState({
      view:'input',
      items: []
    });
  }

  render() {
    return (
        <div>
      {this.state.view === "input" &&
        <EloToDoInput createEloList={this.createEloList}/>}
      {this.state.view === "elo" &&
        <EloToDoList items={this.state.items} reset={this.reset} />}
        </div>
      );
  }
}

export default EloToDo;
