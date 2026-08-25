const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seeding...');

  await prisma.notification.deleteMany();
  await prisma.message.deleteMany();
  await prisma.supportTicket.deleteMany();
  await prisma.auditLog.deleteMany();
  await prisma.session.deleteMany();
  await prisma.debitOrder.deleteMany();
  await prisma.paymentAttempt.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.claimNote.deleteMany();
  await prisma.claimDocument.deleteMany();
  await prisma.claim.deleteMany();
  await prisma.applicationNote.deleteMany();
  await prisma.applicationDocument.deleteMany();
  await prisma.policyBeneficiary.deleteMany();
  await prisma.beneficiary.deleteMany();
  await prisma.document.deleteMany();
  await prisma.policy.deleteMany();
  await prisma.application.deleteMany();
  await prisma.cateringEnquiry.deleteMany();
  await prisma.tombstoneEnquiry.deleteMany();
  await prisma.cashPayoutApplication.deleteMany();
  await prisma.adminProfile.deleteMany();
  await prisma.customerProfile.deleteMany();
  await prisma.user.deleteMany();
  await prisma.funeralProduct.deleteMany();
  await prisma.cateringPackage.deleteMany();
  await prisma.tombstoneProduct.deleteMany();
  await prisma.systemSetting.deleteMany();

  const basicProduct = await prisma.funeralProduct.create({
    data: {
      code: 'BASIC',
      name: 'Basic Funeral Cover',
      description: 'Essential funeral cover for individuals',
      minAge: 18,
      maxAge: 70,
      minCover: 5000,
      maxCover: 25000,
      basePremium: 49.99,
      features: ['Funeral arrangements', 'Transportation'],
      benefits: ['Up to R25,000 cover', 'Professional service'],
      isActive: true,
    },
  });

  const premiumProduct = await prisma.funeralProduct.create({
    data: {
      code: 'PREMIUM',
      name: 'Premium Funeral Cover',
      description: 'Comprehensive funeral cover with extended benefits',
      minAge: 18,
      maxAge: 70,
      minCover: 25000,
      maxCover: 100000,
      basePremium: 99.99,
      features: ['Full funeral arrangements', 'Catering', 'Flowers', 'Transport'],
      benefits: ['Up to R100,000 cover', 'Extended family coverage', 'Catering included'],
      isActive: true,
    },
  });

  await prisma.cateringPackage.create({
    data: {
      name: 'Standard Meal',
      description: 'Traditional meal service',
      servingSize: 50,
      pricePerPerson: 45,
      features: ['Main course', 'Vegetables', 'Dessert'],
      isActive: true,
    },
  });

  await prisma.cateringPackage.create({
    data: {
      name: 'Premium Catering',
      description: 'Premium three-course meal service',
      servingSize: 50,
      pricePerPerson: 75,
      features: ['Starter', 'Main course', 'Dessert', 'Beverages', 'Professional service'],
      isActive: true,
    },
  });

  await prisma.tombstoneProduct.create({
    data: {
      name: 'Granite Monument',
      description: 'Classic granite monument',
      materialType: 'Granite',
      basePrice: 3500,
      customizationOptions: ['Engraving', 'Ornaments', 'Size variations'],
      isActive: true,
    },
  });

  await prisma.tombstoneProduct.create({
    data: {
      name: 'Marble Monument',
      description: 'Elegant marble monument',
      materialType: 'Marble',
      basePrice: 4500,
      customizationOptions: ['Engraving', 'Ornaments', 'Religious symbols'],
      isActive: true,
    },
  });

  const adminPassword = await bcrypt.hash('AdminPassword123!', 10);
  const admin = await prisma.user.create({
    data: {
      email: 'admin@kganya.local',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'SUPER_ADMIN',
      status: 'ACTIVE',
      adminProfile: {
        create: {
          title: 'System Administrator',
          department: 'Administration',
          permissions: ['ALL'],
        },
      },
    },
  });

  const regularAdminPassword = await bcrypt.hash('AdminPassword123!', 10);
  await prisma.user.create({
    data: {
      email: 'support@kganya.local',
      password: regularAdminPassword,
      firstName: 'Support',
      lastName: 'Manager',
      role: 'ADMIN',
      status: 'ACTIVE',
      adminProfile: {
        create: {
          title: 'Support Manager',
          department: 'Customer Support',
          permissions: ['VIEW_APPLICATIONS', 'VIEW_CLAIMS', 'MANAGE_SUPPORT'],
        },
      },
    },
  });

  const customerPassword = await bcrypt.hash('CustomerPassword123!', 10);
  const customer = await prisma.user.create({
    data: {
      email: 'customer@example.com',
      password: customerPassword,
      firstName: 'John',
      lastName: 'Doe',
      phone: '+27123456789',
      role: 'CUSTOMER',
      status: 'ACTIVE',
      customerProfile: {
        create: {
          dateOfBirth: new Date('1980-01-15'),
          gender: 'M',
          address: '123 Main Street',
          city: 'Johannesburg',
          province: 'Gauteng',
          postalCode: '2000',
          country: 'ZA',
          occupation: 'Engineer',
          maritalStatus: 'Married',
          consentToPOPIA: true,
        },
      },
    },
  });

  await prisma.systemSetting.create({
    data: {
      key: 'COMPANY_NAME',
      value: 'Kganya Royal Funeral Services',
      category: 'BUSINESS',
      isPublic: true,
    },
  });

  await prisma.systemSetting.create({
    data: {
      key: 'COMPANY_EMAIL',
      value: 'support@kganya.local',
      category: 'BUSINESS',
      isPublic: true,
    },
  });

  await prisma.systemSetting.create({
    data: {
      key: 'COMPANY_PHONE',
      value: '+27 10 XXX XXXX',
      category: 'BUSINESS',
      isPublic: true,
    },
  });

  console.log('✓ Database seeding completed!');
  console.log('Super Admin: admin@kganya.local / AdminPassword123!');
  console.log('Regular Admin: support@kganya.local / AdminPassword123!');
  console.log('Customer: customer@example.com / CustomerPassword123!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
