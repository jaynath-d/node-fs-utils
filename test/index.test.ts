import fs from 'fs/promises';
const childProcess = require('child_process');
import FileSystemWrapper from '../src/index'; // Update the path to the actual location

const mockExec = jest.fn();

jest.mock('fs/promises', () => ({
  readdir: jest.fn(),
  stat: jest.fn(),
}));


jest.mock('child_process');

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

  it('readdir should throw an error', async () => {
    const expectedError = new Error('readdir should throw an error');
    (fs.readdir as jest.Mock).mockRejectedValue(expectedError);

    await expect(wrapper.readdir()).rejects.toThrow(expectedError);
  });

  it('stat should return file stats', async () => {
    const mockStats = { isFile: jest.fn(() => true) };
    (fs.stat as jest.Mock).mockResolvedValue(mockStats);
    const stats = await wrapper.stat();
    expect(stats).toBe(mockStats);
  });

  it('stat should throw an error', async () => {
    const expectedError = new Error('stat should throw an error');
    (fs.stat as jest.Mock).mockRejectedValue(expectedError);

    await expect(wrapper.stat()).rejects.toThrow(expectedError);
  });

  it('should return an array of class names matching the pattern', async () => {
    const mockStdout = `
com/example/Driver.class
com/example/OtherClass.class
com/example/HiveDriver.class
com/example/SomeClass.class
  `;

    childProcess.exec.mockImplementation((command: any, callback: any) => {
      callback(null, mockStdout, ''); // Simulate a successful execution
    });

    const classNamePattern = 'Driver';
    const expectedClassNames = ['com.example.Driver', 'com.example.HiveDriver'];

    const result = await wrapper.getClassNamesInJar(classNamePattern);

    expect(result).toEqual(expectedClassNames);
  });

  it('should reject with an error when execution fails', async () => {
    const mockError = new Error('Execution error');

    childProcess.exec.mockImplementation((command: any, callback: any) => {
      callback(mockError, '', ''); // Simulate an error during execution
    });

    const classNamePattern = 'Driver';

    await expect(wrapper.getClassNamesInJar(classNamePattern)).rejects.toThrow(mockError);

  });

  it('should reject with an error when stderr is not empty', async () => {
    const mockStderr = 'Some error message';

    childProcess.exec.mockImplementation((command: any, callback: any) => {
      callback(null, '', mockStderr); // Simulate an error in stderr
    });

    const classNamePattern = 'Driver';
    try {
      await wrapper.getClassNamesInJar(classNamePattern);
      // If the promise doesn't reject, fail the test
      fail('Expected the promise to reject.');
    } catch (error) {
      expect(error).toContain(mockStderr);
    }

  });

});
