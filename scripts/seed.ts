// scripts/seed.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Clear existing data in correct order (due to foreign keys)
  await prisma.event.deleteMany();
  await prisma.report.deleteMany();
  await prisma.user.deleteMany();
  console.log('🗑️  Cleared existing data');

  // Hash passwords for users
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Create test users first WITH PASSWORDS (NO NAME FIELD)
  const users = await prisma.user.createMany({
    data: [
      {
        id: "user_12345",
        email: "user1@example.com",
        password: hashedPassword
      },
      {
        id: "user_67890",
        email: "user2@example.com",
        password: hashedPassword
      },
      {
        id: "user_54321",
        email: "user3@example.com",
        password: hashedPassword
      },
      {
        id: "user_99999",
        email: "user4@example.com",
        password: hashedPassword
      }
    ]
  });
  console.log('👥 Created 4 test users');

  // Create test events
  await prisma.event.createMany({
    data: [
      // User 1 events
      {
        timestamp: new Date("2025-11-07T12:51:56.832Z"),
        userId: "user_12345",
        type: "page_view",
        metadata: { page: "/dashboard", duration: 45 }
      },
      {
        timestamp: new Date("2025-11-07T12:51:41.832Z"),
        userId: "user_12345",
        type: "click",
        metadata: { element: "analyze_button", section: "header" }
      },
      {
        timestamp: new Date("2025-11-07T12:51:26.832Z"),
        userId: "user_12345",
        type: "view",
        metadata: { page: "/analytics", feature: "charts" }
      },

      // User 2 events
      {
        timestamp: new Date("2025-11-07T12:51:11.832Z"),
        userId: "user_67890",
        type: "click",
        metadata: { element: "export_button", format: "csv" }
      },
      {
        timestamp: new Date("2025-11-07T12:50:56.832Z"),
        userId: "user_67890",
        type: "view",
        metadata: { page: "/reports", report_type: "weekly" }
      },

      // User 3 events  
      {
        timestamp: new Date("2025-11-07T12:50:41.832Z"),
        userId: "user_54321",
        type: "view",
        metadata: { page: "/dashboard", first_visit: true }
      },
      {
        timestamp: new Date("2025-11-07T12:50:26.832Z"),
        userId: "user_54321",
        type: "click",
        metadata: { element: "settings_menu", section: "navigation" }
      },

      // User 4 events
      {
        timestamp: new Date("2025-11-07T12:50:11.832Z"),
        userId: "user_99999",
        type: "view",
        metadata: { page: "/users", user_count: 150 }
      },
      {
        timestamp: new Date("2025-11-07T12:49:56.832Z"),
        userId: "user_99999",
        type: "view",
        metadata: { page: "/dashboard", session_length: 120 }
      },
      {
        timestamp: new Date("2025-11-07T12:49:41.832Z"),
        userId: "user_99999",
        type: "click",
        metadata: { element: "refresh_data", source: "manual" }
      },

      // Recent events for real-time testing
      {
        timestamp: new Date(Date.now() - 60000), // 1 minute ago
        userId: "user_12345",
        type: "page_view",
        metadata: { page: "/live", realtime: true }
      },
      {
        timestamp: new Date(Date.now() - 30000), // 30 seconds ago
        userId: "user_67890",
        type: "click",
        metadata: { element: "refresh", action: "manual" }
      },
      {
        timestamp: new Date(Date.now() - 10000), // 10 seconds ago
        userId: "user_54321",
        type: "view",
        metadata: { page: "/metrics", auto_update: true }
      }
    ]
  });

  console.log('✅ Created 13 sample events');

  // Create sample reports
  await prisma.report.createMany({
    data: [
      {
        title: "Weekly Analytics Summary",
        eventType: "page_view",
        userId: "user_12345"
      },
      {
        title: "User Engagement Report",
        eventType: "click",
        userId: "user_67890"
      },
      {
        title: "Platform Performance",
        eventType: "view",
        userId: "user_54321"
      }
    ]
  });

  console.log('📋 Created 3 sample reports');
  console.log('🎉 Seed completed successfully!');
  console.log('📊 PulseGrid is now ready with sample data!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });