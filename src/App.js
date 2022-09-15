import { createSwitchNavigator } from "@react-navigation/core";
import { createBrowserApp } from "@react-navigation/web";
import React from "react";
import { Provider } from "react-redux";

import Page2 from "./pages/checkout/page";
import Error from "./pages/error/page";
import Page1 from "./pages/product-list/page";
import Success from "./pages/success/page";
import { store } from "./redux/store";

const AppNavigator = createSwitchNavigator({
  Page1: {
    screen: Page1,
  },
  Page2: {
    screen: Page2,
  },
  Success: {
    screen: Success,
  },
  Error: {
    screen: Error,
  },
});

const AppWithNavigation = createBrowserApp(AppNavigator);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigation />
      </Provider>
    );
  }
}

export default App;
