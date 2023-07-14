import { User } from '@entities/User';
import { usersData } from './data';
import userService from '@services/user';

export async function userSeeder() {
	const rep = userService.repository;
	const toCreate: Array<User> = [];

	const toBeCreated = await Promise.all(
		usersData.map(async (item) => {
			const user = await userService.list({
				limit: 1,
				offset: 0,
				filter: {
					email: item.email,
				},
			});
			if (!user) toCreate.push(userService.repository.create(item));
		}),
	);

	if (toBeCreated.length > 0) await rep.save(toCreate);
}
