import { PrismaClient } from '@prisma/client';
import type { ReportInput } from '@pulsegrid/types';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export async function createReport(input: ReportInput & { userId: string }) {
  try {
    const report = await prisma.report.create({
      data: {
        title: input.title,
        eventType: input.eventType || null,
        userId: input.userId,
      },
    });
    return report;
  } catch (error) {
    console.error('Failed to create report:', error);
    throw error;
  }
}

// Express route handler
export const createReportRoute = async (req: Request, res: Response) => {
  try {
    // Properly type the request body
    const body = req.body as ReportInput & { userId?: string };
    
    // Validate required fields
    if (!body.title) {
      return res.status(400).json({ 
        success: false,
        error: 'Missing required field: title' 
      });
    }

    // Ensure userId is provided
    if (!body.userId) {
      return res.status(400).json({
        success: false,
        error: 'Missing required field: userId'
      });
    }

    const report = await createReport({
      title: body.title,
      eventType: body.eventType,
      userId: body.userId
    });
    
    res.status(201).json({
      success: true,
      data: report
    });
  } catch (error) {
    console.error('Report creation error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to create report' 
    });
  }
};

// Optional: Get all reports
export const getReportsRoute = async (req: Request, res: Response) => {
  try {
    const reports = await prisma.report.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            email: true
          }
        }
      }
    });
    
    res.json({
      success: true,
      data: reports
    });
  } catch (error) {
    console.error('Get reports error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch reports' 
    });
  }
};

// Optional: Get reports by user
export const getReportsByUserRoute = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    
    const reports = await prisma.report.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
    
    res.json({
      success: true,
      data: reports
    });
  } catch (error) {
    console.error('Get user reports error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch user reports' 
    });
  }
};