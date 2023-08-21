import { constants, writeFile, rename, access, mkdir } from 'fs/promises';
import { createWriteStream } from 'fs';
import { dirname, join } from 'path';

export class FileWriter {
  private path: string = '';

  setPath(path: string) {
    this.path = path;
  }

  async checkPathAccess(pathToCheck: string, constant = constants.F_OK) {
    try {
      await access(pathToCheck, constant);
      return { ok: true, err: '' };
    } catch (err) {
      return { ok: false, err };
    }
  }

  async createFile(pathToFile: string) {
    const isAvailable = await this.checkPathAccess(
      dirname(pathToFile),
      constants.F_OK,
    );
    if (isAvailable.ok) {
      return writeFile(pathToFile, '', {
        encoding: 'utf-8',
        flag: 'w',
      });
    }
    throw isAvailable.err;
  }

  async renameFile(srcFile: string, distFile: string) {
    const isAvailable = await this.checkPathAccess(srcFile, constants.F_OK);
    if (isAvailable.ok) {
      return rename(srcFile, distFile);
    }
    throw isAvailable.err;
  }

  async writeToFile(relativePathToFile: string, data: string) {
    const filePath = join(this.path, relativePathToFile);

    try {
      await access(this.path);
      const isAvailable = await this.checkPathAccess(
        dirname(filePath),
        constants.F_OK,
      );

      if (!isAvailable) {
        this.createFile(filePath);
        return;
      }

      const fileStream = createWriteStream(filePath, { flags: 'a' });

      fileStream.write(data);
      fileStream.write('\n');
      fileStream.end(data);
    } catch (err) {
      mkdir(this.path);
    }
  }

  async writeLog(data: string) {
    return this.writeToFile('/log.txt', data);
  }
}
