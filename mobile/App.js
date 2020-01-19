import React from 'react';
import { StatusBar, YellowBox } from 'react-native';
import Routes from './src/routes';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
]);

export default function App() {
  return (
    <>
    {/* TODO: MUDAR A STATUS BAR, REMOVER A COR, OU ELA MESMO 
      E COLOCAR O NOME DO APP FLUTUANDO NO MEIO OU NOS CANTOS */}
      <StatusBar barStyle="light-content" backgroundColor="#7D40E7" />
      <Routes />
    </>
  );
}