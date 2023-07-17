import roleService from '@services/role';
import { rolesData } from './data';

export async function rolesSeeder() {
	const rep = roleService.repository;
	const inBd = await rep.find();

	const toBeCreated = rolesData.filter(
		(x) => !inBd.some((y) => y.name_en == x.name_en),
	);

	if (toBeCreated.length > 0)
		await rep.save(toBeCreated.map((item) => rep.create(item)));
}
