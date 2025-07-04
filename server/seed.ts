import { db } from "./db";
import { users, reports } from "@shared/schema";

async function seed() {
  console.log("Seeding database...");

  // Insert users
  const insertedUsers = await db.insert(users).values([
    {
      id: "MGR-99",
      username: "manager",
      email: "manager@healthcorp.com",
      password: "password123",
      name: "Sarah Johnson",
      role: "manager",
      managerId: null,
    },
    {
      id: "REP-01",
      username: "mjohnson",
      email: "mjohnson@healthcorp.com",
      password: "password123",
      name: "Michael Johnson",
      role: "rep",
      managerId: "MGR-99",
    },
    {
      id: "REP-02",
      username: "ldavis",
      email: "ldavis@healthcorp.com",
      password: "password123",
      name: "Lisa Davis",
      role: "rep",
      managerId: "MGR-99",
    },
    {
      id: "REP-03",
      username: "rwilson",
      email: "rwilson@healthcorp.com",
      password: "password123",
      name: "Robert Wilson",
      role: "rep",
      managerId: "MGR-99",
    },
  ]).returning();

  console.log(`Inserted ${insertedUsers.length} users`);

  // Insert reports
  const insertedReports = await db.insert(reports).values([
    {
      id: "RPT-1001",
      reporteeId: "REP-01",
      managerId: "MGR-99",
      dateStarted: new Date("2025-01-15"),
      dateCompleted: null,
      status: "ongoing",
      feedback: null,
      kpiData: {
        sales: 45200,
        calls: 127,
        appointments: 24,
        conversionRate: 0.12
      },
      recommendations: [],
    },
    {
      id: "RPT-1002",
      reporteeId: "REP-02",
      managerId: "MGR-99",
      dateStarted: new Date("2025-01-18"),
      dateCompleted: null,
      status: "ongoing",
      feedback: null,
      kpiData: {
        sales: 68500,
        calls: 95,
        appointments: 32,
        conversionRate: 0.22
      },
      recommendations: [],
    },
    {
      id: "RPT-1003",
      reporteeId: "REP-03",
      managerId: "MGR-99",
      dateStarted: new Date("2025-01-20"),
      dateCompleted: null,
      status: "ongoing",
      feedback: null,
      kpiData: {
        sales: 52100,
        calls: 110,
        appointments: 28,
        conversionRate: 0.16
      },
      recommendations: [],
    },
  ]).returning();

  console.log(`Inserted ${insertedReports.length} reports`);
  console.log("Database seeded successfully!");
}

seed().catch((error) => {
  console.error("Error seeding database:", error);
  process.exit(1);
});