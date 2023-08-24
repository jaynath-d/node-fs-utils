import fs from '../src/index';

describe('node_fs_kit', () => {

    // Tests that the function successfully reads the directory and returns a list of files
    it('should return a list of files when the directory is successfully read', async () => {
      // Mock the fs.readdir function to return a predefined list of files
      const mockReaddir = jest.spyOn(fs, 'readdir').mockResolvedValue(['file1.txt', 'file2.txt', 'file3.txt']);

      // Expect the fs.readdir function to have been called with the correct path
      expect(mockReaddir).toHaveBeenCalledWith({ path: '../drivers/' });
    });

    // Tests that the function successfully retrieves class names from a jar file and returns them
    it('should return class names from the jar file when successfully retrieved', async () => {
      // Mock the fs.getClassNamesInJar function to return a predefined list of class names
      const mockGetClassNamesInJar = jest.spyOn(fs, 'getClassNamesInJar').mockResolvedValue(['com.example.Class1', 'com.example.Class2']);

      // Expect the fs.getClassNamesInJar function to have been called with the correct jar path and class name pattern
      expect(mockGetClassNamesInJar).toHaveBeenCalledWith('postgresql');
    });

    // Tests that the function returns an empty array if no class names match the provided pattern
    it('should return an empty array when no class names match the provided pattern', async () => {
      // Mock the fs.getClassNamesInJar function to return an empty array
      const mockGetClassNamesInJar = jest.spyOn(fs, 'getClassNamesInJar').mockResolvedValue([]);

      // Expect the fs.getClassNamesInJar function to have been called with the correct jar path and class name pattern
      expect(mockGetClassNamesInJar).toHaveBeenCalledWith('postgresql');
    });

    // Tests that the function returns an empty array if no class names end with Driver, HiveDriver, or JDBC
    it('should return an empty array when no class names end with Driver, HiveDriver, or JDBC', async () => {
      // Mock the fs.getClassNamesInJar function to return a list of class names that do not end with Driver, HiveDriver, or JDBC
      const mockGetClassNamesInJar = jest.spyOn(fs, 'getClassNamesInJar').mockResolvedValue(['com.example.Class1', 'com.example.Class2']);

      // Expect the fs.getClassNamesInJar function to have been called with the correct jar path and class name pattern
      expect(mockGetClassNamesInJar).toHaveBeenCalledWith('postgresql');
    });

    
    // Tests that the function filters out class names that do not match the provided pattern and do not end with Driver, HiveDriver, or JDBC
    it('should filter out class names that do not match the provided pattern and do not end with Driver, HiveDriver, or JDBC', async () => {
      // Mock the fs.getClassNamesInJar function to return a list of class names that do not match the provided pattern and do not end with Driver, HiveDriver, or JDBC
      const mockGetClassNamesInJar = jest.spyOn(fs, 'getClassNamesInJar').mockResolvedValue(['com.example.Class1', 'com.example.Class2']);

      // Expect the fs.getClassNamesInJar function to have been called with the correct jar path and class name pattern
      expect(mockGetClassNamesInJar).toHaveBeenCalledWith('postgresql');
    });
});

