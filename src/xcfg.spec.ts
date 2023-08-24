import Xcfg from './xcfg';
import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs/promises';

const id = 'agency.self.xcfg';
const configDir = path.join(os.homedir(), '.config', id);
const configPath = path.join(configDir, 'config.json');

describe('Xcfg class', () => {
  let xcfg: Xcfg;

  beforeAll(async () => {
    xcfg = await Xcfg.create(id);
  });

  describe('new Xcfg()', () => {
    it('instance init', () => {
      expect(xcfg).toBeDefined();
    });

    it('config directory and file creation', async () => {
      await fs.access(configPath);
    });
  });

  describe('- get()', () => {
    it('return proper value after set()', () => {
      xcfg.set('bar', 'foo');
      expect(xcfg.get('bar')).toBe('foo');
    });
  });

  describe('- set()', () => {
    it('in memory set()', () => {
      xcfg.set('foo', 'bar');
      expect(xcfg._data.foo).toBe('bar');
    });

    it('save after set()', async () => {
      await xcfg.set('foo', 'bar', true);
      const jsonData = JSON.parse(await readConfig());
      expect(jsonData.foo).toBe('bar');
    });
  });

  describe('- del()', () => {
    it('in memory del()', () => {
      xcfg.set('foo', 'bar');
      xcfg.del('foo');
      expect(xcfg._data.foo).toBeUndefined();
    });

    it('save after del()', async () => {
      await xcfg.set('foo', 'bar', true);
      await xcfg.del('foo', true);
      const jsonData = JSON.parse(await readConfig());
      expect(jsonData.foo).toBeUndefined();
    });
  });

  describe('- save()', () => {
    it('verify file contents after save()', async () => {
      xcfg.set('foo', 'bar');
      xcfg.set('bar', 'foo');
      await xcfg.save();
      const jsonData = JSON.parse(await readConfig());
      expect(jsonData.foo).toBe('bar');
      expect(jsonData.bar).toBe('foo');
    });
  });

  describe('- deleteAll()', () => {
    it('in memory deleteAll()', () => {
      xcfg.set('foo', 'bar');
      xcfg.set('bar', 'foo');
      xcfg.deleteAll();
      expect(xcfg._data.foo).toBeUndefined();
      expect(xcfg._data.bar).toBeUndefined();
    });

    it('save after deleteAll()', async () => {
      await xcfg.set('foo', 'bar');
      await xcfg.set('bar', 'foo', true);
      await xcfg.deleteAll(true);
      const jsonData = JSON.parse(await readConfig());
      expect(jsonData.foo).toBeUndefined();
      expect(jsonData.bar).toBeUndefined();
    });
  });

  afterAll(cleanUp);
});

async function readConfig() {
  const data = await fs.readFile(configPath, { encoding: 'utf-8' });
  return data;
}

async function cleanUp() {
  await fs.unlink(configPath);
  await fs.rmdir(configDir);
}
