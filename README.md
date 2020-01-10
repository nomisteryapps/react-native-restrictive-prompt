# React Native Simple Prompt

A super simple-to-use prompt for iOS and Android for lazy developers.

It almost has the same behavior as the [AlertIOS.prompt](https://facebook.github.io/react-native/docs/alertios#prompt) but with cross-platform feature.


## Usage
```js
import Prompt from 'react-native-simple-prompt';

<TouchableOpacity
    onPress={() => {
        Prompt.show('Sign In', 'Enter your email', email =>
            console.log(`You entered ${email}`),
        );
    }}
/>
<Prompt />
```

![](https://i.imgur.com/wiF6g7u.gif)

## Quick Example
```js
import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
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
```