import { render, screen } from '@testing-library/react';
import EloToDoVote from './EloToDoVote';
import { act } from "react-dom/test-utils";

test('Vote a', () => {
  const voteA = jest.fn();
  const voteB = jest.fn();
  act(() => {
    render(<EloToDoVote a="taskA" b="taskB" votedA={voteA} votedB={voteB} />);
  });
  const buttonA = screen.getByText("taskA");
  screen.getByText("taskB");
  act(() => {
    buttonA.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(voteA).toHaveBeenCalledTimes(1);
  expect(voteB).toHaveBeenCalledTimes(0);
});

test('Vote b', () => {
  const voteA = jest.fn();
  const voteB = jest.fn();
  act(() => {
    render(<EloToDoVote a="taskA" b="taskB" votedA={voteA} votedB={voteB} />);
  });
  screen.getByText("taskA");
  const buttonB = screen.getByText("taskB");
  act(() => {
    buttonB.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(voteA).toHaveBeenCalledTimes(0);
  expect(voteB).toHaveBeenCalledTimes(1);
});
