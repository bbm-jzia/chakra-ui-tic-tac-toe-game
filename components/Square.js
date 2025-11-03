import React from 'react';
import { 
  Center, 
  Text, 
  useColorModeValue 
} from '@chakra-ui/react';

function Square({ value, onSquareClick, isWinningSquare, borderColor, hoverBg, isDisabled }) {
  const xColor = useColorModeValue('blue.500', 'blue.300');
  const oColor = useColorModeValue('red.500', 'red.300');
  const winningBg = useColorModeValue('green.100', 'green.800');
  
  return (
    <Center
      h="100px"
      w="100px"
      border="2px"
      borderColor={borderColor}
      borderRadius="md"
      fontSize="4xl"
      fontWeight="bold"
      cursor={value || isDisabled ? "default" : "pointer"}
      onClick={onSquareClick}
      color={value === 'X' ? xColor : value === 'O' ? oColor : 'gray.500'}
      bg={isWinningSquare ? winningBg : 'transparent'}
      _hover={{
        bg: !value && !isDisabled ? hoverBg : isWinningSquare ? winningBg : 'transparent',
      }}
      transition="all 0.2s"
    >
      <Text>{value}</Text>
    </Center>
  );
}

export default Square;