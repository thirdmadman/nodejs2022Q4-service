import { GenericEntity } from 'src/generics/generic.entity';
import { v4 } from 'uuid';
import { DB, db } from '../db/db';

export class GenericRepository<TEntity extends GenericEntity> {
  private tableName: keyof DB;

  constructor(tableName: keyof DB) {
    this.tableName = tableName;
  }

  create(entity: TEntity) {
    const table = db[this.tableName] as Array<TEntity>;
    const generatedUUID = v4();
    const newEntity: TEntity = { ...entity, id: generatedUUID };
    table.push(newEntity);
    return newEntity;
  }

  findOne(id: string) {
    const table = db[this.tableName] as Array<TEntity>;
    if (table && table.length > 0) {
      const foundEntity = table.find((entity) => entity.id === id);
      if (foundEntity) {
        return { ...foundEntity };
      }
    }
    return null;
  }

  findAll() {
    const table = db[this.tableName] as Array<TEntity>;
    if (table && table.length > 0) {
      const entities = Array<TEntity>();
      for (let i = 0; table.length > i; i += 1) {
        const entity = table[i];
        if (entity) {
          entities.push({ ...entity });
        }
      }
      return entities;
    }
    return Array<TEntity>();
  }

  update(id: string, entity: TEntity) {
    const table = db[this.tableName] as Array<TEntity>;
    const index = table.findIndex((entityToFind) => entityToFind.id === id);
    if (index > -1) {
      const newEntity: TEntity = { ...entity };
      table[index] = newEntity;
      return { ...table[index] };
    }
    return null;
  }

  delete(id: string) {
    const table = db[this.tableName] as Array<TEntity>;
    const index = table.findIndex((entityToFind) => entityToFind.id === id);
    if (index > -1) {
      const oldEntity: TEntity = { ...table[index] };
      delete table[index];
      (db[this.tableName] as Array<TEntity>) = table.filter((entity) => entity);
      return oldEntity;
    }
    return null;
  }
}
