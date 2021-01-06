import { render, screen } from '@testing-library/react';
import App from './App';


jest.mock('./EloToDo', () => {
  const mock = () => <div>mocked EloToDo</div>;
  return mock;
});

test('initial view shows input form', () => {
  render(<App />);
  const eloToDoApp = screen.getByText(/mocked EloToDo/);
  expect(eloToDoApp).toBeInTheDocument();
});
