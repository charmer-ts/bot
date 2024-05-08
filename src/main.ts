import 'dotenv/config';

import CoreClient from './core/client';

export const client = new CoreClient();
client.start();
