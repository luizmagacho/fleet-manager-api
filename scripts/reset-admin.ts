import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { UserSchema, UserRole } from '../src/auth/schemas/user.schema';

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/fleet-manager';
const ADMIN_EMAIL = 'admin@gestorfrota.com.br';
const ADMIN_PASSWORD = 'admin123'; // altere se quiser outra senha

const UserModel = mongoose.model('User', UserSchema);

async function resetAdmin() {
  await mongoose.connect(MONGO_URI);
  await UserModel.deleteOne({ email: ADMIN_EMAIL });
  const hashed = await bcrypt.hash(ADMIN_PASSWORD, 10);
  await UserModel.create({
    email: ADMIN_EMAIL,
    password: hashed,
    role: UserRole.ADMIN,
    name: 'Administrador',
  });
  console.log(`✅ Admin recriado → ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`);
  await mongoose.disconnect();
}

resetAdmin().catch(err => {
  console.error('❌ Erro ao resetar admin:', err);
  process.exit(1);
});
