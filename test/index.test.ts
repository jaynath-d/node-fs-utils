import FileSystemWrapper from '../src/index';
import fs from 'fs/promises';
const { exec } = require('child_process');

jest.mock('fs/promises', () => ({
  readdir: jest.fn(),
  stat: jest.fn(),
}));

jest.mock('child_process', () => ({
  exec: jest.fn(),
}));

describe('FileSystemWrapper', () => {
  const testPath = '.'; // Update with your test folder's path
  const wrapper = FileSystemWrapper.config({ path: testPath });

  it('readdir should return an array of filenames', async () => {
    (fs.readdir as jest.Mock).mockResolvedValue(['file1.txt', 'file2.txt']);
    const files = await wrapper.readdir();
    expect(Array.isArray(files)).toBe(true);
    files.forEach(file => {
      expect(typeof file).toBe('string');
    });
  });

  it('stat should return file stats', async () => {
    const mockStats = { isFile: jest.fn(() => true) };
    (fs.stat as jest.Mock).mockResolvedValue(mockStats);
    const stats = await wrapper.stat();
    expect(stats).toBe(mockStats);
  });

});
