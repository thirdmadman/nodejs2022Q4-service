import { GenericRepository } from 'src/generics/generic.repository';
import { User } from '../interfaces/user.interface';

class UserRepository extends GenericRepository<User> {}
export const userRepository = new UserRepository('user');
