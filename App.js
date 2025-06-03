import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true); // X player, O CPU
  const [scores, setScores] = useState({ player: 0, cpu: 0, draws: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [winningLine, setWinningLine] = useState([]);

  // Casos de vitória
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linha
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Coluna
    [0, 4, 8], [2, 4, 6]  // Diagonal
  ];

  // Função do jogador
  const handleCellPress = (index) => {
    if (board[index] || gameOver || !isXTurn) return;

    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);
    setIsXTurn(false);

    // Checando se o jogador ganhou
    if (checkWinner(newBoard, 'X')) {
      handleGameEnd('X');
    } else if (isBoardFull(newBoard)) {
      handleGameEnd('draw');
    }
  };

  // Inserindo lógica a CPU
  useEffect(() => {
    if (!isXTurn && !gameOver) {
      const timeoutId = setTimeout(() => {
        makeCPUMove();
      }, 500);
      
      return () => clearTimeout(timeoutId);
    }
  }, [isXTurn, gameOver]);

  // Adicionando movimento a CPU
  const makeCPUMove = () => {
    const newBoard = [...board];
    
    // Tentando vencer
    const winMove = findBestMove(newBoard, 'O');
    if (winMove !== -1) {
      newBoard[winMove] = 'O';
      setBoard(newBoard);
      setIsXTurn(true);
      
      if (checkWinner(newBoard, 'O')) {
        handleGameEnd('O');
        return;
      }
      
      if (isBoardFull(newBoard)) {
        handleGameEnd('draw');
      }
      
      return;
    }
    
    // Tentando bloquear jogadas
    const blockMove = findBestMove(newBoard, 'X');
    if (blockMove !== -1) {
      newBoard[blockMove] = 'O';
      setBoard(newBoard);
      setIsXTurn(true);
      
      if (isBoardFull(newBoard)) {
        handleGameEnd('draw');
      }
      
      return;
    }
    
    if (newBoard[4] === null) {
      newBoard[4] = 'O';
      setBoard(newBoard);
      setIsXTurn(true);
      return;
    }
    
    // Fazendo movimentos randomicos 
    const availableMoves = newBoard
      .map((cell, index) => cell === null ? index : null)
      .filter(cell => cell !== null);
      
    if (availableMoves.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableMoves.length);
      newBoard[availableMoves[randomIndex]] = 'O';
      setBoard(newBoard);
      setIsXTurn(true);
      
      if (isBoardFull(newBoard)) {
        handleGameEnd('draw');
      }
    }
  };

  // Função de jogada da CPU
  const findBestMove = (board, player) => {
    for (const combo of winningCombinations) {
      const [a, b, c] = combo;
      const cells = [board[a], board[b], board[c]];
      
      // Checagem de vitoria 
      if (cells.filter(cell => cell === player).length === 2 && 
          cells.filter(cell => cell === null).length === 1) {
        // Procurando grid vazio
        if (board[a] === null) return a;
        if (board[b] === null) return b;
        if (board[c] === null) return c;
      }
    }
    
    return -1;
  };

  // Checando vencedor
  const checkWinner = (board, player) => {
    for (const combo of winningCombinations) {
      const [a, b, c] = combo;
      if (board[a] === player && board[b] === player && board[c] === player) {
        setWinningLine(combo);
        return true;
      }
    }
    return false;
  };

  // Checar ser o tabuleiro foi completo para caso de empate
  const isBoardFull = (board) => {
    return board.every(cell => cell !== null);
  };

  // Mostrando resultado do ganhador e atribuindo ao contador de vitorias
  const handleGameEnd = (result) => {
    setGameOver(true);
    
    if (result === 'X') {
      setScores({ ...scores, player: scores.player + 1 });
    } else if (result === 'O') {
      setScores({ ...scores, cpu: scores.cpu + 1 });
    } else {
      setScores({ ...scores, draws: scores.draws + 1 });
    }
    
    // Adicionando delay ao resetar (Tempo de variancia)
    setTimeout(() => {
      resetGame();
    }, 1000);
  };

  // Função para resetar o game
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
    setGameOver(false);
    setWinningLine([]);
  };

  // Função de leitura do tabuleiro
  const renderCell = (index) => {
    const isWinningCell = winningLine.includes(index);
    
    return (
      <TouchableOpacity
        style={[
          styles.cell,
          isWinningCell && styles.winningCell
        ]}
        onPress={() => handleCellPress(index)}
        activeOpacity={0.7}
      >
        {board[index] === 'X' && (
          <Ionicons name="close" size={50} color="#3498db" />
        )}
        {board[index] === 'O' && (
          <Ionicons name="ellipse-outline" size={40} color="#e74c3c" />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <Text style={styles.title}>Jogo da Velha</Text>
      
      <View style={styles.scoreBoard}>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreLabel}>Jogador (X)</Text>
          <Text style={styles.scoreValue}>{scores.player}</Text>
        </View>
        
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreLabel}>Empate</Text>
          <Text style={styles.scoreValue}>{scores.draws}</Text>
        </View>
        
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreLabel}>CPU (O)</Text>
          <Text style={styles.scoreValue}>{scores.cpu}</Text>
        </View>
      </View>
      
      <View style={styles.status}>
        <Text style={styles.statusText}>
          {gameOver 
            ? winningLine.length > 0 
              ? (isXTurn ? "CPU Ganhou!" : "Você Ganhou!") 
              : "Empate!"
            : (isXTurn ? "Sua Vez" : "Vez da CPU...")}
        </Text>
      </View>
      
      <View style={styles.board}>
        <View style={styles.row}>
          {renderCell(0)}
          {renderCell(1)}
          {renderCell(2)}
        </View>
        <View style={styles.row}>
          {renderCell(3)}
          {renderCell(4)}
          {renderCell(5)}
        </View>
        <View style={styles.row}>
          {renderCell(6)}
          {renderCell(7)}
          {renderCell(8)}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#353535',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  scoreBoard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  scoreContainer: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    minWidth: 80,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  scoreLabel: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 5,
  },
  scoreValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  status: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  statusText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
  },
  board: {
    width: 300,
    height: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ecf0f1',
  },
  winningCell: {
    backgroundColor: '#e8f8f5',
  },
});