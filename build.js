var electronInstaller = require('electron-winstaller');
process.stderr.write = console.error;
process.stdout.write = console.log;
resultPromise = electronInstaller.createWindowsInstaller({
    appDirectory: 'dist/partiu-pos-win32-x64',
    outputDirectory: 'dist/insallers',
    authors: 'PArtiu Vantagens',
    exe: 'partiu-pos.exe'
  });

resultPromise.then(() => console.log("It worked!"), (e) => console.log(`No dice: ${e.message}`));