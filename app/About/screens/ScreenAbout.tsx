import React from 'react';
import {
  ScrollView,
  Box,
  Text,
  VStack,
  Image,
  useColorModeValue,
} from 'native-base';
import {AnimatedColorBox} from '@app/Shared/components';
import {Masthead} from '@app/Todo/components';
import {Navbar} from '@app/Core/components';
import Icon from 'react-native-vector-icons/Feather';
import LinkButton from '@app/Shared/components/ButtonLink/ButtonLink';

const ScreenAbout = () => {
  return (
    <AnimatedColorBox
      flex={1}
      bg={useColorModeValue('warmGray.50', 'warmGray.900')}
      w="full">
      <Masthead
        title="About this app"
        image={require('../../Core/assets/about-masthead.png')}>
        <Navbar />
      </Masthead>
      <ScrollView
        borderTopLeftRadius="20px"
        borderTopRightRadius="20px"
        bg={useColorModeValue('warmGray.50', 'primary.900')}
        mt="-20px"
        pt="30px"
        p={4}>
        <VStack flex={1} space={4}>
          <Box alignItems="center">
            <Image
              source={require('../../Core/assets/brandon.png')}
              borderRadius="full"
              resizeMode="cover"
              w={120}
              h={120}
              alt="author"
            />
          </Box>
          <Text fontSize="md" w="full">
            A smoothly animated ToDo app built with React Native
          </Text>
          <LinkButton
            colorScheme={'blue'}
            size="lg"
            borderRadius="full"
            href="https://github.com/brandon-gs/mobile-animated-todo"
            leftIcon={<Icon name="github" size={24} color="white" />}>
            Go to Github repo
          </LinkButton>
        </VStack>
      </ScrollView>
    </AnimatedColorBox>
  );
};

export default ScreenAbout;
