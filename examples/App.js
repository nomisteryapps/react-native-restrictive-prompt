/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Prompt from 'react-native-simple-prompt';

const App = () => (
  <>
    <TouchableOpacity
      onPress={() => {
        Prompt.show('Sign In', 'Enter your email', password =>
          console.warn(`You entered ${password}`),
        );
      }}
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Sign In</Text>
    </TouchableOpacity>
    <Prompt></Prompt>
  </>
);

export default App;
