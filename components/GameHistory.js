import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Button,
  VStack,
  Text,
  Box,
  useColorModeValue,
  Badge
} from '@chakra-ui/react';

function GameHistory({ history, currentMove, jumpTo, cardBg, textColor, subTextColor }) {
  const activeBg = useColorModeValue('purple.50', 'purple.900');
  const activeBorder = useColorModeValue('purple.500', 'purple.300');
  
  return (
    <Card bg={cardBg} boxShadow="xl" borderRadius="xl" w="100%">
      <CardHeader>
        <Heading size="md" color={textColor}>
          Move History
        </Heading>
      </CardHeader>
      <CardBody>
        <VStack spacing={2} align="stretch" maxH="300px" overflowY="auto">
          {history.map((_, move) => {
            const description = move ? 
              `Go to move #${move}` : 
              'Go to game start';
            
            const isCurrentMove = move === currentMove;
            
            return (
              <Box 
                key={move}
                position="relative"
              >
                <Button
                  w="100%"
                  justifyContent="flex-start"
                  variant={isCurrentMove ? "solid" : "outline"}
                  colorScheme={isCurrentMove ? "purple" : "gray"}
                  size="sm"
                  onClick={() => jumpTo(move)}
                  bg={isCurrentMove ? activeBg : 'transparent'}
                  borderColor={isCurrentMove ? activeBorder : 'gray.200'}
                >
                  {description}
                </Button>
                
                {isCurrentMove && (
                  <Badge
                    position="absolute"
                    right="8px"
                    top="50%"
                    transform="translateY(-50%)"
                    colorScheme="purple"
                    variant="solid"
                    fontSize="xs"
                  >
                    Current
                  </Badge>
                )}
              </Box>
            );
          })}
        </VStack>
        
        {history.length <= 1 && (
          <Text color={subTextColor} textAlign="center" mt={4}>
            No moves yet. Start playing!
          </Text>
        )}
      </CardBody>
    </Card>
  );
}

export default GameHistory;