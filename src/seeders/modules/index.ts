import moduleService from '@services/module';
import { modulesData } from './data';

export async function modulesSeeder() {
	const rep = moduleService.repository;
	const inBd = await rep.find();

	const toBeCreated = modulesData.filter(
		(x) => !inBd.some((y) => y.name_en == x.name_en),
	);

	if (toBeCreated.length > 0)
		await rep.save(toBeCreated.map((item) => rep.create(item)));
}
