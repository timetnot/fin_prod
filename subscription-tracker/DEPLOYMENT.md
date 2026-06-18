# Production Deployment Guide

This guide explains how to deploy the Subscription Tracker application to production.

## Prerequisites

- VPS or server with at least 2GB RAM and 20GB disk space
- Domain name pointed to your server
- Docker and Docker Compose installed
- SSH access to the server

## Quick Deployment Steps

### 1. Prepare the Server

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Clone repository
git clone <your-repo-url>
cd subscription-tracker
```

### 2. Configure Environment Variables

```bash
# Copy production environment file
cp backend/.env.production backend/.env

# Edit the file with your actual values
nano backend/.env
```

**Important variables to change:**
- `DATABASE_URL`: Use secure password
- `JWT_SECRET`: Generate a secure random string (min 32 chars)
- `SMTP_*`: Configure your email service
- `NEXT_PUBLIC_API_URL`: Your actual domain

### 3. Setup SSL Certificates

```bash
# Run SSL setup script
./scripts/setup-ssl.sh yourdomain.com
```

This will:
- Install certbot
- Obtain Let's Encrypt SSL certificates
- Configure auto-renewal
- Copy certificates to nginx/ssl/

### 4. Update Nginx Configuration

Edit `nginx/nginx.conf` and replace `yourdomain.com` with your actual domain:

```bash
nano nginx/nginx.conf
```

### 5. Deploy with Docker Compose

```bash
# Build and start production containers
docker-compose -f docker-compose.prod.yml up -d --build

# Check logs
docker-compose -f docker-compose.prod.yml logs -f
```

### 6. Verify Deployment

```bash
# Check health endpoint
curl https://yourdomain.com/health

# Check detailed health
curl https://yourdomain.com/health/detailed
```

## Database Backup Setup

### Manual Backup

```bash
# Run backup script
./scripts/backup-db.sh
```

### Automated Backups

Add to crontab:

```bash
# Edit crontab
crontab -e

# Add daily backup at 2 AM
0 2 * * * cd /path/to/subscription-tracker && ./scripts/backup-db.sh
```

## Monitoring

### Health Checks

The application provides several health endpoints:

- `GET /health` - Basic health check
- `GET /health/ping` - Simple ping
- `GET /health/detailed` - Detailed metrics including memory and database status

### Logs

```bash
# View all logs
docker-compose -f docker-compose.prod.yml logs

# View specific service logs
docker-compose -f docker-compose.prod.yml logs backend
docker-compose -f docker-compose.prod.yml logs nginx

# Follow logs in real-time
docker-compose -f docker-compose.prod.yml logs -f
```

## Security Checklist

- [ ] Changed default database password
- [ ] Generated secure JWT_SECRET
- [ ] Configured CORS for your domain only
- [ ] Setup SSL certificates
- [ ] Enabled rate limiting
- [ ] Removed debug endpoints
- [ ] Configured email service
- [ ] Setup database backups
- [ ] Configured monitoring
- [ ] Restricted file permissions

## Scaling

### Horizontal Scaling

To scale the backend:

```bash
# Scale to 3 instances
docker-compose -f docker-compose.prod.yml up -d --scale backend=3
```

### Database Optimization

For high traffic, consider:
- Using managed PostgreSQL (AWS RDS, Google Cloud SQL)
- Adding Redis for caching
- Implementing read replicas

## Troubleshooting

### Container Won't Start

```bash
# Check logs
docker-compose -f docker-compose.prod.yml logs backend

# Restart specific service
docker-compose -f docker-compose.prod.yml restart backend
```

### Database Connection Issues

```bash
# Check if PostgreSQL is running
docker-compose -f docker-compose.prod.yml ps postgres

# Check database logs
docker-compose -f docker-compose.prod.yml logs postgres
```

### SSL Certificate Issues

```bash
# Renew certificates manually
sudo certbot renew

# Restart nginx
docker-compose -f docker-compose.prod.yml restart nginx
```

## Update Deployment

To update the application:

```bash
# Pull latest changes
git pull

# Rebuild and restart
docker-compose -f docker-compose.prod.yml up -d --build

# Clean up old images
docker image prune -f
```

## Rollback

If something goes wrong:

```bash
# Stop containers
docker-compose -f docker-compose.prod.yml down

# Revert to previous commit
git checkout <previous-commit-hash>

# Restart
docker-compose -f docker-compose.prod.yml up -d --build
```

## Cost Optimization

- Use appropriate server size (start with 2GB RAM)
- Monitor resource usage
- Use managed services for database to reduce maintenance
- Implement CDN for static assets
- Optimize Docker images size

## Support

For issues or questions:
1. Check logs: `docker-compose -f docker-compose.prod.yml logs`
2. Verify health: `curl https://yourdomain.com/health/detailed`
3. Review configuration files
4. Check database connectivity
