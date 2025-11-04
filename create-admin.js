const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    console.log('🔍 Checking for existing admin user...\n');

    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: 'admin@shirtcanary.com' }
    });

    if (existingAdmin) {
      console.log('⚠️  Admin user already exists!');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('📧 Email:', existingAdmin.email);
      console.log('👤 Name:', existingAdmin.name);
      console.log('🔑 Role:', existingAdmin.role);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      
      if (existingAdmin.role !== 'ADMIN') {
        console.log('🔄 Updating user role to ADMIN...');
        await prisma.user.update({
          where: { email: 'admin@shirtcanary.com' },
          data: { role: 'ADMIN' }
        });
        console.log('✅ User role updated to ADMIN!\n');
      } else {
        console.log('ℹ️  User already has ADMIN role.\n');
      }
      
      console.log('🌐 You can login at: http://localhost:3000/login');
      console.log('🔐 Admin Dashboard: http://localhost:3000/admin/dashboard\n');
      return;
    }

    // Create new admin user
    console.log('👤 Creating new admin user...\n');
    const hashedPassword = await bcrypt.hash('Admin123!', 12);
    
    const admin = await prisma.user.create({
      data: {
        email: 'admin@shirtcanary.com',
        name: 'Admin User',
        password: hashedPassword,
        role: 'ADMIN'
      }
    });

    console.log('✅ Admin user created successfully!\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('                 ADMIN CREDENTIALS                 ');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📧 Email:    admin@shirtcanary.com');
    console.log('🔒 Password: Admin123!');
    console.log('👤 Name:     Admin User');
    console.log('🔑 Role:     ADMIN');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('🌐 Login URL:          http://localhost:3000/login');
    console.log('🔐 Admin Dashboard:    http://localhost:3000/admin/dashboard');
    console.log('📦 Product Management: http://localhost:3000/admin/products\n');
    console.log('⚠️  IMPORTANT: Change the password after first login!\n');
    
  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
    
    if (error.code === 'P2002') {
      console.log('\nℹ️  This email already exists in the database.');
      console.log('   Use Prisma Studio to check: npx prisma studio\n');
    }
  } finally {
    await prisma.$disconnect();
  }
}

// Run the function
createAdmin();
