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
        name: "Equity Adult Hoodies",
        description: "Official Antwon Harris Equity program hoodies. High-quality, comfortable, and meaningful.",
        price: "45.00",
        imageUrl: "/src/assets/hoodie.webp",
        purchaseUrl: "https://baxts.square.site/product/equity-adult-hoodies/609?cp=true&sa=false&sbp=false&q=true"
      },
      {
        name: "Equity Adult Tees",
        description: "Official Antwon Harris Equity program t-shirts. Perfect for everyday wear and showing support.",
        price: "25.00",
        imageUrl: "/src/assets/tshirt.webp",
        purchaseUrl: "https://baxts.square.site/product/equity-adult-tees/608?cp=true&sa=false&sbp=false&q=true"
      },
      {
        name: "Dreaming Big",
        description: "An inspiring book about dreaming big and achieving your goals. Perfect for students and athletes.",
        price: "19.99",
        imageUrl: "/src/assets/dreaming-big.webp",
        purchaseUrl: "https://buy.stripe.com/6oU9AU1Lm3eR0im7mLdZ600"
      },
      {
        name: "DBA Children's Book",
        description: "A children's book that teaches valuable life lessons through engaging stories and illustrations.",
        price: "14.99",
        imageUrl: "/src/assets/dba-childrens-book.webp",
        purchaseUrl: "https://buy.stripe.com/6oU5kE1Lm8zb3uyfThdZ601"
      },
      {
        name: "Coloring Book",
        description: "A fun and educational coloring book for kids. Develop creativity while learning important values.",
        price: "9.99",
        imageUrl: "/src/assets/coloring-book.webp",
        purchaseUrl: "https://buy.stripe.com/cNieVe4Xy5mZ2qucH5dZ602"
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
