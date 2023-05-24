import React from 'react';
import {StyleSheet} from 'react-native';
import {Button, IButtonProps, useColorModeValue, useToken} from 'native-base';
import Icon from 'react-native-vector-icons/Feather';

interface Props extends IButtonProps {
  active: boolean;
  icon: string;
  children: React.ReactNode;
}

const MenuButton = ({active, children, icon, ...props}: Props) => {
  const colorBlue = useColorModeValue('blue.600', 'blue.100');
  const [activeTextColor, textColor] = useToken('colors', ['white', colorBlue]);

  return (
    <Button
      size="lg"
      _light={{
        colorScheme: 'blue',
        _pressed: {
          bg: 'primary.100',
        },
        _text: {
          color: active ? 'blue.50' : 'blue.500',
        },
      }}
      _dark={{
        colorScheme: 'darkBlue',
        _pressed: {
          bg: 'primary.600',
        },
        _text: {
          color: active ? 'blue.50' : 'blue.500',
        },
      }}
      bg={active ? 'blue.500' : 'transparent'}
      variant="solid"
      justifyContent="flex-start"
      leftIcon={
        <Icon
          name={icon}
          size={24}
          style={styles.icon}
          color={active ? activeTextColor : textColor}
        />
      }
      {...props}>
      {children}
    </Button>
  );
};

const styles = StyleSheet.create({
  icon: {
    opacity: 0.5,
  },
});

export default MenuButton;
