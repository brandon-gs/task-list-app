import React, {useCallback} from 'react';
import {HStack, HamburgerIcon, IconButton} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';

const NavBar = () => {
  const navigation = useNavigation<DrawerNavigationProp<{}>>();
  const handlePressMenuButton = useCallback(() => {
    navigation.openDrawer();
  }, [navigation]);

  return (
    <HStack w="full" alignItems="center" alignContent="center" p={4}>
      <IconButton
        onPress={handlePressMenuButton}
        borderRadius={100}
        icon={<HamburgerIcon size={6} color={'white'} />}
      />
    </HStack>
  );
};

export default NavBar;
