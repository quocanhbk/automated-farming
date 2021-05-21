import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import MainPage from './components/MainPage';
import theme from './utils/theme';
import { StoreProvider, useStoreState } from 'easy-peasy';
import store from './store';

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
  let isDark = useStoreState(state => state.isDark)
  
  return (
    <ThemeProvider theme={isDark ? theme.dark : theme.light}>
        <StyledApp>
            <MainPage/>
        </StyledApp>
    </ThemeProvider>
  );
};

const App = () => {
  return (
    <StoreProvider store={store}>
      <Container />
    </StoreProvider>
  );
}

export default App;
