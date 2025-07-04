import { pgTable, text, serial, integer, timestamp, json, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  role: text("role").notNull(), // 'manager' | 'rep'
  managerId: text("manager_id"),
});

export const reports = pgTable("reports", {
  id: text("id").primaryKey(),
  reporteeId: text("reportee_id").notNull(),
  managerId: text("manager_id").notNull(),
  dateStarted: timestamp("date_started").notNull(),
  dateCompleted: timestamp("date_completed"),
  status: text("status").notNull(), // 'ongoing' | 'completed'
  feedback: text("feedback"),
  kpiData: json("kpi_data"),
  recommendations: json("recommendations"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const kpiMetrics = pgTable("kpi_metrics", {
  id: text("id").primaryKey(),
  reportId: text("report_id").notNull(),
  sales: decimal("sales", { precision: 10, scale: 2 }),
  calls: integer("calls"),
  appointments: integer("appointments"),
  conversionRate: decimal("conversion_rate", { precision: 5, scale: 4 }),
  period: text("period").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const trainingRecommendations = pgTable("training_recommendations", {
  id: text("id").primaryKey(),
  reportId: text("report_id").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  reason: text("reason").notNull(),
  type: text("type").notNull(), // 'training' | 'mentoring' | 'review'
  priority: text("priority").notNull(), // 'high' | 'medium' | 'low'
  status: text("status").notNull(), // 'pending' | 'accepted' | 'ignored'
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
});

export const insertReportSchema = createInsertSchema(reports).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertKpiMetricsSchema = createInsertSchema(kpiMetrics).omit({
  id: true,
  createdAt: true,
});

export const insertTrainingRecommendationSchema = createInsertSchema(trainingRecommendations).omit({
  id: true,
  createdAt: true,
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Report = typeof reports.$inferSelect;
export type InsertReport = z.infer<typeof insertReportSchema>;
export type KpiMetric = typeof kpiMetrics.$inferSelect;
export type InsertKpiMetric = z.infer<typeof insertKpiMetricsSchema>;
export type TrainingRecommendation = typeof trainingRecommendations.$inferSelect;
export type InsertTrainingRecommendation = z.infer<typeof insertTrainingRecommendationSchema>;
