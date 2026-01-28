import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import Header from './components/Header';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import FilterButtons from './components/FilterButtons';
import styled from 'styled-components';

const AppWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 30px;
  font-family: 'Helvetica Neue', Arial, sans-serif;
`;

const TodoContainer = styled.div`
  background-color: #fff;
  padding: 20px 30px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
`;

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppWrapper>
        <TodoContainer>
          <Header />
          <AddTodo />
          <FilterButtons />
          <TodoList />
        </TodoContainer>
      </AppWrapper>
    </Provider>
  );
};

export default App;