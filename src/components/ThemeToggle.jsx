import React from 'react';
import { useColorMode ,IconButton} from '@chakra-ui/react';
import { SunIcon ,MoonIcon} from '@chakra-ui/icons';

const ThemeToggle = () => {
    const { colorMode ,toggleColorMode} =useColorMode();
  return (
    <IconButton icon={colorMode === 'light' ? <MoonIcon /> :<SunIcon/>}
    onClick={toggleColorMode}
    aria-label={`Switch to ${colorMode === 'light' ? 'dark':'light'}mode`}/>
  );
};

export default ThemeToggle
