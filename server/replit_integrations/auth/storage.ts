import { users, type User, type UpsertUser } from "@shared/models/auth";
import { db } from "../../db";
import { eq, sql } from "drizzle-orm";

export interface IAuthStorage {
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  getCredits(id: string): Promise<number>;
  deductCredit(id: string): Promise<number>;
}

class AuthStorage implements IAuthStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values({ ...userData, credits: 3 })
      .onConflictDoUpdate({
        target: users.id,
        set: {
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          profileImageUrl: userData.profileImageUrl,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async getCredits(id: string): Promise<number> {
    const [user] = await db
      .select({ credits: users.credits })
      .from(users)
      .where(eq(users.id, id));
    return user?.credits ?? 0;
  }

  async deductCredit(id: string): Promise<number> {
    const [updated] = await db
      .update(users)
      .set({ credits: sql`GREATEST(${users.credits} - 1, 0)` })
      .where(eq(users.id, id))
      .returning({ credits: users.credits });
    return updated?.credits ?? 0;
  }
}

export const authStorage = new AuthStorage();
