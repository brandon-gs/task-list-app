import React, {useCallback} from 'react';
import {
  HStack,
  VStack,
  Center,
  Avatar,
  Heading,
  useColorModeValue,
  ChevronLeftIcon,
  IconButton,
} from 'native-base';
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import {
  AnimatedColorBox,
  MenuButton,
  ThemeToggle,
} from '@app/Shared/components';

const Sidebar = (props: DrawerContentComponentProps) => {
  const {state, navigation} = props;
  const currentRoute = state.routeNames[state.index];

  const handlePressBackButton = useCallback(() => {
    navigation.closeDrawer();
  }, [navigation]);
  const handlePressMenuMain = useCallback(() => {
    navigation.navigate('Main');
  }, [navigation]);
  const handlePressMenuAbout = useCallback(() => {
    navigation.navigate('About');
  }, [navigation]);

  return (
    <AnimatedColorBox
      safeArea
      flex={1}
      bg={useColorModeValue('blue.50', 'darkBlue.800')}
      p={7}>
      <VStack flex={1} space={2}>
        <HStack justifyContent="flex-end">
          <IconButton
            onPress={handlePressBackButton}
            borderRadius={100}
            variant="outline"
            borderColor={useColorModeValue('blue.300', 'darkBlue.700')}
            icon={
              <ChevronLeftIcon
                onPress={handlePressBackButton}
                color={useColorModeValue('blue.800', 'darkBlue.300')}
                size={6}
              />
            }
          />
        </HStack>
        <Avatar
          source={require('../../assets/profile-image.png')}
          size="xl"
          borderRadius={100}
          mb={6}
          borderColor="secondary.500"
          borderWidth={3}
        />
        <Heading mb={4} size="xl">
          Brandon GS
        </Heading>
        <MenuButton
          active={currentRoute === 'Main'}
          onPress={handlePressMenuMain}
          icon="inbox">
          Tasks
        </MenuButton>
        <MenuButton
          active={currentRoute === 'About'}
          onPress={handlePressMenuAbout}
          icon="info">
          About
        </MenuButton>
      </VStack>
      <Center>
        <ThemeToggle />
      </Center>
    </AnimatedColorBox>
  );
};

export default Sidebar;
