import React from 'react'
import { 
  ChakraProvider,
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  useColorMode,
  useColorModeValue,
  Flex,
  Spacer,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  Badge
} from '@chakra-ui/react'
import { 
  MoonIcon, 
  SunIcon, 
  RepeatIcon,
  InfoIcon
} from '@chakra-ui/icons'
import GameBoard from './components/GameBoard'
import GameInfo from './components/GameInfo'
import GameHistory from './components/GameHistory'

function App() {
  const [history, setHistory] = React.useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = React.useState(0);
  const [scores, setScores] = React.useState({ X: 0, O: 0, ties: 0 });
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  
  const { colorMode, toggleColorMode } = useColorMode();
  
  // Dark mode optimized colors
  const bgGradient = useColorModeValue(
    'linear(to-br, gray.50, gray.100)',
    'linear(to-br, gray.900, gray.800)'
  );
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const subTextColor = useColorModeValue('gray.600', 'gray.300');

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    
    // Check for winner and update scores
    const winner = calculateWinner(nextSquares);
    if (winner) {
      setScores({
        ...scores,
        [winner]: scores[winner] + 1
      });
    } else if (nextHistory.length === 10) { // Board is full (9 moves + initial state)
      setScores({
        ...scores,
        ties: scores.ties + 1
      });
    }
  }

  function resetGame() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  }

  function resetScores() {
    setScores({ X: 0, O: 0, ties: 0 });
    resetGame();
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  const winner = calculateWinner(currentSquares);
  const isDraw = !winner && currentMove === 9;
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = "Game ended in a draw!";
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <ChakraProvider>
      <Box
        minH="100vh"
        bgGradient={bgGradient}
        py={8}
      >
        <Container maxW="container.xl">
          {/* Header with Dark Mode Toggle */}
          <Flex align="center" mb={8}>
            <VStack align="start" spacing={2}>
              <Heading 
                size="2xl" 
                bgGradient="linear(to-r, purple.400, pink.400)"
                bgClip="text"
                fontWeight="bold"
              >
                Tic Tac Toe
              </Heading>
              <Text fontSize="lg" color={subTextColor}>
                A classic game built with React and Chakra UI
              </Text>
            </VStack>
            <Spacer />
            <Button
              onClick={toggleColorMode}
              variant="ghost"
              size="lg"
              leftIcon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              colorScheme="purple"
            >
              {colorMode === 'light' ? 'Dark' : 'Light'}
            </Button>
          </Flex>

          {/* Main Content Grid */}
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6} mb={8}>
            {/* Game Board Card */}
            <Card bg={cardBg} boxShadow="xl" borderRadius="xl">
              <CardHeader>
                <Flex align="center" justify="space-between">
                  <Heading size="md" color={textColor}>
                    Game Board
                  </Heading>
                  <HStack>
                    <Badge 
                      colorScheme={winner ? "green" : isDraw ? "orange" : "blue"} 
                      variant="subtle" 
                      px={3} 
                      py={1} 
                      borderRadius="full"
                      fontSize="md"
                    >
                      {status}
                    </Badge>
                    <Button
                      onClick={resetGame}
                      size="sm"
                      leftIcon={<RepeatIcon />}
                      colorScheme="purple"
                      variant="outline"
                    >
                      New Game
                    </Button>
                  </HStack>
                </Flex>
              </CardHeader>
              <CardBody>
                <GameBoard 
                  squares={currentSquares}
                  xIsNext={xIsNext}
                  onPlay={handlePlay}
                  winner={winner}
                  gameEnded={winner || isDraw}
                />
              </CardBody>
            </Card>

            {/* Game Info Card */}
            <VStack spacing={6}>
              <GameInfo 
                scores={scores} 
                resetScores={resetScores}
                cardBg={cardBg}
                textColor={textColor}
                subTextColor={subTextColor}
              />
              
              <GameHistory 
                history={history}
                currentMove={currentMove}
                jumpTo={jumpTo}
                cardBg={cardBg}
                textColor={textColor}
                subTextColor={subTextColor}
              />
            </VStack>
          </SimpleGrid>

          {/* Features Section */}
          <VStack spacing={6} mt={12}>
            <Heading size="xl" textAlign="center" color={textColor}>
              Game Features
            </Heading>
            <SimpleGrid columns={{ base: 1, sm: 3 }} spacing={6} w="full">
              <Card bg={cardBg} boxShadow="xl" borderRadius="xl">
                <CardBody textAlign="center">
                  <InfoIcon boxSize={12} color="blue.400" mb={4} />
                  <Heading size="md" mb={2} color={textColor}>
                    Game History
                  </Heading>
                  <Text color={subTextColor}>
                    Track and revisit previous moves during the game
                  </Text>
                </CardBody>
              </Card>
              <Card bg={cardBg} boxShadow="xl" borderRadius="xl">
                <CardBody textAlign="center">
                  <InfoIcon boxSize={12} color="purple.400" mb={4} />
                  <Heading size="md" mb={2} color={textColor}>
                    Score Tracking
                  </Heading>
                  <Text color={subTextColor}>
                    Keep track of X wins, O wins, and ties across games
                  </Text>
                </CardBody>
              </Card>
              <Card bg={cardBg} boxShadow="xl" borderRadius="xl">
                <CardBody textAlign="center">
                  <InfoIcon boxSize={12} color="green.400" mb={4} />
                  <Heading size="md" mb={2} color={textColor}>
                    Dark Mode
                  </Heading>
                  <Text color={subTextColor}>
                    Toggle between light and dark themes for comfortable play
                  </Text>
                </CardBody>
              </Card>
            </SimpleGrid>
          </VStack>

          {/* Status Section */}
          <Box mt={8} textAlign="center">
            <Heading size="lg" mb={4} color={textColor}>
              Built With
            </Heading>
            <HStack spacing={4} justify="center" wrap="wrap">
              <Badge 
                colorScheme="green" 
                variant="subtle" 
                px={4} 
                py={2} 
                borderRadius="full"
                fontSize="sm"
              >
                React
              </Badge>
              <Badge 
                colorScheme="purple" 
                variant="subtle" 
                px={4} 
                py={2} 
                borderRadius="full"
                fontSize="sm"
              >
                Chakra UI
              </Badge>
              <Badge 
                colorScheme="blue" 
                variant="subtle" 
                px={4} 
                py={2} 
                borderRadius="full"
                fontSize="sm"
              >
                Dark Mode
              </Badge>
              <Badge 
                colorScheme="orange" 
                variant="subtle" 
                px={4} 
                py={2} 
                borderRadius="full"
                fontSize="sm"
              >
                Responsive
              </Badge>
            </HStack>
          </Box>
        </Container>
      </Box>
    </ChakraProvider>
  )
}

export default App