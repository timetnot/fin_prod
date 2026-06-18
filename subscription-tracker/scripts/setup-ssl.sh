#!/bin/bash

# SSL Certificate Setup Script using Let's Encrypt
# Usage: ./scripts/setup-ssl.sh yourdomain.com

DOMAIN=$1
if [ -z "$DOMAIN" ]; then
  echo "Usage: $0 yourdomain.com"
  exit 1
fi

echo "Setting up SSL certificates for $DOMAIN..."

# Install certbot if not installed
if ! command -v certbot &> /dev/null; then
  echo "Installing certbot..."
  if [ -f /etc/debian_version ]; then
    sudo apt-get update
    sudo apt-get install -y certbot
  elif [ -f /etc/redhat-release ]; then
    sudo yum install -y certbot
  else
    echo "Please install certbot manually"
    exit 1
  fi
fi

# Create nginx ssl directory
mkdir -p nginx/ssl

# Obtain SSL certificate
sudo certbot certonly --standalone \
  -d $DOMAIN \
  -d www.$DOMAIN \
  --email your-email@example.com \
  --agree-tos \
  --non-interactive

# Copy certificates to nginx ssl directory
sudo cp /etc/letsencrypt/live/$DOMAIN/fullchain.pem nginx/ssl/
sudo cp /etc/letsencrypt/live/$DOMAIN/privkey.pem nginx/ssl/

# Set permissions
sudo chmod 644 nginx/ssl/fullchain.pem
sudo chmod 600 nginx/ssl/privkey.pem

echo "SSL certificates installed successfully!"
echo "Certificates location: nginx/ssl/"
echo "Full chain: nginx/ssl/fullchain.pem"
echo "Private key: nginx/ssl/privkey.pem"

# Setup auto-renewal
echo "Setting up auto-renewal..."
(crontab -l 2>/dev/null; echo "0 0 * * 0 certbot renew --quiet && docker-compose -f docker-compose.prod.yml restart nginx") | crontab -

echo "Auto-renewal configured. Certificates will be renewed weekly."
