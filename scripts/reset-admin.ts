import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { User } from '../src/users/user.schema'; // ajuste o caminho se necessário

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/fleet-manager';
const ADMIN_EMAIL = 'admin@gestorfrota.com.br';
const ADMIN_PASSWORD = 'admin123'; // altere se quiser outra senha

async function resetAdmin() {
  await mongoose.connect(MONGO_URI);
  await User.deleteOne({ email: ADMIN_EMAIL });
  const hashed = await bcrypt.hash(ADMIN_PASSWORD, 10);
  await User.create({
    email: ADMIN_EMAIL,
    password: hashed,
    role: 'ADMIN',
    name: 'Administrador',
  });
  console.log(`✅ Admin recriado → ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`);
  await mongoose.disconnect();
}

resetAdmin().catch(err => {
  console.error('❌ Erro ao resetar admin:', err);
  process.exit(1);
});
