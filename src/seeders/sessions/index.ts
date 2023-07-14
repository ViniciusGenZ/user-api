import sessionTypeService from '@services/sessionType';
import { sessionData } from './data';

export async function sessionTypeSeeder() {
	const rep = sessionTypeService.repository;
	const inBd = await rep.find();

	const toBeCreated = sessionData.filter(
		(x) => !inBd.some((y) => y.name_en == x.name_en),
	);

	if (toBeCreated.length > 0)
		await rep.save(
			toBeCreated.map((item) =>
				rep.create({ ...item, created_by: 1, updated_by: 1 }),
			),
		);
}
