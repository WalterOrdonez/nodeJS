# api-rest

API REST de ejemplo construida con Express, organizada con arquitectura limpia (domain / application / infrastructure).

## Estructura

```
api-rest/
  src/
    config/
      env.js
    shared/
      errors/
        AppError.js
      middlewares/
        errorHandler.js
        notFound.js
    modules/
      credit-cards/
        domain/
          credit-card.entity.js
          credit-card.repository.js
        application/
          use-cases/
            get-credit-cards.use-case.js
            get-credit-card-by-id.use-case.js
            create-credit-card.use-case.js
            update-credit-card.use-case.js
            delete-credit-card.use-case.js
        infrastructure/
          persistence/
            in-memory-credit-card.repository.js
          http/
            credit-card.controller.js
            credit-card.routes.js
        index.js
    app.js
    index.js
  .env
  .gitignore
  package.json
```

Cada módulo de negocio (p. ej. `credit-cards`) se organiza en tres capas:
- **domain**: entidades y el puerto (`repository`) que define el contrato de persistencia, sin dependencias externas.
- **application**: casos de uso que orquestan la lógica de negocio contra el puerto del repositorio.
- **infrastructure**: adaptadores concretos (repositorio en memoria, controladores y rutas de Express) que implementan los puertos del dominio.

## Uso

```bash
npm install
npm run dev
```

El servidor arranca en `http://localhost:3000` (configurable vía `.env`).

## Endpoints

- `GET /api/v1/credit-cards` - lista tarjetas de crédito
- `GET /api/v1/credit-cards/:id` - obtiene una tarjeta
- `POST /api/v1/credit-cards` - crea una tarjeta (`{ "cardHolder": "", "number": "", "brand": "", "expiration": "" }`)
- `PATCH /api/v1/credit-cards/:id` - actualiza una tarjeta
- `DELETE /api/v1/credit-cards/:id` - elimina una tarjeta
