#!/bin/bash

# Database Backup Script for Production
# Usage: ./scripts/backup-db.sh

# Configuration
DB_HOST=${DB_HOST:-localhost}
DB_PORT=${DB_PORT:-5432}
DB_NAME=${DB_NAME:-subscription_tracker_prod}
DB_USER=${DB_USER:-postgres}
BACKUP_DIR=${BACKUP_DIR:-./backups}
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="${BACKUP_DIR}/${DB_NAME}_${TIMESTAMP}.sql"

# Create backup directory if it doesn't exist
mkdir -p ${BACKUP_DIR}

echo "Starting database backup..."
echo "Database: ${DB_NAME}"
echo "Backup file: ${BACKUP_FILE}"

# Perform backup
PGPASSWORD=${DB_PASSWORD} pg_dump \
  -h ${DB_HOST} \
  -p ${DB_PORT} \
  -U ${DB_USER} \
  -d ${DB_NAME} \
  --format=plain \
  --no-owner \
  --no-acl \
  > ${BACKUP_FILE}

if [ $? -eq 0 ]; then
  echo "Backup completed successfully: ${BACKUP_FILE}"
  
  # Compress the backup
  gzip ${BACKUP_FILE}
  echo "Backup compressed: ${BACKUP_FILE}.gz"
  
  # Keep only last 7 days of backups
  find ${BACKUP_DIR} -name "${DB_NAME}_*.sql.gz" -mtime +7 -delete
  echo "Old backups removed (older than 7 days)"
else
  echo "Backup failed!"
  exit 1
fi
