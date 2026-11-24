const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  const email = 'alex@pesapilot.ke';
  let user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    const passwordHash = await bcrypt.hash('PilotDemo2026!', 10);
    user = await prisma.user.create({
      data: {
        name: 'Alex Kiprono',
        email,
        password: passwordHash,
        profile: {
          create: {
            institution: 'University of Nairobi',
            course: 'BSc Computer Science',
            academicYear: 'Year 3',
            semester: 'Semester 1',
            accommodationStatus: 'Off-campus Bedsitter',
            monthlyLivingCosts: 18000,
            studentStatus: true
          }
        },
        financialAccounts: {
          create: [
            {
              name: 'M-Pesa Safaricom',
              type: 'MPESA',
              provider: 'Safaricom',
              openingBalance: 14500,
              balance: 14500,
              availableBalance: 9500,
              reservedBalance: 5000,
              isActive: true
            },
            {
              name: 'Equity Student Account',
              type: 'BANK',
              provider: 'Equity Bank',
              openingBalance: 32000,
              balance: 32000,
              availableBalance: 32000,
              reservedBalance: 0,
              isActive: true
            },
            {
              name: 'Emergency Pocket',
              type: 'SAVINGS',
              provider: 'PesaPilot Lockbox',
              openingBalance: 6500,
              balance: 6500,
              availableBalance: 6500,
              reservedBalance: 0,
              isActive: true
            }
          ]
        },
        notificationPreference: {
          create: {}
        }
      }
    });

    const mpesa = await prisma.financialAccount.findFirst({ where: { userId: user.id, type: 'MPESA' } });
    const bank = await prisma.financialAccount.findFirst({ where: { userId: user.id, type: 'BANK' } });

    if (mpesa && bank) {
      const now = new Date();
      await prisma.transaction.createMany({
        data: [
          {
            userId: user.id,
            accountId: bank.id,
            transactionType: 'INCOME',
            amount: 25000,
            category: 'HELB & Grants',
            description: 'HELB Semester upkeep disbursement',
            reference: 'HLB-99201-KE',
            transactionDate: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 6)
          },
          {
            userId: user.id,
            accountId: mpesa.id,
            transactionType: 'EXPENSE',
            amount: 4500,
            category: 'Rent & Living',
            description: 'Room deposit & utilities split',
            reference: 'QK894192M1',
            transactionDate: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 4)
          },
          {
            userId: user.id,
            accountId: mpesa.id,
            transactionType: 'EXPENSE',
            amount: 650,
            category: 'Food & Dining',
            description: 'Campus cafeteria & snacks',
            reference: 'QK910248P0',
            transactionDate: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 2)
          },
          {
            userId: user.id,
            accountId: mpesa.id,
            transactionType: 'EXPENSE',
            amount: 250,
            category: 'Transport',
            description: 'Matatu CBD to Campus express',
            reference: 'QK940121L9',
            transactionDate: new Date(now.getTime() - 1000 * 60 * 60 * 12)
          },
          {
            userId: user.id,
            accountId: mpesa.id,
            transactionType: 'INCOME',
            amount: 3000,
            category: 'Freelance & Side Hustle',
            description: 'Web design task payment',
            reference: 'QK955102X4',
            transactionDate: new Date(now.getTime() - 1000 * 60 * 60 * 5)
          }
        ]
      });
    }
    console.log('Seeded demo user:', user.email);
  } else {
    console.log('Demo user already exists:', user.email);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
