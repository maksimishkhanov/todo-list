import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;

  h1 {
    font-size: 2.5em;
    margin: 0;
    color: #333;
  }
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <h1>Todo List</h1>
    </HeaderContainer>
  );
};

export default Header;