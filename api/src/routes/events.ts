import { PrismaClient } from '@prisma/client';
import type { EventInput } from '@pulsegrid/types';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export async function createEvent(e: EventInput) {
  try {
    // Handle timestamp conversion properly
    const timestamp = e.timestamp 
      ? new Date(e.timestamp) 
      : new Date();

    const event = await prisma.event.create({
      data: {
        type: e.type,
        userId: e.userId,
        timestamp: timestamp,
        metadata: e.metadata || {},
      },
    });
    return event;
  } catch (error) {
    console.error('Failed to create event:', error);
    throw error;
  }
}

// Express route handler
export const createEventRoute = async (req: Request, res: Response) => {
  try {
    const eventData: EventInput = req.body;
    
    // Validate required fields
    if (!eventData.type || !eventData.userId) {
      return res.status(400).json({ 
        success: false,
        error: 'Missing required fields: type and userId' 
      });
    }

    const event = await createEvent(eventData);
    
    res.status(201).json({
      success: true,
      data: event
    });
  } catch (error) {
    console.error('Event creation error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to create event' 
    });
  }
};

// Optional: Get all events
export const getEventsRoute = async (req: Request, res: Response) => {
  try {
    const events = await prisma.event.findMany({
      orderBy: { timestamp: 'desc' },
      take: 100 // Limit results
    });
    
    res.json({
      success: true,
      data: events
    });
  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch events' 
    });
  }
};

// Optional: Get events by user
export const getEventsByUserRoute = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    
    const events = await prisma.event.findMany({
      where: { userId },
      orderBy: { timestamp: 'desc' },
      take: 50
    });
    
    res.json({
      success: true,
      data: events
    });
  } catch (error) {
    console.error('Get user events error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch user events' 
    });
  }
};