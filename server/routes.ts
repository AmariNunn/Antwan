import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        organization: req.body.organization || null,
        message: req.body.message,
      };

      const validated = insertContactSchema.parse(contactData);
      
      const contact = await storage.createContact(validated);
      
      res.status(201).json({ 
        success: true, 
        message: "Contact form submitted successfully",
        contact 
      });
    } catch (error) {
      if (error && typeof error === 'object' && 'errors' in error) {
        res.status(400).json({ 
          success: false, 
          message: "Validation failed", 
          errors: (error as any).errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "An error occurred while submitting the form" 
        });
      }
    }
  });

  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while fetching contacts" 
      });
    }
  });

  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while fetching products" 
      });
    }
  });

  return httpServer;
}
