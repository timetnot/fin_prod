import Database from 'better-sqlite3';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const dbPath = process.env.DATABASE_URL?.replace('file:', '') || path.join(__dirname, '../../dev.db');
const db = new Database(dbPath);

// Включаем WAL mode для лучшей производительности
db.pragma('journal_mode = WAL');

export async function initDatabase() {
  try {
    // Создаем таблицу пользователей
    db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        name TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Создаем таблицу подписок
    db.exec(`
      CREATE TABLE IF NOT EXISTS subscriptions (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        amount REAL NOT NULL,
        currency TEXT DEFAULT 'USD',
        billing_cycle TEXT NOT NULL,
        next_billing_date DATE NOT NULL,
        is_active INTEGER DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);

    // Создаем индексы
    db.exec(`
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
      CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
    `);

    console.log('SQLite database initialized successfully');
  } catch (error) {
    console.error('Database initialization failed:', error);
    throw error;
  }
}

export function closeDatabase() {
  try {
    db.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error closing database:', error);
  }
}

// Функции для работы с пользователями
export function createUser(userData: any) {
  const stmt = db.prepare(`
    INSERT INTO users (id, email, password_hash, name, created_at, updated_at)
    VALUES (?, ?, ?, ?, datetime('now'), datetime('now'))
  `);

  const user = {
    id: Date.now().toString(),
    email: userData.email,
    password_hash: userData.password_hash,
    name: userData.name
  };

  stmt.run(user.id, user.email, user.password_hash, user.name);
  return { ...user, created_at: new Date(), updated_at: new Date() };
}

export function getUserByEmail(email: string) {
  const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
  return stmt.get(email) || null;
}

export function getUserById(id: string) {
  const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
  return stmt.get(id) || null;
}

// Функции для работы с подписками
export function createSubscription(subscriptionData: any) {
  const stmt = db.prepare(`
    INSERT INTO subscriptions (
      id, user_id, name, category, amount, currency, billing_cycle,
      next_billing_date, is_active, created_at, updated_at
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
  `);

  const subscription = {
    id: Date.now().toString(),
    user_id: subscriptionData.userId,
    name: subscriptionData.name,
    category: subscriptionData.category,
    amount: subscriptionData.amount,
    currency: subscriptionData.currency || 'USD',
    billing_cycle: subscriptionData.billingCycle,
    next_billing_date: subscriptionData.nextBillingDate instanceof Date 
      ? subscriptionData.nextBillingDate.toISOString() 
      : subscriptionData.nextBillingDate,
    is_active: subscriptionData.isActive !== false ? 1 : 0
  };

  stmt.run(
    subscription.id,
    subscription.user_id,
    subscription.name,
    subscription.category,
    subscription.amount,
    subscription.currency,
    subscription.billing_cycle,
    subscription.next_billing_date,
    subscription.is_active
  );

  return { ...subscription, created_at: new Date(), updated_at: new Date() };
}

export function getSubscriptionsByUserId(userId: string) {
  const stmt = db.prepare(`
    SELECT * FROM subscriptions 
    WHERE user_id = ? 
    ORDER BY created_at DESC
  `);
  return stmt.all(userId);
}

export function getSubscriptionById(id: string) {
  const stmt = db.prepare('SELECT * FROM subscriptions WHERE id = ?');
  return stmt.get(id) || null;
}

export function deleteSubscription(id: string, userId: string) {
  const stmt = db.prepare('DELETE FROM subscriptions WHERE id = ? AND user_id = ?');
  const result = stmt.run(id, userId);
  return result.changes > 0;
}

export function updateSubscription(id: string, userId: string, updateData: any) {
  const subscription = getSubscriptionById(id) as any;
  if (!subscription || subscription.user_id !== userId) {
    return null;
  }

  const stmt = db.prepare(`
    UPDATE subscriptions 
    SET name = ?, category = ?, amount = ?, currency = ?, 
        billing_cycle = ?, next_billing_date = ?, is_active = ?, updated_at = datetime('now')
    WHERE id = ? AND user_id = ?
  `);

  stmt.run(
    updateData.name || subscription.name,
    updateData.category || subscription.category,
    updateData.amount !== undefined ? updateData.amount : subscription.amount,
    updateData.currency || subscription.currency,
    updateData.billingCycle || subscription.billing_cycle,
    updateData.nextBillingDate || subscription.next_billing_date,
    updateData.isActive !== undefined ? (updateData.isActive ? 1 : 0) : subscription.is_active,
    id,
    userId
  );

  return getSubscriptionById(id);
}
