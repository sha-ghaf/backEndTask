const { format } = require('date-fns')
const { v4: uuid } = require('uuid')
const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')

const logEvents = async (message, logFileName) => {
    const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss')
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`
    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
        }
            await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem)
    } catch (err) {
        console.log(err)
    }
}

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log')
    console.log(`${req.method} ${req.path}`)
    next()
}

module.exports = { logEvents, logger }


// mkdir(path: fs.PathLike, options: fs.MakeDirectoryOptions & { recursive: true; }): Promise<string | undefined>

// Asynchronously creates a directory.

// The optional options argument can be an integer specifying mode (permission and sticky bits), or an object with a mode property and a recursiveproperty indicating whether parent directories should be created. CallingfsPromises.mkdir() when path is a directory that exists results in a rejection only when recursive is false.

// import { mkdir } from 'node:fs/promises';

// try {
//   const projectFolder = new URL('./test/project/', import.meta.url);
//   const createDir = await mkdir(projectFolder, { recursive: true });

//   console.log(`created ${createDir}`);
// } catch (err) {
//   console.error(err.message);
// }