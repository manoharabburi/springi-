# Security Policy

## Supported Versions

We release patches for security vulnerabilities for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability, please follow these steps:

1. **Do not** open a public issue
2. Email the maintainer directly at [your-email@example.com]
3. Include a detailed description of the vulnerability
4. Provide steps to reproduce the issue
5. Include any potential impact assessment

## Security Best Practices

### For Developers

1. **Never commit sensitive data**:
   - API keys
   - Database passwords
   - Private keys
   - Personal information

2. **Use environment variables** for all sensitive configuration

3. **Keep dependencies updated** regularly

4. **Follow secure coding practices**

### For Users

1. **Protect your API keys**:
   - Never share your Google AI API key
   - Use environment variables or secure configuration files
   - Rotate keys regularly

2. **Database Security**:
   - Use strong passwords
   - Limit database access
   - Enable SSL connections in production

3. **Network Security**:
   - Use HTTPS in production
   - Implement proper CORS policies
   - Use firewalls and security groups

## Security Features

- Environment-based configuration
- Input validation and sanitization
- Secure database connections
- CORS protection
- No sensitive data in version control

## Vulnerability Response

We take security seriously and will respond to security reports within 48 hours. We will:

1. Acknowledge receipt of the vulnerability report
2. Investigate and assess the impact
3. Develop and test a fix
4. Release a security update
5. Publicly disclose the vulnerability after the fix is available

Thank you for helping keep Springi secure!
