import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';

type Pos = { x: number; y: number };

const CELL = 16;
const COLS = Math.floor(Dimensions.get('window').width / CELL);
const ROWS = Math.floor(Dimensions.get('window').height / CELL) - 5;

export default function App() {
  const [snake, setSnake] = useState<Pos[]>([{ x: 5, y: 5 }]);
  const [food, setFood] = useState<Pos>({ x: 10, y: 10 });
  const [dir, setDir] = useState<'UP'|'DOWN'|'LEFT'|'RIGHT'>('RIGHT');
  const [running, setRunning] = useState(true);

  useEffect(() => {
    const id = setInterval(() => running && move(), 150);
    return () => clearInterval(id);
  }, [snake, dir, running]);

  const move = () => {
    const head = { ...snake[0] };
    if (dir === 'UP') head.y -= 1;
    if (dir === 'DOWN') head.y += 1;
    if (dir === 'LEFT') head.x -= 1;
    if (dir === 'RIGHT') head.x += 1;

    // wrap around
    head.x = (head.x + COLS) % COLS;
    head.y = (head.y + ROWS) % ROWS;

    const newSnake = [head, ...snake];
    if (head.x === food.x && head.y === food.y) {
      setFood({ x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) });
    } else {
      newSnake.pop();
    }
    setSnake(newSnake);
  };

  const reset = () => {
    setSnake([{ x: 5, y: 5 }]);
    setFood({ x: 10, y: 10 });
    setDir('RIGHT');
    setRunning(true);
  };

  return (
    <View style={styles.container}>
      {snake.map((s, i) => (
        <View key={i} style={[styles.cell, { left: s.x * CELL, top: s.y * CELL }]} />
      ))}
      <View style={[styles.food, { left: food.x * CELL, top: food.y * CELL }]} />
      <View style={styles.controls}>
        <TouchableOpacity onPress={() => setDir('UP')} style={styles.btn}><Text>⬆️</Text></TouchableOpacity>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => setDir('LEFT')} style={styles.btn}><Text>⬅️</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => setDir('RIGHT')} style={styles.btn}><Text>➡️</Text></TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => setDir('DOWN')} style={styles.btn}><Text>⬇️</Text></TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => setRunning(r => !r)} style={styles.controlBtn}><Text>{running ? 'Pause' : 'Resume'}</Text></TouchableOpacity>
        <TouchableOpacity onPress={reset} style={styles.controlBtn}><Text>Reset</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  cell: { position: 'absolute', width: CELL, height: CELL, backgroundColor: 'lime' },
  food: { position: 'absolute', width: CELL, height: CELL, backgroundColor: 'red' },
  controls: { position: 'absolute', bottom: 100, left: 20 },
  btn: { padding: 10, margin: 5, backgroundColor: '#fff', borderRadius: 6 },
  footer: { position: 'absolute', bottom: 20, left: 20, flexDirection: 'row' },
  controlBtn: { padding: 10, marginRight: 10, backgroundColor: '#fff', borderRadius: 6 },
});
