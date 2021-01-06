import { render, screen } from '@testing-library/react';
import EloToDoList from './EloToDoList';
import { act } from "react-dom/test-utils";

jest.mock('./EloToDoVote', () => {
  const mock = () => <div>mocked EloToDoVote</div>;
  return mock;
});

test('Show initial list', () => {
  const reset = jest.fn();
  const tasks = [
    {rating: 1000, task: 'taskA'},
    {rating: 1000, task: 'taskB'},
    {rating: 1000, task: 'taskC'},
    {rating: 1000, task: 'taskD'},
    {rating: 1000, task: 'taskE'}
  ];
  render(<EloToDoList items={tasks} reset={reset}/>);
  const allRatings = screen.getAllByText("1000.00");
  expect(allRatings).toHaveLength(5);
  screen.getByText("taskA");
  screen.getByText("taskB");
  screen.getByText("taskC");
  screen.getByText("taskD");
  screen.getByText("taskE");
  screen.getByText("mocked EloToDoVote");
  expect(reset).toHaveBeenCalledTimes(0);
});

test('Toggle switch', () => {
  const reset = jest.fn();
  const tasks = [
    {rating: 1000, task: 'taskA'},
    {rating: 1000, task: 'taskB'},
    {rating: 1000, task: 'taskC'},
    {rating: 1000, task: 'taskD'},
    {rating: 1000, task: 'taskE'}
  ];
  act(() => {
    render(<EloToDoList items={tasks} reset={reset}/>);
  });
  const initialRatings = screen.getAllByText("1000.00");
  expect(initialRatings).toHaveLength(5);
  screen.getByText("taskA");
  screen.getByText("taskB");
  screen.getByText("taskC");
  screen.getByText("taskD");
  screen.getByText("taskE");
  screen.getByText("mocked EloToDoVote");
  const toggle = screen.getByRole('checkbox');

  act(() => {
    toggle.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  const hiddenRatings = screen.queryAllByText("1000.00");
  expect(hiddenRatings).toHaveLength(0);

  act(() => {
    toggle.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  const reShownRatings = screen.queryAllByText("1000.00");
  expect(reShownRatings).toHaveLength(5);
  expect(reset).toHaveBeenCalledTimes(0);
});
