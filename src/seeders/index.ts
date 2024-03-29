import { rolesSeeder } from './roles';
import { sessionTypeSeeder } from './sessions';
import { userSeeder } from './users';

export async function seeder() {
	await Promise.all([rolesSeeder(), sessionTypeSeeder(), userSeeder()]);
}
