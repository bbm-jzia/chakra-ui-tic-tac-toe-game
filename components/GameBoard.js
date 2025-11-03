import React from 'react';
import { 
  Grid, 
  GridItem, 
  Box, 
  useColorModeValue
} from '@chakra-ui/react';
import Square from './Square';

function GameBoard({ squares, xIsNext, onPlay, winner, gameEnded }) {
  const borderColor = useColorModeValue('gray.300', 'gray.600');
  const hoverBg = useColorModeValue('gray.100', 'gray.700');
  
  function handleClick(i) {
    if (squares[i] || gameEnded) {
      return;
    }
    
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }

  // Find winning line to highlight
  function getWinningLine() {
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
    
    if (!winner) return null;
    
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return lines[i];
      }
    }
    return null;
  }
  
  const winningLine = getWinningLine();

  return (
    <Box maxW="400px" mx="auto">
      <Grid templateColumns="repeat(3, 1fr)" gap={3}>
        {squares.map((square, i) => (
          <GridItem key={i}>
            <Square 
              value={square} 
              onSquareClick={() => handleClick(i)}
              isWinningSquare={winningLine && winningLine.includes(i)}
              borderColor={borderColor}
              hoverBg={hoverBg}
              isDisabled={gameEnded}
            />
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}

export default GameBoard;