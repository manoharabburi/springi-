# Deployment Guide

This guide covers deploying Springi to various platforms.

## Environment Variables

Before deploying, ensure you have these environment variables set:

```bash
GOOGLE_AI_API_KEY=your_google_ai_api_key
DATABASE_URL=jdbc:postgresql://your-db-host:5432/springi
DATABASE_USERNAME=your_db_username
DATABASE_PASSWORD=your_db_password
```

## Local Development

### Using Docker Compose (Recommended)

1. Create a `docker-compose.yml`:

```yaml
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: springi
      POSTGRES_USER: springi
      POSTGRES_PASSWORD: your_password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  backend:
    build: .
    ports:
      - "8080:8080"
    environment:
      GOOGLE_AI_API_KEY: ${GOOGLE_AI_API_KEY}
      DATABASE_URL: jdbc:postgresql://postgres:5432/springi
      DATABASE_USERNAME: springi
      DATABASE_PASSWORD: your_password
    depends_on:
      - postgres

volumes:
  postgres_data:
```

2. Run with Docker Compose:

```bash
docker-compose up -d
```

## Cloud Deployment

### Heroku

1. **Prepare for Heroku**:

```bash
# Install Heroku CLI
# Create Procfile
echo "web: java -jar target/spring-chatbot-*.jar" > Procfile

# Create system.properties for Java version
echo "java.runtime.version=17" > system.properties
```

2. **Deploy Backend**:

```bash
# Create Heroku app
heroku create your-app-name

# Add PostgreSQL addon
heroku addons:create heroku-postgresql:mini

# Set environment variables
heroku config:set GOOGLE_AI_API_KEY=your_api_key

# Deploy
git push heroku main
```

3. **Deploy Frontend**:

```bash
cd chatbot-frontend

# Build for production
npm run build

# Deploy to Netlify, Vercel, or serve from backend
```

### AWS

#### Backend (Elastic Beanstalk)

1. **Package the application**:

```bash
./mvnw clean package
```

2. **Create Elastic Beanstalk application**:
   - Upload the JAR file from `target/`
   - Set environment variables in EB console

#### Database (RDS)

1. Create PostgreSQL RDS instance
2. Update `DATABASE_URL` environment variable

#### Frontend (S3 + CloudFront)

1. **Build and deploy**:

```bash
cd chatbot-frontend
npm run build
aws s3 sync dist/ s3://your-bucket-name
```

### Google Cloud Platform

#### Backend (Cloud Run)

1. **Create Dockerfile**:

```dockerfile
FROM openjdk:17-jdk-slim
COPY target/spring-chatbot-*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

2. **Deploy**:

```bash
# Build and push to Container Registry
gcloud builds submit --tag gcr.io/PROJECT_ID/springi

# Deploy to Cloud Run
gcloud run deploy --image gcr.io/PROJECT_ID/springi --platform managed
```

#### Database (Cloud SQL)

1. Create PostgreSQL Cloud SQL instance
2. Set connection string in environment variables

## Production Considerations

### Security

1. **Use HTTPS** in production
2. **Set secure headers**:

```properties
# application-prod.properties
server.ssl.enabled=true
security.headers.frame=DENY
security.headers.content-type=nosniff
```

3. **Database security**:
   - Use SSL connections
   - Restrict network access
   - Use strong passwords

### Performance

1. **JVM tuning**:

```bash
export JAVA_OPTS="-Xmx512m -Xms256m"
```

2. **Database optimization**:
   - Connection pooling
   - Query optimization
   - Proper indexing

3. **Frontend optimization**:
   - Enable gzip compression
   - Use CDN for static assets
   - Implement caching strategies

### Monitoring

1. **Application monitoring**:
   - Spring Boot Actuator endpoints
   - Application logs
   - Performance metrics

2. **Database monitoring**:
   - Connection pool metrics
   - Query performance
   - Resource usage

### Backup

1. **Database backups**:
   - Automated daily backups
   - Point-in-time recovery
   - Cross-region replication

2. **Application backups**:
   - Source code in version control
   - Configuration backups
   - Deployment artifacts

## Environment-Specific Configurations

### Development

```properties
# application-dev.properties
spring.jpa.show-sql=true
logging.level.org.springframework.web=DEBUG
```

### Staging

```properties
# application-staging.properties
spring.jpa.show-sql=false
logging.level.org.springframework.web=INFO
```

### Production

```properties
# application-prod.properties
spring.jpa.show-sql=false
logging.level.org.springframework.web=WARN
server.compression.enabled=true
```

## Troubleshooting

### Common Issues

1. **Database connection errors**:
   - Check connection string
   - Verify credentials
   - Ensure database is accessible

2. **API key issues**:
   - Verify Google AI API key
   - Check API quotas and limits
   - Ensure proper permissions

3. **CORS errors**:
   - Update CORS configuration
   - Check frontend URL in backend

### Health Checks

```bash
# Backend health check
curl http://your-app-url/actuator/health

# Database connectivity
curl http://your-app-url/actuator/health/db
```

## Scaling

### Horizontal Scaling

1. **Load balancer** configuration
2. **Session management** (stateless design)
3. **Database connection pooling**

### Vertical Scaling

1. **Increase memory** allocation
2. **CPU optimization**
3. **Database performance** tuning

For more detailed deployment instructions, refer to the specific platform documentation.
