import ReactTestUtils from 'react-dom/test-utils';
import { render, screen } from '@testing-library/react';
import EloToDoInput from './EloToDoInput';
import { act } from "react-dom/test-utils";

test('Show error if the list is empty', () => {
  const createEloList = jest.fn();
  act(() => {
    render(<EloToDoInput createEloList={createEloList}/>);
  });
  const button = screen.getByText(/Run elo rating/);
  const nonExistingMessage = screen.queryByText("List is too short, enter at least 5 tasks.");
  expect(nonExistingMessage).not.toBeInTheDocument();

  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  screen.getByText("List is too short, enter at least 5 tasks.");
  expect(createEloList).toHaveBeenCalledTimes(0);
});

test('Show error if the list has just 4 items', () => {
  const createEloList = jest.fn();
  act(() => {
    render(<EloToDoInput createEloList={createEloList}/>);
  });
  const button = screen.getByText(/Run elo rating/);
  const nonExistingMessage = screen.queryByText("List is too short, enter at least 5 tasks.");
  expect(nonExistingMessage).not.toBeInTheDocument();
  const input = screen.getByRole('textbox')

  act(() => {
    input.value = "1\n2\n3\n4\n\n\n";
    ReactTestUtils.Simulate.change(input);
  });

  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  screen.getByText("List is too short, enter at least 5 tasks.");
  expect(createEloList).toHaveBeenCalledTimes(0);
});

test('Task list is returned to parent', () => {
  const createEloList = jest.fn();
  act(() => {
    render(<EloToDoInput createEloList={createEloList}/>);
  });
  const input = screen.getByRole('textbox')
  const button = screen.getByText(/Run elo rating/);
  const nonExistingMessage = screen.queryByText("List is too short, enter at least 5 tasks.");
  expect(nonExistingMessage).not.toBeInTheDocument();

  act(() => {
    input.value = "1\n2\n3\n4\n5";
    ReactTestUtils.Simulate.change(input);
  });

  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  const errorMessage = screen.queryByText("List is too short, enter at least 5 tasks.");
  expect(errorMessage).not.toBeInTheDocument();
  expect(createEloList).toHaveBeenCalledTimes(1);
  expect(createEloList).toHaveBeenCalledWith(['1', '2', '3', '4', '5']);
});

test('Task list skips empty lines', () => {
  const createEloList = jest.fn();
  act(() => {
    render(<EloToDoInput createEloList={createEloList}/>);
  });
  const input = screen.getByRole('textbox')
  const button = screen.getByText(/Run elo rating/);
  const nonExistingMessage = screen.queryByText("List is too short, enter at least 5 tasks.");
  expect(nonExistingMessage).not.toBeInTheDocument();

  act(() => {
    input.value = "1\n\n\n2\n3\n4\n5\n\n\n";
    ReactTestUtils.Simulate.change(input);
  });

  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  const errorMessage = screen.queryByText("List is too short, enter at least 5 tasks.");
  expect(errorMessage).not.toBeInTheDocument();
  expect(createEloList).toHaveBeenCalledTimes(1);
  expect(createEloList).toHaveBeenCalledWith(['1', '2', '3', '4', '5']);
});
