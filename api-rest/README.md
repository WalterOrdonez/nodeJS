# api-rest

API REST de ejemplo construida con Express y organizada con arquitectura hexagonal por módulo.

Implementada en TypeScript. Requiere Node.js y npm.

## Estructura

```
api-rest/
  src/
    config/
      env.ts
    database/
      data-source.ts
    shared/
      errors/
        AppError.ts
      http/
        errorHandler.ts
        notFound.ts
    modules/
      credit-cards/
        domain/
          credit-card.entity.ts
        application/
          ports/
            credit-card.repository.ts
          use-cases/
            get-credit-cards.use-case.ts
            get-credit-card-by-id.use-case.ts
            create-credit-card.use-case.ts
            update-credit-card.use-case.ts
            delete-credit-card.use-case.ts
        adapters/
          in/
            http/
              credit-card.controller.ts
              credit-card.routes.ts
              credit-card.schemas.ts
              validate-request.ts
          out/
            persistence/
              in-memory-credit-card.repository.ts
              credit-card.orm-entity.ts
              typeorm-credit-card.repository.ts
        credit-cards.module.ts
    app.ts
    index.ts
  .env
  .gitignore
  package.json
```

Cada módulo de negocio (p. ej. `credit-cards`) separa:

- **domain**: entidades y reglas de negocio, sin dependencias externas.
- **application**: casos de uso y puertos de salida que definen contratos como el repositorio.
- **adapters/in**: entrada HTTP con Express, rutas y controladores.
- **adapters/out**: implementaciones de puertos, como el repositorio en memoria.
- **credit-cards.module.ts**: composición que conecta casos de uso y adaptadores.

El repositorio se selecciona con `CREDIT_CARD_REPOSITORY=memory|postgres` (por defecto `memory`). Para PostgreSQL, configura `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD` y `DB_NAME`; puedes partir de `.env.example`. La entidad TypeORM está mapeada a la tabla existente `credit_cards`. El esquema se administra fuera de la aplicación; `synchronize` permanece desactivado.

Los requests de creación, actualización y los parámetros `id` se validan con Joi en el adaptador HTTP. Las solicitudes inválidas responden `400` con los detalles de validación.

Las tarjetas usan identificadores UUID v4. Los endpoints de consulta, actualización y eliminación esperan el UUID en `:id`.

Las marcas permitidas son `visa`, `mastercard`, `american` y `discover`; el prefijo del número debe coincidir con la marca enviada.

## Uso

```bash
npm install
npm run dev
```

Usa `npm run build` para compilar a `dist/` y `npm start` para ejecutar la compilación.

El servidor arranca en `http://localhost:3000` (configurable vía `.env`).

## Endpoints

- `GET /api/v1/credit-cards` - lista tarjetas de crédito
- `GET /api/v1/credit-cards/:id` - obtiene una tarjeta
- `POST /api/v1/credit-cards` - crea una tarjeta (`{ "cardHolder": "", "number": "", "brand": "", "cvv": "", "expiration": "" }`)
- `PATCH /api/v1/credit-cards/:id` - actualiza una tarjeta
- `DELETE /api/v1/credit-cards/:id` - elimina una tarjeta
