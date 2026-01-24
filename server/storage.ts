import { type User, type InsertUser, type Contact, type InsertContact, type Product, type InsertProduct } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  getProducts(): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contacts: Map<string, Contact>;
  private products: Map<number, Product>;

  constructor() {
    this.users = new Map();
    this.contacts = new Map();
    this.products = new Map();
    
    // Seed initial products
    this.seedProducts();
  }

  private seedProducts() {
    const initialProducts: InsertProduct[] = [
      {
        name: "Training Sessions",
        description: "One-on-one professional athletic training tailored to your needs.",
        price: "75.00",
        imageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
        purchaseUrl: "#"
      },
      {
        name: "Performance Gear",
        description: "High-quality gear designed for maximum performance.",
        price: "45.00",
        imageUrl: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&q=80",
        purchaseUrl: "#"
      }
    ];

    initialProducts.forEach(p => this.createProduct(p));
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const contact: Contact = { 
      ...insertContact, 
      id,
      organization: insertContact.organization ?? null
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.products.size + 1;
    const product: Product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }
}

export const storage = new MemStorage();
