// scripts/dev-reload.js
import { spawn } from 'child_process';
import chokidar from 'chokidar';
import electronPath from 'electron'
import path from 'path';
const entry = path.resolve('dist', 'main.js');

let electronProcess = null;

function startElectron() {
  if (electronProcess) {
    electronProcess.kill();
  }

  electronProcess = spawn(electronPath, [entry], {
    stdio: 'inherit',
  });
}

chokidar.watch(entry).on('change', () => {
  console.log('[dev] Restarting Electron...');
  startElectron();
});

const watcher = chokidar.watch('dist');
watcher.on('all', (event, path) => {
  startElectron();
})

console.log('[dev] Starting Electron...');
startElectron()