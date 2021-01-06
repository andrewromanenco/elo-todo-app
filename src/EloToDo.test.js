import { render, screen } from '@testing-library/react';
import EloToDo from './EloToDo';

jest.mock('./EloToDoInput', () => {
  const mock = () => <div>mocked input</div>;
  return mock;
});

jest.mock('./EloToDoList', () => {
  const mock = () => <div>mocked list</div>;
  return mock;
});

test('initial view shows input form', () => {
  render(<EloToDo />);
  const input = screen.getByText(/mocked input/);
  expect(input).toBeInTheDocument();
});
