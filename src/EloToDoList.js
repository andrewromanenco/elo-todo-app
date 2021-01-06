import React from 'react';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import EloToDoVote from './EloToDoVote';
import { Alert, AlertTitle } from '@material-ui/lab';
import Switch from '@material-ui/core/Switch';

class EloToDoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.items,
      pair: this.getIndices(this.props.items),
      showRatings: true
    }
    this.vote = this.vote.bind(this);
    this.handleChangeShowRatings = this.handleChangeShowRatings.bind(this);
  }

  getIndices(items) {
    const a = Math.floor(Math.random() * items.length);
    let b = a;
    while (a === b) {
      b = Math.floor(Math.random() * items.length);
    }
    return [a, b]
  }

  vote(winner, loser) {
    return () => {
      const items = this.state.items;
      items[winner].rating = items[winner].rating + 40*(1-1/(1+Math.pow(10, (items[loser].rating - items[winner].rating)/400)))
      items[loser].rating = items[loser].rating + 40*(0-1/(1+Math.pow(10, (items[winner].rating - items[loser].rating)/400)))
      this.setState({
        items: items,
        pair: this.getIndices(this.state.items)
      });
    }
  }

  handleChangeShowRatings(event) {
    this.setState({
      [event.target.name]: event.target.checked
    });
  }

  render() {
    const sortedItems = [...this.state.items].sort(function(a, b) {
      return b.rating - a.rating;
    });
    return (
      <div>
        <Alert severity="info">
          <AlertTitle>Elo rating for ToDo tasks list</AlertTitle>
          The app presents two random tasks. You should pick the more important
          one. Keep running till your list looks alright to you.
          To enter new tasks <Button variant="contained" color="secondary" onClick={this.props.reset}>RESET THIS LIST</Button>
          <br/><br/>
          <Switch
            checked={this.state.showRatings}
            onChange={this.handleChangeShowRatings}
            name="showRatings"
            color="primary"
            inputProps={{ 'aria-label': 'primary checkbox' }}
           /> Show ratings
        </Alert>
        <EloToDoVote
          a={this.state.items[this.state.pair[0]].task}
          b={this.state.items[this.state.pair[1]].task}
          votedA={this.vote(this.state.pair[0], this.state.pair[1])}
          votedB={this.vote(this.state.pair[1], this.state.pair[0])}
          />
        <TableContainer>
          <Table aria-label="simple table">
            <colgroup>
              {this.state.showRatings && <col style={{width:'10%'}}/>}
              <col style={{width:'90%'}}/>
           </colgroup>
            <TableHead>
              <TableRow>
                {this.state.showRatings && <TableCell>Rating</TableCell>}
                <TableCell>Task</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedItems.map((row) => (
                <TableRow key={row.task}>
                  {this.state.showRatings && <TableCell>{row.rating.toFixed(2)}</TableCell>}
                  <TableCell>{row.task}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

export default EloToDoList;
