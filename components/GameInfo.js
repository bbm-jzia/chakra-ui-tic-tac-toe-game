import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  Button,
  HStack,
  Spacer,
  useColorModeValue
} from '@chakra-ui/react';
import { RepeatIcon } from '@chakra-ui/icons';

function GameInfo({ scores, resetScores, cardBg, textColor, subTextColor }) {
  const xColor = useColorModeValue('blue.500', 'blue.300');
  const oColor = useColorModeValue('red.500', 'red.300');
  const tieColor = useColorModeValue('gray.500', 'gray.400');

  return (
    <Card bg={cardBg} boxShadow="xl" borderRadius="xl" w="100%">
      <CardHeader>
        <HStack>
          <Heading size="md" color={textColor}>
            Game Statistics
          </Heading>
          <Spacer />
          <Button
            onClick={resetScores}
            size="sm"
            leftIcon={<RepeatIcon />}
            colorScheme="red"
            variant="outline"
          >
            Reset Scores
          </Button>
        </HStack>
      </CardHeader>
      <CardBody>
        <StatGroup>
          <Stat>
            <StatLabel color={subTextColor}>Player X</StatLabel>
            <StatNumber fontSize="3xl" color={xColor}>{scores.X}</StatNumber>
            <Text color={subTextColor} fontSize="sm">Wins</Text>
          </Stat>
          
          <Stat>
            <StatLabel color={subTextColor}>Player O</StatLabel>
            <StatNumber fontSize="3xl" color={oColor}>{scores.O}</StatNumber>
            <Text color={subTextColor} fontSize="sm">Wins</Text>
          </Stat>
          
          <Stat>
            <StatLabel color={subTextColor}>Ties</StatLabel>
            <StatNumber fontSize="3xl" color={tieColor}>{scores.ties}</StatNumber>
            <Text color={subTextColor} fontSize="sm">Games</Text>
          </Stat>
        </StatGroup>
      </CardBody>
    </Card>
  );
}

export default GameInfo;