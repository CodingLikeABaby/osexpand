const { app, BrowserWindow, screen, ipcMain } = require('electron');
const path = require('path');

let win;
let clip;
let clipData = "";

// Données pour l'encodeur 
let encodeData = "";


// Données pour le minibrowser
let weburl = "";
let webframe = "";


// Données pour time converter 
let convertedData = "";


// Données pour la calculette
let calcData = "";


app.whenReady().then(() => {
  const display = screen.getPrimaryDisplay();
  const { width, height } = display.workAreaSize;

  const sidebarWidth = 60;

  win = new BrowserWindow({
    width: sidebarWidth,
    height: height,
    x: width - sidebarWidth,
    y: 0,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.setResizable(false);
  win.loadFile('index.html');
});

// Fonction pour ouvrir la popup clipboard
ipcMain.on('open-clipboard', () => {
  const display = screen.getPrimaryDisplay();
  const { width, height } = display.workAreaSize;

  if (clip && !clip.isDestroyed()) {
    clip.close();
    clip = null;
  } else {
    clip = new BrowserWindow({
      width: 450,
      height: 250,
      x: width - 510,  // position par rapport à la sidebar
      y: height - 500, // tu peux ajuster
      frame: false,
      transparent: true,
      alwaysOnTop: true,
      focusable: true,
      skipTaskbar: true,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
      }
    });

    clip.loadFile('clipboard.html');

    clip.webContents.on('did-finish-load', () => {
        clip.webContents.send('load-clipboard', clipData);
    });

    // Fermer si l'utilisateur clique en dehors
    clip.on('blur', () => {
      if (clip && !clip.isDestroyed()) {
        clip.close();
        clip = null;
      }
    });
  }
});

ipcMain.on('save-clipboard', (event, data) => {
    clipData = data;
})



// Fonction pour ouvrir l'encoder
ipcMain.on('open-encoder', () => {
  const display = screen.getPrimaryDisplay();
  const { width, height } = display.workAreaSize;

  if (clip && !clip.isDestroyed()) {
    clip.close();
    clip = null;
  } else {
    clip = new BrowserWindow({
      width: 415,
      height: 108,
      x: width - 440,  // position par rapport à la sidebar
      y: height - 500, // tu peux ajuster
      frame: false,
      transparent: true,
      alwaysOnTop: true,
      focusable: true,
      skipTaskbar: true,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
      }
    });

    clip.loadFile('encoder.html');

    clip.webContents.on('did-finish-load', () => {
        clip.webContents.send('load-encoder', encodeData);
    });

    // Fermer si l'utilisateur clique en dehors
    clip.on('blur', () => {
      if (clip && !clip.isDestroyed()) {
        clip.close();
        clip = null;
      }
    });
  }
});

ipcMain.on('save-encoder', (event, data) => {
    encodeData = data;
})









// Fonction pour ouvrir le mini browser
ipcMain.on('open-web', () => {
  const display = screen.getPrimaryDisplay();
  const { width, height } = display.workAreaSize;

  if (clip && !clip.isDestroyed()) {
    clip.close();
    clip = null;
  } else {
    clip = new BrowserWindow({
      width: 700,
      height: 500,
      x: width - 760,  // position par rapport à la sidebar
      y: height - 570, // tu peux ajuster
      frame: false,
      transparent: true,
      alwaysOnTop: true,
      focusable: true,
      skipTaskbar: true,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
      }
    });

    clip.loadFile('minibrowser.html');

    clip.webContents.on('did-finish-load', () => {
        clip.webContents.send('load-web', weburl, webframe);
    });

    // Fermer si l'utilisateur clique en dehors
    clip.on('blur', () => {
      if (clip && !clip.isDestroyed()) {
        clip.close();
        clip = null;
      }
    });
  }
});

ipcMain.on('save-web', (event, data, data2) => {
    weburl = data;
    webframe = data2;
})






// Fonction pour ouvrir le time converter
ipcMain.on('open-time', () => {
  const display = screen.getPrimaryDisplay();
  const { width, height } = display.workAreaSize;

  if (clip && !clip.isDestroyed()) {
    clip.close();
    clip = null;
  } else {
    clip = new BrowserWindow({
      width: 415,
      height: 108,
      x: width - 470,  // position par rapport à la sidebar
      y: height - 500, // tu peux ajuster
      frame: false,
      transparent: true,
      alwaysOnTop: true,
      focusable: true,
      skipTaskbar: true,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
      }
    });

    clip.loadFile('timeconvert.html');

    clip.webContents.on('did-finish-load', () => {
        clip.webContents.send('load-time', convertedData);
    });

    // Fermer si l'utilisateur clique en dehors
    clip.on('blur', () => {
      if (clip && !clip.isDestroyed()) {
        clip.close();
        clip = null;
      }
    });
  }
});

ipcMain.on('save-time', (event, data) => {
    convertedData = data;
})






// Fonction pour ouvrir la calculette
ipcMain.on('open-calc', () => {
  const display = screen.getPrimaryDisplay();
  const { width, height } = display.workAreaSize;

  if (clip && !clip.isDestroyed()) {
    clip.close();
    clip = null;
  } else {
    clip = new BrowserWindow({
      width: 225,
      height: 255,
      x: width - 285,  // position par rapport à la sidebar
      y: height - 500, // tu peux ajuster
      frame: false,
      transparent: true,
      alwaysOnTop: true,
      focusable: true,
      skipTaskbar: true,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
      }
    });

    clip.loadFile('calc.html');

    clip.webContents.on('did-finish-load', () => {
        clip.webContents.send('load-calc', calcData);
    });

    // Fermer si l'utilisateur clique en dehors
    clip.on('blur', () => {
      if (clip && !clip.isDestroyed()) {
        clip.close();
        clip = null;
      }
    });
  }
});

ipcMain.on('save-calc', (event, data) => {
    calcData = data;
})
