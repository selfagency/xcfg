import fs from 'fs/promises';
import os from 'os';
import path from 'path';

const DIR_MODE = 0o0700;
const FILE_MODE = 0o0600;

type Options = {
  confdir?: string;
  dir_mode?: number;
  file_mode?: number;
  filename?: string;
  minify?: boolean;
};

/**
 * Xcfg class
 */
class Xcfg {
  private readonly _file_mode: number;

  private readonly _file_path: string;

  private readonly _id: string;

  private readonly _minify: boolean;

  _data: Record<string, unknown>;

  constructor(id: string, options: Options = {}) {
    this._id = id.replace(/[/?<>\\:*|" :]/g, '.').replace(/\.+/g, '.');

    const confDir = options.confdir ?? '.config';
    const filename = options.filename ?? 'config.json';
    this._file_mode = options.file_mode ?? FILE_MODE;
    this._minify = Boolean(options.minify);

    const dirParts = [os.homedir(), confDir, this._id];
    const dirPath = path.join(...dirParts);
    this._file_path = path.join(dirPath, filename);

    this._data = {};
  }

  static async create(id: string, options: Options = {}) {
    const instance = new Xcfg(id, options);

    const confDir = options.confdir ?? '.config';
    const dirMode = options.dir_mode ?? DIR_MODE;
    const dirParts = [os.homedir(), confDir, instance._id];
    const dirPath = path.join(...dirParts);

    await instance.initDir(dirPath, dirMode);
    await instance.initFile(instance._file_path);
    return instance;
  }

  private checkKey(method: string, key: string): void {
    if (!key || typeof key !== 'string') {
      throw new Error(`Xcfg ${method}() key must be a string`);
    }
  }

  del(key: string, shouldSave = false): Promise<void> {
    this.checkKey('del', key);
    delete this._data[key];
    if (shouldSave) {
      return this.save();
    }
    return Promise.resolve();
  }

  deleteAll(shouldSave = false): Promise<void> {
    this._data = {};
    if (shouldSave) {
      return this.save();
    }
    return Promise.resolve();
  }

  get(key: string): unknown {
    this.checkKey('get', key);
    return this._data[key];
  }

  id(): string {
    return this._id;
  }

  async initDir(dirPath: string, dirMode: number): Promise<void> {
    try {
      await fs.access(dirPath);
    } catch {
      await fs.mkdir(dirPath, { mode: dirMode, recursive: true });
    }
  }

  async initFile(filePath: string): Promise<void> {
    try {
      await fs.access(filePath);
    } catch {
      await fs.writeFile(filePath, '', { mode: this._file_mode });
    }
  }

  async save(): Promise<void> {
    const saveData = this._minify ? JSON.stringify(this._data) : JSON.stringify(this._data, null, 2);
    await fs.writeFile(this._file_path, saveData, { flag: 'w', mode: this._file_mode });
  }

  set(key: string, value: unknown = '', shouldSave = false): Promise<void> {
    this.checkKey('set', key);
    this._data[key] = value;
    if (shouldSave) {
      return this.save();
    }
    return Promise.resolve();
  }
}

export default Xcfg;
