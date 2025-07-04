import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertReportSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication routes
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await storage.getUserByEmail(email);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Generate mock JWT token
      const token = `mock-jwt-${user.id}-${Date.now()}`;
      
      res.json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token
      });
    } catch (error) {
      res.status(500).json({ message: "Login failed" });
    }
  });

  // User routes
  app.get("/api/users/:id", async (req, res) => {
    try {
      const user = await storage.getUser(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to get user" });
    }
  });

  // Reports routes
  app.get("/api/reports", async (req, res) => {
    try {
      const { managerId, reporteeId } = req.query;
      
      let reports;
      if (managerId) {
        reports = await storage.getReportsByManagerId(managerId as string);
      } else if (reporteeId) {
        reports = await storage.getReportsByReporteeId(reporteeId as string);
      } else {
        return res.status(400).json({ message: "managerId or reporteeId required" });
      }

      // Enrich reports with user data
      const enrichedReports = await Promise.all(
        reports.map(async (report) => {
          const reportee = await storage.getUser(report.reporteeId);
          const manager = await storage.getUser(report.managerId);
          return {
            ...report,
            reporteeName: reportee?.name,
            managerName: manager?.name,
          };
        })
      );

      res.json(enrichedReports);
    } catch (error) {
      res.status(500).json({ message: "Failed to get reports" });
    }
  });

  app.get("/api/reports/:id", async (req, res) => {
    try {
      const report = await storage.getReport(req.params.id);
      if (!report) {
        return res.status(404).json({ message: "Report not found" });
      }

      const reportee = await storage.getUser(report.reporteeId);
      const manager = await storage.getUser(report.managerId);
      
      res.json({
        ...report,
        reporteeName: reportee?.name,
        managerName: manager?.name,
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to get report" });
    }
  });

  app.post("/api/reports", async (req, res) => {
    try {
      const validatedData = insertReportSchema.parse(req.body);
      const report = await storage.createReport(validatedData);
      res.status(201).json(report);
    } catch (error) {
      res.status(400).json({ message: "Invalid report data" });
    }
  });

  app.patch("/api/reports/:id", async (req, res) => {
    try {
      const report = await storage.updateReport(req.params.id, req.body);
      if (!report) {
        return res.status(404).json({ message: "Report not found" });
      }
      res.json(report);
    } catch (error) {
      res.status(500).json({ message: "Failed to update report" });
    }
  });

  // Recommendations routes
  app.get("/api/reports/:reportId/recommendations", async (req, res) => {
    try {
      const recommendations = await storage.getRecommendationsByReportId(req.params.reportId);
      res.json(recommendations);
    } catch (error) {
      res.status(500).json({ message: "Failed to get recommendations" });
    }
  });

  app.patch("/api/recommendations/:id", async (req, res) => {
    try {
      const recommendation = await storage.updateRecommendation(req.params.id, req.body);
      if (!recommendation) {
        return res.status(404).json({ message: "Recommendation not found" });
      }
      res.json(recommendation);
    } catch (error) {
      res.status(500).json({ message: "Failed to update recommendation" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
