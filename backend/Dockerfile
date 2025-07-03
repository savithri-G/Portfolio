FROM php:8.0-apache

# Copy all backend files to Apache root directory
COPY . /var/www/html/

# Enable Apache mod_rewrite (optional, useful for routing)
RUN a2enmod rewrite

EXPOSE 80
