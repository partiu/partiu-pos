const electron = require('electron')
const {app, BrowserWindow, session} = electron

let mainWindow

function createWindow () {
	/** 
	    Cria janela principal e carrega página do sistema PDV 
	**/
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 600,
        title: 'Partiu Vantagens!',
        webPreferences: {
            partition: 'persist:xxx'
        }
    });
    mainWindow.setProgressBar(-1);
	mainWindow.setMenu(null);
    mainWindow.loadURL('https://sistema.partiuvantagens.com.br');
    mainWindow.webContents.session.clearCache(function() {});
    //mainWindow.webContents.openDevTools();
    mainWindow.on('closed', () => {
        mainWindow = null;
    })
}

function persistCookies() {
	/** 
	    Altera os cookies para persistir além da sessão  
	**/
    const ses = session.fromPartition('persist:xxx');
    ses.cookies.get({url: 'https://sistema.partiuvantagens.com.br'}, (error, cookies) => {
        let data = cookies[0],
            today = new Date();
        ses.cookies.remove('https://sistema.partiuvantagens.com.br', 'PHPSESSID', (error)=> {
            ses.cookies.set({
                url: 'https://sistema.partiuvantagens.com.br',
                name: cookies[0].name,
                value: cookies[0].value,
                expirationDate: today.setYear(today.getFullYear()+1),
                session: false
            }, (error) => {
                if (error) console.error(error);
                ses.cookies.get({url: 'https://sistema.partiuvantagens.com.br'}, (error, cookies) => {
                    //console.log(cookies)
                })

            })

        })
    })
}

/** 
	Bind nos eventos Electron
**/
app.on('ready', createWindow);

app.on('before-quit', persistCookies);

app.on('window-all-closed', () => {
    app.quit()
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
});
