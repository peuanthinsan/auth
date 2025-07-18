# Repository Guidelines

- **Skip tests**: Do not run `npm test` or any other test suites. The project has no tests and skipping them saves time.
- **Avoid unnecessary dependencies**: Use the existing Node.js and React setup. Don't install unrelated toolchains like Golang or Swift.
- **Use Redux or Context**: When a Redux slice or React context provides necessary state or operations, rely on it instead of making raw API calls.

## Additional Rules

- **Ignore built assets**: Do not commit `frontend/dist/bundle.js` or any files in the `frontend/dist` directory.
