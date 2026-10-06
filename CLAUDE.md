# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

NestJS 12 training project (CapacitacionGlobalDMS) built on the standard Nest starter. Express platform, TypeScript 6, no database yet: data lives in in-memory arrays inside services.

## Commands

```bash
npm run start:dev          # run with watch mode (port from $PORT, default 3000)
npm run build              # nest build -> dist/ (output dir is wiped first)
npm run lint               # oxlint --type-aware over src/ and test/
npm run format             # prettier (single quotes, trailing commas)
npm test                   # unit tests (*.spec.ts under src/)
npm run test:e2e           # e2e tests (test/*.e2e-spec.ts, config in test/jest-e2e.json)
npm test -- src/module/user/user.service.spec.ts   # single test file
npm test -- -t "should be defined"                 # tests matching a name
```

Jest is run through `node --experimental-vm-modules` (see `package.json` scripts), so run tests via the npm scripts rather than calling `jest` directly. `jest.config.ts` reads path aliases from `tsconfig.json`, so add aliases there only.

Linting is oxlint, not ESLint. `typescript/no-floating-promises` is an error: prefix intentionally unawaited promises with `void` (as in `src/main.ts`).

## Architecture

- `src/main.ts` boots `AppModule`; `src/app.module.ts` is the root module that imports feature modules.
- Feature modules live under `src/module/<feature>/` (e.g. `src/module/user/`), each with its own `*.module.ts`, controller, service, co-located `*.spec.ts` files, and a `dto/` folder. Imports from the root module must use the `./module/<feature>/...` path.
- Any injectable a service depends on (e.g. `LoggerService` in `user.logger.ts`, injected into `UserService`) must be listed in that module's `providers`, and also supplied in the `Test.createTestingModule` setup of specs that instantiate the dependent class.
- Update DTOs derive from create DTOs via `PartialType` from `@nestjs/mapped-types`. There is no `class-validator`/`ValidationPipe` set up, so DTO types are not enforced at runtime.
- TS config uses `module`/`moduleResolution: nodenext` with `isolatedModules`, `strict` on but `strictPropertyInitialization` off (DTO fields declared without initializers).
