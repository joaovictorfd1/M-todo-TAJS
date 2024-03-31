import { describe, it, beforeEach, jest, expect } from '@jest/globals';
import Service from '../src/service.js';
import fs from 'node:fs/promises';
import fsSync from 'node:fs';

describe('Service Test Suite', () => {
  let _service;
  const filename = 'testfile.ndjson';
  beforeEach(() => {
    _service = new Service({
      filename,
    });
  });

  describe('#read', () => {

    it('should be exist file', async () => {
      jest.spyOn(fsSync, fsSync.existsSync.name).mockResolvedValue(true)
    })

    it('should return an empty array if the file is empty', async () => {
      jest.spyOn(
        fs,
        fs.readFile.name
      ).mockResolvedValue('');

      const result = await _service.read();
      expect(result).toEqual([]);
    });

    it('should return users without password if file contains users', async () => {

      // AAA -> Arrange, Act, Assert

      //Arrange
      const dbData = [
        {
          username: 'user1',
          password: 'pass1',
          createAt: new Date().toISOString(),
        },
        {
          username: 'user2',
          password: 'pass2',
          createAt: new Date().toISOString(),
        },
      ];

      const fileContents = dbData.map(item => JSON.stringify(item).concat('\n')).join('');
      jest.spyOn(fs, 'readFile').mockResolvedValue(fileContents);

      // Act
      const result = await _service.read();

      //Assert
      const expected = dbData.map(({ password, ...rest }) => ({ ...rest }));
      expect(result).toEqual(expected)


    });
  });
});
