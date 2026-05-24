-- Индексы для оптимизации производительности базы данных

-- Индексы для таблицы users
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);
CREATE INDEX IF NOT EXISTS idx_users_updated_at ON users(updated_at);

-- Индексы для таблицы subscriptions
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_category ON subscriptions(category);
CREATE INDEX IF NOT EXISTS idx_subscriptions_is_active ON subscriptions(is_active);
CREATE INDEX IF NOT EXISTS idx_subscriptions_next_billing_date ON subscriptions(next_billing_date);
CREATE INDEX IF NOT EXISTS idx_subscriptions_amount ON subscriptions(amount);
CREATE INDEX IF NOT EXISTS idx_subscriptions_created_at ON subscriptions(created_at);
CREATE INDEX IF NOT EXISTS idx_subscriptions_updated_at ON subscriptions(updated_at);

-- Композитные индексы для часто используемых запросов
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_active ON subscriptions(user_id, is_active);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_category ON subscriptions(user_id, category);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_billing_date ON subscriptions(user_id, next_billing_date);
CREATE INDEX IF NOT EXISTS idx_subscriptions_active_billing_date ON subscriptions(is_active, next_billing_date);
CREATE INDEX IF NOT EXISTS idx_subscriptions_category_active ON subscriptions(category, is_active);

-- Индексы для таблицы billing_reminders
CREATE INDEX IF NOT EXISTS idx_billing_reminders_subscription_id ON billing_reminders(subscription_id);
CREATE INDEX IF NOT EXISTS idx_billing_reminders_reminder_date ON billing_reminders(reminder_date);
CREATE INDEX IF NOT EXISTS idx_billing_reminders_is_sent ON billing_reminders(is_sent);
CREATE INDEX IF NOT EXISTS idx_billing_reminders_subscription_date ON billing_reminders(subscription_id, reminder_date);
CREATE INDEX IF NOT EXISTS idx_billing_reminders_sent_date ON billing_reminders(is_sent, reminder_date);

-- Индексы для таблицы reports
CREATE INDEX IF NOT EXISTS idx_reports_user_id ON reports(user_id);
CREATE INDEX IF NOT EXISTS idx_reports_type ON reports(type);
CREATE INDEX IF NOT EXISTS idx_reports_created_at ON reports(created_at);
CREATE INDEX IF NOT EXISTS idx_reports_user_type ON reports(user_id, type);
CREATE INDEX IF NOT EXISTS idx_reports_user_created ON reports(user_id, created_at);

-- Индексы для таблицы audit_logs
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_audit_logs_table_name ON audit_logs(table_name);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_action ON audit_logs(user_id, action);
CREATE INDEX IF NOT EXISTS idx_audit_logs_table_action ON audit_logs(table_name, action);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_table ON audit_logs(user_id, table_name);

-- Частичный индекс для активных подписок с будущими датами
CREATE INDEX IF NOT EXISTS idx_subscriptions_active_future 
ON subscriptions(next_billing_date) 
WHERE is_active = true AND next_billing_date > CURRENT_DATE;

-- Индекс для поиска по имени подписки (текстовый поиск)
CREATE INDEX IF NOT EXISTS idx_subscriptions_name_gin 
ON subscriptions USING gin(to_tsvector('russian', name));

-- Индекс для полнотекстового поиска
CREATE INDEX IF NOT EXISTS idx_subscriptions_fulltext 
ON subscriptions USING gin(
  to_tsvector('russian', COALESCE(name, '') || ' ' || COALESCE(description, ''))
);

-- Анализ статистики индексов
SELECT 
  schemaname,
  tablename,
  indexname,
  idx_scan,
  idx_tup_read,
  idx_tup_fetch
FROM pg_stat_user_indexes 
WHERE schemaname = 'public'
ORDER BY idx_scan DESC;

-- Анализ использования индексов
SELECT 
  schemaname,
  tablename,
  indexname,
  idx_scan,
  idx_tup_read,
  idx_tup_fetch,
  pg_size_pretty(pg_relation_size(indexrelid::regclass)) AS index_size
FROM pg_stat_user_indexes 
JOIN pg_index ON pg_stat_user_indexes.indexrelid = pg_index.indexrelid
WHERE schemaname = 'public'
ORDER BY idx_scan DESC;

-- Обновление статистики таблиц для оптимизации планировщика запросов
ANALYZE users;
ANALYZE subscriptions;
ANALYZE billing_reminders;
ANALYZE reports;
ANALYZE audit_logs;

-- Проверка фрагментации таблиц
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
ORDER BY fragmentation_percentage DESC;

-- Рекомендации по созданию недостающих индексов
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
ORDER BY n_distinct DESC;
