import { seedRoles } from './roles';
import { seedUser } from './user';
import { RoleCode } from '../../database/model/Role';
import { seeder } from '../../config/envVar';
import { environment } from '../../config/envVar';
import { seedDelete } from './drop';
import '../../database';

export let seed = async (args = { clearDatabase: false }) => {
  if (args.clearDatabase) await seedDelete();
  await seedRoles([RoleCode.ADMIN, RoleCode.USER, RoleCode.DEVELOPER]);
  await seedUser(RoleCode.ADMIN, seeder.adminEmail, seeder.adminName, seeder.adminPass);
  await seedUser(
    RoleCode.DEVELOPER,
    seeder.developerEmail,
    seeder.developerName,
    seeder.developerPass,
  );
  environment !== 'test' && process.exit(1);
};

seed({ clearDatabase: environment === 'test' });
