import fs from 'fs/promises';
import * as path from 'path';
const { exec } = require('child_process');


interface IConfig {
    path: string;
}

interface IUtils{
    copyFile(source: string, target: string):Promise<void>;
    rm(path: string):Promise<void>;
    rmdir(path: string):Promise<void>;
}

/**
 * Wrapper class for various file system operations.
 */
export default class NodeFSUtils {

    private _path: string;
    static utils:IUtils = fs;

    /**
     * Creates an instance of NodeFSUtils.
     * @param {IConfig} config - Configuration object containing the path.
     */
    constructor(config: IConfig) {
        this._path = path.join(__dirname, config.path);
    }

    /**
     * Create a new instance of NodeFSUtils with configuration.
     * @param {IConfig} config - Configuration object containing the path.
     * @returns {NodeFSUtils} - New instance of NodeFSUtils.
     */
    static config = (config: IConfig): NodeFSUtils => {
        return new NodeFSUtils(config);
    }

    /**
     * Read the contents of a directory.
     * @returns {Promise<string[]>} - A promise that resolves with an array of filenames.
     */
    public async readdir(): Promise<string[]> {
        try {
            const files = await fs.readdir(this._path);
            return files;
        } catch (err) {
            throw err;
        }
    }

    /**
     * Get information about a file or directory.
     * @returns {Promise<fs.Stats>} - A promise that resolves with file stats.
     */
    public async stat(): Promise<any> {
        try {
            const stats = await fs.stat(this._path);
            return stats;
        } catch (err) {
            throw err;
        }
    }

    /**
     * Get class names from a JAR file based on a pattern.
     * @param {string} classNamePattern - Pattern to filter class names.
     * @returns {Promise<string[]>} - A promise that resolves with an array of class names.
     */
    public async findClassNamesInJar(classNamePattern: any) {
        return new Promise((resolve, reject) => {
            exec(`jar tf ${this._path}`, (error: any, stdout: any, stderr: any) => {
                if (error) {
                    reject(error);
                    return;
                }

                if (stderr) {
                    console.error('Command error:', stderr);
                    reject(stderr);
                    return;
                }

                const regex = /.(Driver|HiveDriver|JDBC)$/

                const classNames = stdout.split('\n')
                    .filter((line: any) => line.endsWith('.class'))
                    .map((line: any) => line.replace(/\//g, '.').replace(/\.class$/, ''))
                    .filter((className: any) => className.includes(classNamePattern))
                    .filter((className: any) => className.match(regex)?.[1]);

                resolve(classNames);
            });
        });
    }
}
