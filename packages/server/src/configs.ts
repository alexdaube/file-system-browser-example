import { join } from 'path';

export const CLIENT_PATH = join(__dirname, '../../client/build');
export const CLIENT_ENTRY_POINT = join(CLIENT_PATH, 'index.html');
export const ROOT_DIRECTORY = join(__dirname, '../../../');
export const PORT = 8080;
