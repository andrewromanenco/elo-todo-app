import React from 'react';
import Button from '@material-ui/core/Button';

class EloToDoVote extends React.Component {
  render() {
    return (
      <div>
        <Button variant="contained" onClick={this.props.votedA}>{this.props.a}</Button><br/>
        <Button variant="contained" onClick={this.props.votedB}>{this.props.b}</Button>
      </div>
    );
  }
}

export default EloToDoVote;
