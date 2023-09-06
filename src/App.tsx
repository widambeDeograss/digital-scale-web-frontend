import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Colors } from "./constants/Colors";
import AppRouter from "./routes";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Store from "./app/stote";

const client = new ApolloClient({
  uri: "http://172.17.17.151:1999/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <div
      className="App"
      style={{ backgroundColor: Colors.addson, height: "100vh" }}
    >
      <Provider store={Store}>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </ApolloProvider>
      </Provider>
    </div>
  );
}

export default App;
