import React from 'react';
import styled, { css } from 'styled-components';
import { RootState, useAppDispatch, useAppSelector } from '../store';
import { setFilter } from '../store/todoSlice';
import { FilterType } from '../types';

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
`;

const Button = styled.button<{ active?: boolean }>`
  background-color: #eee;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.2s;

  &:hover {
    background-color: #ddd;
  }

  ${(props) =>
    props.active &&
    css`
      background-color: #007bff;
      color: #fff;
    `}
`;

const FilterButtons: React.FC = () => {
  const dispatch = useAppDispatch();

  const filter = useAppSelector((state: RootState) => state.todos.filter);

  const filters: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'Все' },
    { key: 'active', label: 'Активные' },
    { key: 'completed', label: 'Выполненные' },
  ];

  return (
    <ButtonGroup>
      {filters.map(({ key, label }) => (
        <Button
          key={key}
          active={filter === key}
          onClick={() => dispatch(setFilter(key))}
        >
          {label}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default FilterButtons;