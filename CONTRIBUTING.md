# Contributing to Bytez

Thank you for your interest in contributing to Bytez! This guide will help you get started.

## Development Setup

### Prerequisites

- Node.js 18+ (for JavaScript SDK)
- Python 3.8+ (for Python SDK)
- Julia 1.10+ (for Julia SDK)

### JavaScript SDK

```bash
cd sdk/javascript
yarn install  # or npm install
```

**Run tests:**

```bash
# Unit tests (fast, no API key required)
npm run test:unit

# Integration tests (requires BYTEZ_KEY env var)
npm test
```

**Build:**

```bash
npm run build
```

### Python SDK

```bash
cd sdk/python
pip install -e .
pip install requests
```

**Run tests:**

```bash
python test.py
```

### Documentation

The documentation site uses Mintlify. To preview locally:

```bash
cd docs
yarn install
yarn start
```

## Pull Request Guidelines

### Before You Start

1. Check existing issues and PRs to avoid duplicate work
2. For significant changes, open an issue first to discuss the approach
3. Keep PRs focused—one logical change per PR

### Code Quality

- **JavaScript/TypeScript:** Follow existing code style, run `npm run lint`
- **Python:** Follow PEP 8, keep code simple and readable
- **Tests:** Add unit tests for new utilities, update integration tests if changing SDK behavior
- **Documentation:** Update relevant `.mdx` files if changing public APIs

### Commit Messages

Use clear, descriptive commit messages:

```
Fix query string bug in list.models()

- Use URLSearchParams for proper encoding
- Add unit tests for edge cases
- Fixes issue where both task and modelId produced invalid URLs
```

### PR Checklist

- [ ] Code follows existing style
- [ ] Tests added/updated
- [ ] Documentation updated (if needed)
- [ ] No unnecessary changes (formatting, whitespace)
- [ ] Commit history is clean

## Testing Philosophy

- **Unit tests:** Fast, isolated, test pure functions without I/O
- **Integration tests:** Test real API calls, but should be optional (require API key)
- **Add unit tests when possible:** Helps catch regressions quickly

## Questions?

- Open an issue for questions about contributing
- Join our [Discord](https://discord.com/invite/Z723PfCFWf) for real-time discussion

We appreciate your contributions!
