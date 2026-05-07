import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding...');

  // Plumbers
  const plumber1 = await prisma.user.upsert({
    where: { email: 'ion.popescu@example.com' },
    update: {},
    create: { email: 'ion.popescu@example.com', name: 'Ion Popescu', role: 'provider' },
  });
  const plumber2 = await prisma.user.upsert({
    where: { email: 'gheorghe.stan@example.com' },
    update: {},
    create: { email: 'gheorghe.stan@example.com', name: 'Gheorghe Stan', role: 'provider' },
  });
  const plumber3 = await prisma.user.upsert({
    where: { email: 'mihai.ionescu@example.com' },
    update: {},
    create: { email: 'mihai.ionescu@example.com', name: 'Mihai Ionescu', role: 'provider' },
  });

  // Electricians
  const elec1 = await prisma.user.upsert({
    where: { email: 'andrei.dumitrescu@example.com' },
    update: {},
    create: { email: 'andrei.dumitrescu@example.com', name: 'Andrei Dumitrescu', role: 'provider' },
  });
  const elec2 = await prisma.user.upsert({
    where: { email: 'cristian.popa@example.com' },
    update: {},
    create: { email: 'cristian.popa@example.com', name: 'Cristian Popa', role: 'provider' },
  });
  const elec3 = await prisma.user.upsert({
    where: { email: 'vlad.constantin@example.com' },
    update: {},
    create: { email: 'vlad.constantin@example.com', name: 'Vlad Constantin', role: 'provider' },
  });

  // Plumbing services
  await prisma.service.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'Pipe Repair & Leak Fixing',
        description: 'Fast diagnosis and repair of burst or leaking pipes. Available for emergency calls.',
        price: 120,
        providerId: plumber1.id,
      },
      {
        title: 'Bathroom Installation',
        description: 'Full bathroom fitting including toilet, sink, shower, and bathtub installation.',
        price: 350,
        providerId: plumber1.id,
      },
      {
        title: 'Drain Unblocking',
        description: 'Professional drain cleaning and unblocking using high-pressure water jetting.',
        price: 80,
        providerId: plumber2.id,
      },
      {
        title: 'Boiler Service & Repair',
        description: 'Annual boiler servicing, fault diagnosis, and emergency repair.',
        price: 150,
        providerId: plumber2.id,
      },
      {
        title: 'Water Heater Installation',
        description: 'Supply and installation of electric or gas water heaters. Old unit disposal included.',
        price: 280,
        providerId: plumber3.id,
      },
      {
        title: 'General Plumbing Inspection',
        description: 'Full home plumbing inspection with written report. Identify issues before they become expensive.',
        price: 90,
        providerId: plumber3.id,
      },
    ],
  });

  // Electrical services
  await prisma.service.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'Electrical Panel Upgrade',
        description: 'Upgrade your fuse box or consumer unit to a modern circuit breaker panel.',
        price: 400,
        providerId: elec1.id,
      },
      {
        title: 'Socket & Switch Installation',
        description: 'Install new power sockets, USB outlets, or light switches anywhere in your home.',
        price: 60,
        providerId: elec1.id,
      },
      {
        title: 'Lighting Installation',
        description: 'Install ceiling lights, spotlights, LED strips, or outdoor lighting with full wiring.',
        price: 95,
        providerId: elec2.id,
      },
      {
        title: 'EV Charger Installation',
        description: 'Home electric vehicle charger installation. Compatible with all major EV brands.',
        price: 320,
        providerId: elec2.id,
      },
      {
        title: 'Fault Finding & Repair',
        description: 'Diagnose and fix electrical faults, tripping breakers, or dead circuits.',
        price: 110,
        providerId: elec3.id,
      },
      {
        title: 'Full Home Rewire',
        description: 'Complete rewiring of older properties. Includes new consumer unit and safety certificate.',
        price: 1800,
        providerId: elec3.id,
      },
    ],
  });

  console.log('Done.');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
