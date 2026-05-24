import { Pool } from 'pg';

export class IndexManager {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async createIndexes(): Promise<void> {
    console.log('Creating database indexes...');
    
    try {
      // Создаем индексы для пользователей
      await this.createUserIndexes();
      
      // Создаем индексы для подписок
      await this.createSubscriptionIndexes();
      
      // Создаем индексы для напоминаний
      await this.createReminderIndexes();
      
      // Создаем индексы для отчетов
      await this.createReportIndexes();
      
      // Создаем индексы для аудита
      await this.createAuditIndexes();
      
      // Обновляем статистику
      await this.updateStatistics();
      
      console.log('All indexes created successfully');
    } catch (error) {
      console.error('Error creating indexes:', error);
      throw error;
    }
  }

  private async createUserIndexes(): Promise<void> {
    const queries = [
      'CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)',
      'CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at)',
      'CREATE INDEX IF NOT EXISTS idx_users_updated_at ON users(updated_at)'
    ];

    for (const query of queries) {
      await this.pool.query(query);
    }
  }

  private async createSubscriptionIndexes(): Promise<void> {
    const queries = [
      'CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id)',
      'CREATE INDEX IF NOT EXISTS idx_subscriptions_category ON subscriptions(category)',
      'CREATE INDEX IF NOT EXISTS idx_subscriptions_is_active ON subscriptions(is_active)',
      'CREATE INDEX IF NOT EXISTS idx_subscriptions_next_billing_date ON subscriptions(next_billing_date)',
      'CREATE INDEX IF NOT EXISTS idx_subscriptions_amount ON subscriptions(amount)',
      'CREATE INDEX IF NOT EXISTS idx_subscriptions_created_at ON subscriptions(created_at)',
      'CREATE INDEX IF NOT EXISTS idx_subscriptions_updated_at ON subscriptions(updated_at)',
      
      // Композитные индексы
      'CREATE INDEX IF NOT EXISTS idx_subscriptions_user_active ON subscriptions(user_id, is_active)',
      'CREATE INDEX IF NOT EXISTS idx_subscriptions_user_category ON subscriptions(user_id, category)',
      'CREATE INDEX IF NOT EXISTS idx_subscriptions_user_billing_date ON subscriptions(user_id, next_billing_date)',
      'CREATE INDEX IF NOT EXISTS idx_subscriptions_active_billing_date ON subscriptions(is_active, next_billing_date)',
      'CREATE INDEX IF NOT EXISTS idx_subscriptions_category_active ON subscriptions(category, is_active)'
    ];

    for (const query of queries) {
      await this.pool.query(query);
    }
  }

  private async createReminderIndexes(): Promise<void> {
    const queries = [
      'CREATE INDEX IF NOT EXISTS idx_billing_reminders_subscription_id ON billing_reminders(subscription_id)',
      'CREATE INDEX IF NOT EXISTS idx_billing_reminders_reminder_date ON billing_reminders(reminder_date)',
      'CREATE INDEX IF NOT EXISTS idx_billing_reminders_is_sent ON billing_reminders(is_sent)',
      'CREATE INDEX IF NOT EXISTS idx_billing_reminders_subscription_date ON billing_reminders(subscription_id, reminder_date)',
      'CREATE INDEX IF NOT EXISTS idx_billing_reminders_sent_date ON billing_reminders(is_sent, reminder_date)'
    ];

    for (const query of queries) {
      await this.pool.query(query);
    }
  }

  private async createReportIndexes(): Promise<void> {
    const queries = [
      'CREATE INDEX IF NOT EXISTS idx_reports_user_id ON reports(user_id)',
      'CREATE INDEX IF NOT EXISTS idx_reports_type ON reports(type)',
      'CREATE INDEX IF NOT EXISTS idx_reports_created_at ON reports(created_at)',
      'CREATE INDEX IF NOT EXISTS idx_reports_user_type ON reports(user_id, type)',
      'CREATE INDEX IF NOT EXISTS idx_reports_user_created ON reports(user_id, created_at)'
    ];

    for (const query of queries) {
      await this.pool.query(query);
    }
  }

  private async createAuditIndexes(): Promise<void> {
    const queries = [
      'CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id)',
      'CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs(action)',
      'CREATE INDEX IF NOT EXISTS idx_audit_logs_table_name ON audit_logs(table_name)',
      'CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at)',
      'CREATE INDEX IF NOT EXISTS idx_audit_logs_user_action ON audit_logs(user_id, action)',
      'CREATE INDEX IF NOT EXISTS idx_audit_logs_table_action ON audit_logs(table_name, action)',
      'CREATE INDEX IF NOT EXISTS idx_audit_logs_user_table ON audit_logs(user_id, table_name)'
    ];

    for (const query of queries) {
      await this.pool.query(query);
    }
  }

  private async updateStatistics(): Promise<void> {
    const queries = [
      'ANALYZE users',
      'ANALYZE subscriptions',
      'ANALYZE billing_reminders',
      'ANALYZE reports',
      'ANALYZE audit_logs'
    ];

    for (const query of queries) {
      await this.pool.query(query);
    }
  }

  async analyzeIndexUsage(): Promise<any[]> {
    const query = `
      SELECT 
        schemaname,
        tablename,
        indexname,
        idx_scan,
        idx_tup_read,
        idx_tup_fetch,
        pg_size_pretty(pg_relation_size(indexrelid::regclass)) AS index_size
      FROM pg_stat_user_indexes 
      WHERE schemaname = 'public'
      ORDER BY idx_scan DESC
    `;

    const result = await this.pool.query(query);
    return result.rows;
  }

  async analyzeTableFragmentation(): Promise<any[]> {
    const query = `
      SELECT 
        schemaname,
        tablename,
        ROUND(
          ((
                (pg_total_relation_size(schemaname||'.'||tablename) - 
                pg_relation_size(schemaname||'.'||tablename)
              )::NUMERIC / 
            pg_total_relation_size(schemaname||'.'||tablename) * 100
          ), 2
        ) AS fragmentation_percentage
      FROM pg_tables 
      WHERE schemaname = 'public'
        AND pg_total_relation_size(schemaname||'.'||tablename) > 0
      ORDER BY fragmentation_percentage DESC
    `;

    const result = await this.pool.query(query);
    return result.rows;
  }

  async recommendIndexes(): Promise<any[]> {
    const query = `
      SELECT 
        schemaname,
        tablename,
        attname,
        n_distinct,
        correlation
      FROM pg_stats 
      WHERE schemaname = 'public'
        AND n_distinct > 100
        AND correlation < 0.1
      ORDER BY n_distinct DESC
    `;

    const result = await this.pool.query(query);
    return result.rows;
  }

  async getSlowQueries(): Promise<any[]> {
    const query = `
      SELECT 
        query,
        calls,
        total_time,
        mean_time,
        rows
      FROM pg_stat_statements 
      WHERE calls > 10 
        AND mean_time > 100
      ORDER BY mean_time DESC
      LIMIT 10
    `;

    const result = await this.pool.query(query);
    return result.rows;
  }

  async optimizeDatabase(): Promise<void> {
    console.log('Optimizing database...');
    
    try {
      // Анализируем использование индексов
      const indexUsage = await this.analyzeIndexUsage();
      console.log('Index usage:', indexUsage);
      
      // Анализируем фрагментацию
      const fragmentation = await this.analyzeTableFragmentation();
      console.log('Table fragmentation:', fragmentation);
      
      // Получаем рекомендации
      const recommendations = await this.recommendIndexes();
      console.log('Index recommendations:', recommendations);
      
      // Получаем медленные запросы
      const slowQueries = await this.getSlowQueries();
      console.log('Slow queries:', slowQueries);
      
      console.log('Database optimization completed');
    } catch (error) {
      console.error('Error optimizing database:', error);
      throw error;
    }
  }

  async createPartialIndexes(): Promise<void> {
    // Частичный индекс для активных подписок с будущими датами
    const query = `
      CREATE INDEX IF NOT EXISTS idx_subscriptions_active_future 
      ON subscriptions(next_billing_date) 
      WHERE is_active = true AND next_billing_date > CURRENT_DATE
    `;
    
    await this.pool.query(query);
  }

  async createTextSearchIndexes(): Promise<void> {
    // Индекс для полнотекстового поиска
    const queries = [
      `
        CREATE INDEX IF NOT EXISTS idx_subscriptions_name_gin 
        ON subscriptions USING gin(to_tsvector('russian', name))
      `,
      `
        CREATE INDEX IF NOT EXISTS idx_subscriptions_fulltext 
        ON subscriptions USING gin(
          to_tsvector('russian', COALESCE(name, '') || ' ' || COALESCE(description, ''))
        )
      `
    ];

    for (const query of queries) {
      await this.pool.query(query);
    }
  }
}
