import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

import {ButtonProps} from '../types';

const Button = ({
  title,
  handleClick,
  isPrimary = true,
  disabled = false,
}: ButtonProps) => {
  return (
    <Pressable
      style={[
        isPrimary ? styles.primary_btn : styles.secondary_btn,
        disabled && styles.disabled,
      ]}
      onPress={handleClick}
      // android_ripple={{color: '#5a7be8'}}
      disabled={disabled}>
      <Text
        style={isPrimary ? styles.primary_btn_text : styles.secondary_btn_text}>
        {title}
      </Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  primary_btn: {
    backgroundColor: '#4C63B6',
    alignSelf: 'flex-end',
    paddingBlock: 12,
    paddingInline: 26,
    borderRadius: 10,
  },
  primary_btn_text: {color: '#fff'},
  secondary_btn: {
    backgroundColor: '#4C63B6',
    alignSelf: 'flex-end',
    paddingBlock: 12,
    paddingInline: 26,
    borderRadius: 10,
  },
  secondary_btn_text: {color: '#fff'},
  disabled: {opacity: 0.8},
});
