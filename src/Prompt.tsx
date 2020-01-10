import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export interface PromptProps {}

export interface PromptState {}

export default class PromptComponent extends React.Component<
  PromptProps,
  PromptState
> {
  state = {};

  public render() {
    return (
      <View>
        <Text>Prompt Component</Text>
      </View>
    );
  }
}
