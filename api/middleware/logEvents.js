import {format} from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs'
import {default as fsWithCallbacks} from 'fs'
const fsPromises = fsWithCallbacks.promises
import path from 'path';

const logEvents = async (message, logName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuidv4()}\t${message}\n`;

    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
        }

        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logName), logItem);
    } catch (err) {
        console.log(err);
    }
}

const logger = (req, res, next) => {
    logEvents(`${req?.method}\t${req?.headers.origin}\t${req?.url}`, 'reqLog.txt');
    console.log(`${req?.method} ${req?.path}`);
    next();
}

export default logger;