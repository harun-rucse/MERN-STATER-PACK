import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import { useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import GlobalStyles from 'src/components/GlobalStyles';
import theme from 'src/theme';
import routes from 'src/routes';

const App = () => {
  const { authInfo } = useSelector((state) => state.auth);
  const routing = useRoutes(routes(authInfo));

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <GlobalStyles
          maxSnack={2}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
        />
        {routing}
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
