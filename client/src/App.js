import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import MainPage from './components/MainPage';
import theme from './utils/theme';
import Context from './Context';

const StyledApp = styled.div`
  background: ${(props) => props.theme.color.background.secondary};
  color: ${props => props.theme.color.text.primary};
  height: 100vh;
  overflow: hidden;
  transition: background 0.25s ease-out;
  display: flex;
  justify-content: center;
  font-size: 1rem;
`;
const Container = () => {
  const {themeContext} = Context.useContainer()
  
  return (
    <ThemeProvider theme={themeContext.isDark ? theme.dark : theme.light}>
        <StyledApp>
            <MainPage/>
        </StyledApp>
    </ThemeProvider>
  );
};
function App() {
  return (
    <Context.Provider>
      <Container />
    </Context.Provider>
  );
}

export default App;
