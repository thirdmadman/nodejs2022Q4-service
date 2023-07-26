import { GenericEntity } from 'src/generics/generic.entity';

export interface Favorites extends GenericEntity {
  artists: Array<string>; // favorite artists ids
  albums: Array<string>; // favorite albums ids
  tracks: Array<string>; // favorite tracks ids
}
