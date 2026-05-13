# Switch Configurator Plan — Backend API

## Description

Express and TypeORM backend for the **switch plate configurator**. It serves read-only JSON endpoints for styles, colours, orientations, mechanisms, colour combinations, style–colour combinations, and a single aggregated **config** payload so a front end (for example Angular) can drive the UI. Data lives in **PostgreSQL**. HTTP routing is grouped in `src/routes/index.route.ts`, which mounts feature routers (currently switch plate under `/api/v1/switch-plate`).

## System design

- **Stack**: Node.js, Express, TypeORM, PostgreSQL, Swagger UI (`swagger-jsdoc`).
- **Layers**: `routes` → `controllers` (HTTP + OpenAPI JSDoc) → `services` → TypeORM `entities` / repositories.
- **Contracts**: Request and response shapes are described in **Swagger** at `/api-docs` while the server is running. The public API is namespaced under `**/api/v1`** (switch plate resources: `**/api/v1/switch-plate**`). The app also exposes `**GET /**` as a simple health message.

## Project setup

Install dependencies:

```bash
npm install
```

## Running the project

### Development mode

```bash
npm run start:dev
```

Starts the application with **nodemon** and **ts-node** so the server restarts when you change source files. `npm run dev` is the same command.

### Production mode

Build TypeScript, then run Node against `dist`:

```bash
npm run build
npm run start:prod
```

Ensure production environment variables are set (see below).

### Environment variables

Create a `.env` file in the project root. At minimum:

```env
DB_TYPE=postgres
PG_USER=your_db_username
PG_PASSWORD=your_db_password
PG_DB=your_db_name
PG_PORT=5432
PG_HOST=localhost
PORT=8000
NODE_ENV=development
```

See `[.env.example](.env.example)` for the same keys (including optional placeholders such as `SECRET` for future use).

### Migrations and seed

Apply database migrations:

```bash
npm run migration:run
```

Load reference data:

```bash
npm run seed
```

The switch plate lookup APIs are ready after migrations and seed complete.

### Docker Compose

From this directory, with Docker running:

```bash
docker compose up --build -d
```

Stop the stack: 

```
docker compose down  (add `-v` to remove the Postgres volume).
```

## API routes

Replace `<PORT>` with the value from your `.env` (for example `8000`). Switch plate routes are mounted under `/api` via `createIndexRouter` in `src/routes/index.route.ts`.


| Method | Endpoint                                         | Description                                                    |
| ------ | ------------------------------------------------ | -------------------------------------------------------------- |
| `GET`  | `/`                                              | Root health check; returns plain text that the API is running. |
| `GET`  | `/api-docs`                                      | Swagger UI for interactive API documentation.                  |
| `GET`  | `/api/v1/switch-plate/styles`                    | All switch plate styles (for example Vision, Horizon).         |
| `GET`  | `/api/v1/switch-plate/colours`                   | All switch plate colours.                                      |
| `GET`  | `/api/v1/switch-plate/orientations`              | All plate orientations.                                        |
| `GET`  | `/api/v1/switch-plate/mechs`                     | All mechanism options.                                         |
| `GET`  | `/api/v1/switch-plate/colour-combinations`       | Colour combination rules.                                      |
| `GET`  | `/api/v1/switch-plate/style-colour-combinations` | Style-specific colour combinations.                            |
| `GET`  | `/api/v1/switch-plate/config`                    | Aggregated configurator payload (all lookups in one response). |


## Documentation (Swagger)

With the server running, open Swagger in a browser (replace the port with your `PORT` from `.env`):

```text
http://localhost:8000/api-docs
```

Example: if `PORT=8000`, use `http://localhost:8000/api-docs`.

## Postman
check the postman doc here: [Pasific Component.postman_collection.json](Pasific%20Component.postman_collection.json)

**Steps to use Postman with this API**:
1. Open Postman.
2. Create a new request (or collection) with the base URL `http://localhost:<PORT>/api/v1/switch-plate` (replace `<PORT>` with your `PORT` from `.env`).
3. Add paths such as `/styles`, `/colours`, `/orientations`, `/mechs`, `/colour-combinations`, `/style-colour-combinations`, or `/config` (all `GET`).
4. Send requests while the backend is running and the database is migrated and seeded.

## Additional notes

- **Environment variables**: `.env` is required for PostgreSQL (`DB_TYPE` should be `postgres`, plus `PG_`*) and for the HTTP server (`PORT`).
- **Reverting migrations**: `npm run migration:revert` rolls back **one** migration at a time (the most recently applied). Run it repeatedly to unwind more than one step, or reset the database in development.
