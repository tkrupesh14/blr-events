# Contributing to Bengaluru Tech Events

Thank you for considering contributing to Bengaluru Tech Events! We welcome all forms of contributions, including bug reports, feature requests, documentation updates, and code improvements.

## Getting Started

1. Fork the repository to your GitHub account.
2. Clone your fork locally:
   ```bash
   git clone https://github.com/your-username/blr-events.git
   cd blr-events
   ```
3. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   # or
   yarn install
   ```
4. Create a feature branch for your changes:
   ```bash
   git checkout -b feature/my-new-feature
   ```
5. Make your changes, commit with clear messages, and push to your fork:
   ```bash
   git add .
   git commit -m "feat(auth): integrate Supabase client for server actions"
   git push origin feature/my-new-feature
   ```
6. Open a Pull Request against the `main` branch of this repository.

## Guidelines

- Follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.
- Write clear, concise PR descriptions explaining the _what_ and _why_ of your changes.
- Ensure that your code passes existing lint rules (`npm run lint`).
- Add or update tests for new functionality where appropriate.
- Keep PRs focused on a single concern to make review easier.

## Branching Strategy

- `main` should always be deployable and production-ready.
- Create feature branches off of `main` using the `feature/` prefix.
- Use `fix/` prefix for small bug fixes and `chore/` for non-functional tasks.

## Reporting Issues

If you find a bug or want to request a feature, please open an [issue](https://github.com/your-org/blr-events/issues) providing:

- A clear and descriptive title.
- Detailed steps to reproduce (for bugs).
- Expected and actual behavior.
- Screenshots or logs, if relevant.

## Pull Request Review

- Assign at least one reviewer.
- Reviewers may request changes or approve the PR.
- Once approved, maintainers will merge and squash commits into `main`.

## Code of Conduct

This project adheres to the [Contributor Covenant](https://www.contributor-covenant.org/). By participating, you agree to abide by its terms.

---

Thank you for helping improve Bengaluru Tech Events! 🚀 