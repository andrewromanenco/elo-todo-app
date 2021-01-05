import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Alert, AlertTitle } from '@material-ui/lab';

class EloToDoInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      tooShortListError: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.processInput = this.processInput.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value, tooShortListError: false});
  }

  processInput() {
    const tasks = this.state.value.match(/[^\r\n]+/g);
    if (!tasks) {
      this.setState({tooShortListError: true});
      return;
    }
    const filteredTasks = tasks.filter(task => task.trim().length > 0);
    if (filteredTasks.length > 4) {
      this.props.createEloList(filteredTasks);
    } else {
      this.setState({tooShortListError: true});
    }
  }

  render() {
    return (
      <div>
        <Alert severity="info">
          <AlertTitle>Elo rating for ToDo tasks list</AlertTitle>
          Enter a list of tasks. One per line and at least 5 of them.
        </Alert>
        <TextField
          label="One task per line"
          value={this.state.value}
          onChange={this.handleChange}
          multiline={true}
          fullWidth={true}
          rows="10" /><br/>
          <Button variant="contained" color="primary" onClick={this.processInput}>Run elo rating</Button>
          {this.state.tooShortListError && <Alert severity="error">List is too short, enter at least 5 tasks.</Alert>}
        </div>
    );
  }
}

export default EloToDoInput;
