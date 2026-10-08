import { port } from "./config/env";
import { createApp } from "./app";
import { createCreditCardModule } from "./modules/credit-cards/credit-cards.module";

async function startServer(): Promise<void> {
    const creditCardRoutes = await createCreditCardModule();
    const app = createApp(creditCardRoutes);

    app.listen(port, () => {
        console.log(`Servidor corriendo en http://localhost:${port}`);
    });
}

void startServer().catch((error: unknown) => {
    console.error("No se pudo iniciar la API", error);
    process.exitCode = 1;
});
