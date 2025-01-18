import * as React from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface Button {
  text: string;
  onPress?: (value: string) => void;
  style?: 'cancel' | 'default' | 'destructive';
}

type ButtonsArray = Button[];

export interface PromptProps {
  visible?: boolean;
  onCancelPress?: () => void;
}

interface PromptOptions {
  cancelable?: boolean;
  hideOnSubmit?: boolean;
}

export interface PromptState {
  visible?: boolean;
  title?: string;
  text?: string;
  inputValue?: string;
  callback?: (value: string) => void;
  buttons?: ButtonsArray;
}

let GlobalPrompt: any;

export default class Prompt extends React.Component<PromptProps, PromptState> {
  static show(
    title?: string,
    text?: string,
    callback?: (value: string) => void,
    buttons?: ButtonsArray,
    options?: PromptOptions,
  ) {
    if (!GlobalPrompt) return;
    GlobalPrompt.prompt(title, text, callback, buttons, options);
  }

  static hide() {
    if (!GlobalPrompt) return;
    GlobalPrompt.hide();
  }

  state = {
    visible: false,
    title: '',
    text: '',
    inputValue: '',
    buttons: [],
  };

  constructor(props) {
    super(props);
    GlobalPrompt = this;
  }

  public prompt(
    title?: string,
    text?: string,
    callback?: (value: string) => void,
    buttons?: ButtonsArray,
    options?: PromptOptions,
  ) {
    let newButtons = buttons;
    if (!newButtons) {
      newButtons = [
        {
          text: 'SAVE',
          onPress: value => {
            if (callback) callback(value);
            if (
              (options && options.hideOnSubmit === true) ||
              options?.hideOnSubmit === undefined
            ) {
              this.hide();
            }
          },
        },
      ];
      if (options && options.cancelable === false) {
        newButtons.pop();
      }
    }
    this.setState({
      inputValue: '',
      title,
      text,
      callback,
      buttons: newButtons,
      visible: true,
    });
  }

  public show() {
    this.setState({ visible: true });
  }

  public hide() {
    this.setState({ visible: false });
  }
  public render() {
    const { inputValue, visible, title, text, buttons } = this.state;
    return (
      <Modal visible={visible} transparent={true}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
          enabled
        >
          <View style={styles.boxContainer}>
            {title !== undefined && title.length > 0 && (
              <View style={styles.titleContainer}>
                <Text style={styles.titleLabel}>{title}</Text>
              </View>
            )}
            {text !== undefined && text.length > 0 && (
              <View style={styles.textContainer}>
                <Text style={styles.textLabel}>{text}</Text>
              </View>
            )}
            <View style={styles.textInputContainer}>
              <TextInput
                onChangeText={inputValue => this.setState({ inputValue })}
                value={inputValue}               
                maxLength={32}
                autoFocus={true}
                style={styles.textInput}
              />
            </View>
            {buttons && (
              <View
                style={[
                  styles.buttonsContainer,
                  { flexDirection: buttons.length > 2 ? 'column' : 'row' },
                ]}
              >
                {buttons.map((button: any, index: number) => {
                  let onPress = () => {
                    if (button.onPress) button.onPress(this.state.inputValue);
                  };
                  if (!button.onPress && button.style === 'cancel') {
                    onPress = () => {
                      this.hide();
                      if (this.props.onCancelPress) {
                        this.props.onCancelPress();
                      }
                    };
                  }
                  return (
                    <View
                      key={'button' + index}
                      style={[
                        styles.buttonContainer,
                        {
                          borderRightWidth:
                            index === 0 && buttons.length === 2 ? 1 : 0,
                          borderBottomWidth:
                            index < buttons.length && buttons.length > 2
                              ? 1
                              : 0,
                        },
                      ]}
                    >
                      <TouchableOpacity onPress={onPress} style={styles.button}>
                        <Text
                          style={[
                            styles.buttonText,
                            {
                              fontWeight:
                                button.style === 'cancel' ? '600' : 'normal',
                              color:
                                button.style === 'destructive'
                                  ? 'rgb(255, 59, 48)'
                                  : 'rgb(0, 122, 255)',
                            },
                          ]}
                        >
                          {button.text}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  boxContainer: {
    minWidth: 240,
    minHeight: 150,
    margin: 40,
    backgroundColor: 'rgba(250, 250, 250, 1)',
    borderRadius: 15,
  },
  titleContainer: {
    paddingTop: 20,
    paddingHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleLabel: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 20,
  },
  textContainer: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textLabel: {
    textAlign: 'center',
  },
  buttonsContainer: {
    borderTopWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  buttonContainer: {
    flex: 1,
    maxHeight: 50,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderWidth: 0,
  },
  button: {
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
  },
  textInputContainer: {},
  textInput: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white',
    margin: 20,
    color: 'black',
    padding: 5,
  },
});
