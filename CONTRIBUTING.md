# Contributing to Springi

Thank you for your interest in contributing to Springi! We welcome contributions from everyone.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please be respectful and constructive in all interactions.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/Harsha430/springi/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details (OS, Java version, etc.)
   - Screenshots if applicable

### Suggesting Features

1. Check existing [Issues](https://github.com/Harsha430/springi/issues) for similar suggestions
2. Create a new issue with:
   - Clear title and description
   - Use case and motivation
   - Proposed implementation (if you have ideas)

### Pull Requests

1. **Fork** the repository
2. **Create** a feature branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make** your changes following our coding standards
4. **Test** your changes thoroughly
5. **Commit** with clear, descriptive messages:
   ```bash
   git commit -m "Add: new feature description"
   ```
6. **Push** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Create** a Pull Request with:
   - Clear title and description
   - Reference any related issues
   - Screenshots for UI changes

## Development Setup

### Prerequisites

- Java 17+
- Node.js 18+
- PostgreSQL 12+
- Maven 3.6+

### Backend Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/springi.git
cd springi

# Set up environment variables
cp src/main/resources/application.properties.example src/main/resources/application-local.properties
# Edit application-local.properties with your values

# Run tests
./mvnw test

# Start the application
./mvnw spring-boot:run
```

### Frontend Setup

```bash
cd chatbot-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

## Coding Standards

### Java (Backend)

- Follow [Google Java Style Guide](https://google.github.io/styleguide/javaguide.html)
- Use meaningful variable and method names
- Add JavaDoc for public methods
- Write unit tests for new functionality
- Keep methods small and focused

### JavaScript/React (Frontend)

- Use functional components with hooks
- Follow React best practices
- Use meaningful component and variable names
- Add PropTypes or TypeScript for type checking
- Write clean, readable JSX

### General Guidelines

- **No sensitive data** in commits (API keys, passwords, etc.)
- **Write tests** for new features
- **Update documentation** when needed
- **Keep commits atomic** and well-described
- **Follow existing patterns** in the codebase

## Testing

### Backend Tests

```bash
# Run all tests
./mvnw test

# Run specific test class
./mvnw test -Dtest=ChatControllerTest
```

### Frontend Tests

```bash
cd chatbot-frontend

# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## Documentation

- Update README.md for new features
- Add inline comments for complex logic
- Update API documentation for new endpoints
- Include examples in documentation

## Review Process

1. All submissions require review
2. Maintainers will review your PR
3. Address any feedback promptly
4. Once approved, maintainers will merge

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes for significant contributions
- GitHub contributors page

## Questions?

Feel free to:
- Open an issue for questions
- Start a discussion in GitHub Discussions
- Contact maintainers directly

Thank you for contributing to Springi! 🚀
