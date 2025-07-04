import { 
  users, reports, kpiMetrics, trainingRecommendations,
  type User, type InsertUser, 
  type Report, type InsertReport,
  type KpiMetric, type InsertKpiMetric,
  type TrainingRecommendation, type InsertTrainingRecommendation 
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Reports
  getReport(id: string): Promise<Report | undefined>;
  getReportsByManagerId(managerId: string): Promise<Report[]>;
  getReportsByReporteeId(reporteeId: string): Promise<Report[]>;
  createReport(report: InsertReport): Promise<Report>;
  updateReport(id: string, updates: Partial<Report>): Promise<Report | undefined>;
  
  // KPI Metrics
  getKpiMetricsByReportId(reportId: string): Promise<KpiMetric[]>;
  createKpiMetric(metric: InsertKpiMetric): Promise<KpiMetric>;
  
  // Training Recommendations
  getRecommendationsByReportId(reportId: string): Promise<TrainingRecommendation[]>;
  createRecommendation(recommendation: InsertTrainingRecommendation): Promise<TrainingRecommendation>;
  updateRecommendation(id: string, updates: Partial<TrainingRecommendation>): Promise<TrainingRecommendation | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private reports: Map<string, Report>;
  private kpiMetrics: Map<string, KpiMetric>;
  private trainingRecommendations: Map<string, TrainingRecommendation>;
  private currentId: number;

  constructor() {
    this.users = new Map();
    this.reports = new Map();
    this.kpiMetrics = new Map();
    this.trainingRecommendations = new Map();
    this.currentId = 1;
    this.initializeData();
  }

  private generateId(): string {
    return `ID-${this.currentId++}`;
  }

  private initializeData() {
    // Initialize sample users
    const manager: User = {
      id: "MGR-99",
      username: "manager",
      email: "manager@healthcorp.com",
      password: "password123",
      name: "Sarah Johnson",
      role: "manager",
      managerId: null,
    };

    const rep1: User = {
      id: "REP-01",
      username: "mjohnson",
      email: "mjohnson@healthcorp.com",
      password: "password123",
      name: "Michael Johnson",
      role: "rep",
      managerId: "MGR-99",
    };

    const rep2: User = {
      id: "REP-02",
      username: "ldavis",
      email: "ldavis@healthcorp.com",
      password: "password123",
      name: "Lisa Davis",
      role: "rep",
      managerId: "MGR-99",
    };

    const rep3: User = {
      id: "REP-03",
      username: "rwilson",
      email: "rwilson@healthcorp.com",
      password: "password123",
      name: "Robert Wilson",
      role: "rep",
      managerId: "MGR-99",
    };

    this.users.set(manager.id, manager);
    this.users.set(rep1.id, rep1);
    this.users.set(rep2.id, rep2);
    this.users.set(rep3.id, rep3);

    // Initialize sample reports
    const report1: Report = {
      id: "RPT-1001",
      reporteeId: "REP-01",
      managerId: "MGR-99",
      dateStarted: new Date("2025-01-15"),
      dateCompleted: null,
      status: "ongoing",
      feedback: "",
      kpiData: {
        sales: 45200,
        calls: 127,
        appointments: 24,
        conversionRate: 0.12
      },
      recommendations: [],
      createdAt: new Date("2025-01-15"),
      updatedAt: new Date("2025-01-15"),
    };

    const report2: Report = {
      id: "RPT-1002",
      reporteeId: "REP-02",
      managerId: "MGR-99",
      dateStarted: new Date("2025-01-18"),
      dateCompleted: null,
      status: "ongoing",
      feedback: "",
      kpiData: {
        sales: 68500,
        calls: 95,
        appointments: 32,
        conversionRate: 0.22
      },
      recommendations: [],
      createdAt: new Date("2025-01-18"),
      updatedAt: new Date("2025-01-18"),
    };

    const report3: Report = {
      id: "RPT-1003",
      reporteeId: "REP-03",
      managerId: "MGR-99",
      dateStarted: new Date("2025-01-20"),
      dateCompleted: null,
      status: "ongoing",
      feedback: "",
      kpiData: {
        sales: 52100,
        calls: 110,
        appointments: 28,
        conversionRate: 0.16
      },
      recommendations: [],
      createdAt: new Date("2025-01-20"),
      updatedAt: new Date("2025-01-20"),
    };

    this.reports.set(report1.id, report1);
    this.reports.set(report2.id, report2);
    this.reports.set(report3.id, report3);
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const user: User = { ...insertUser, id: this.generateId() };
    this.users.set(user.id, user);
    return user;
  }

  async getReport(id: string): Promise<Report | undefined> {
    return this.reports.get(id);
  }

  async getReportsByManagerId(managerId: string): Promise<Report[]> {
    return Array.from(this.reports.values()).filter(report => report.managerId === managerId);
  }

  async getReportsByReporteeId(reporteeId: string): Promise<Report[]> {
    return Array.from(this.reports.values()).filter(report => report.reporteeId === reporteeId);
  }

  async createReport(insertReport: InsertReport): Promise<Report> {
    const report: Report = { 
      ...insertReport, 
      id: this.generateId(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.reports.set(report.id, report);
    return report;
  }

  async updateReport(id: string, updates: Partial<Report>): Promise<Report | undefined> {
    const report = this.reports.get(id);
    if (!report) return undefined;
    
    const updatedReport = { ...report, ...updates, updatedAt: new Date() };
    this.reports.set(id, updatedReport);
    return updatedReport;
  }

  async getKpiMetricsByReportId(reportId: string): Promise<KpiMetric[]> {
    return Array.from(this.kpiMetrics.values()).filter(metric => metric.reportId === reportId);
  }

  async createKpiMetric(insertMetric: InsertKpiMetric): Promise<KpiMetric> {
    const metric: KpiMetric = { 
      ...insertMetric, 
      id: this.generateId(),
      createdAt: new Date()
    };
    this.kpiMetrics.set(metric.id, metric);
    return metric;
  }

  async getRecommendationsByReportId(reportId: string): Promise<TrainingRecommendation[]> {
    return Array.from(this.trainingRecommendations.values()).filter(rec => rec.reportId === reportId);
  }

  async createRecommendation(insertRecommendation: InsertTrainingRecommendation): Promise<TrainingRecommendation> {
    const recommendation: TrainingRecommendation = { 
      ...insertRecommendation, 
      id: this.generateId(),
      createdAt: new Date()
    };
    this.trainingRecommendations.set(recommendation.id, recommendation);
    return recommendation;
  }

  async updateRecommendation(id: string, updates: Partial<TrainingRecommendation>): Promise<TrainingRecommendation | undefined> {
    const recommendation = this.trainingRecommendations.get(id);
    if (!recommendation) return undefined;
    
    const updatedRecommendation = { ...recommendation, ...updates };
    this.trainingRecommendations.set(id, updatedRecommendation);
    return updatedRecommendation;
  }
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getReport(id: string): Promise<Report | undefined> {
    const [report] = await db.select().from(reports).where(eq(reports.id, id));
    return report || undefined;
  }

  async getReportsByManagerId(managerId: string): Promise<Report[]> {
    return await db.select().from(reports).where(eq(reports.managerId, managerId));
  }

  async getReportsByReporteeId(reporteeId: string): Promise<Report[]> {
    return await db.select().from(reports).where(eq(reports.reporteeId, reporteeId));
  }

  async createReport(insertReport: InsertReport): Promise<Report> {
    const [report] = await db
      .insert(reports)
      .values(insertReport)
      .returning();
    return report;
  }

  async updateReport(id: string, updates: Partial<Report>): Promise<Report | undefined> {
    const [report] = await db
      .update(reports)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(reports.id, id))
      .returning();
    return report || undefined;
  }

  async getKpiMetricsByReportId(reportId: string): Promise<KpiMetric[]> {
    return await db.select().from(kpiMetrics).where(eq(kpiMetrics.reportId, reportId));
  }

  async createKpiMetric(insertMetric: InsertKpiMetric): Promise<KpiMetric> {
    const [metric] = await db
      .insert(kpiMetrics)
      .values(insertMetric)
      .returning();
    return metric;
  }

  async getRecommendationsByReportId(reportId: string): Promise<TrainingRecommendation[]> {
    return await db.select().from(trainingRecommendations).where(eq(trainingRecommendations.reportId, reportId));
  }

  async createRecommendation(insertRecommendation: InsertTrainingRecommendation): Promise<TrainingRecommendation> {
    const [recommendation] = await db
      .insert(trainingRecommendations)
      .values(insertRecommendation)
      .returning();
    return recommendation;
  }

  async updateRecommendation(id: string, updates: Partial<TrainingRecommendation>): Promise<TrainingRecommendation | undefined> {
    const [recommendation] = await db
      .update(trainingRecommendations)
      .set(updates)
      .where(eq(trainingRecommendations.id, id))
      .returning();
    return recommendation || undefined;
  }
}

export const storage = new DatabaseStorage();
