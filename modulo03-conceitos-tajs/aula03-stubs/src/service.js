import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import fsSync from 'node:fs';

export default class Service {
  #filename;
  constructor({ filename }) {
    this.#filename = filename;
  }

  #hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
  }

  create({ username, password }) {
    const data = JSON.stringify({
      username,
      password: this.#hashPassword(password),
      createAt: new Date().toISOString()
    }).concat('\n');

    return fs.appendFile(this.#filename, data);
  }
  async read() {

    if(!fsSync.existsSync((this.#filename))) return []

    const lines = (await fs.readFile(this.#filename, 'utf-8')).split('\n').filter(line => !!line);

    if (!lines.length) return [];
    return lines.map(line => JSON.parse(line)).map(({ password, ...rest }) => ({ ...rest }));
  }
}