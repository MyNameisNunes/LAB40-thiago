// Smoke test: sobe o servidor numa porta livre e verifica /health, /api/features e a feature 15.
const { createServer } = require("node:http");
const app = require("../src/app");
const server = createServer(app);
// Interrompe o smoke test com mensagem clara quando a condição falha.
function check(condition, message) {
  if (!condition) throw new Error(message);
}
server.listen(0, "127.0.0.1", async () => {
  const base = `http://127.0.0.1:${server.address().port}`;
  try {
    const health = await fetch(`${base}/health`);
    const status = await health.json();
    check(health.status === 200 && status.status === "ok", `/health respondeu ${health.status}`);
    const list = await fetch(`${base}/api/features`);
    const catalog = await list.json();
    check(list.status === 200 && catalog.total === 40, `/api/features respondeu ${list.status}`);
    const feature15 = catalog.items.find((item) => item.id === 15);
    check(feature15?.implemented, "feature 15 não aparece como implementada");
    const exec = await fetch(`${base}/api/features/15`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ texto: "  Integração   contínua  " })
    });
    const out = await exec.json();
    check(exec.status === 200, `POST /api/features/15 respondeu ${exec.status}`);
    check(out.result?.resultado === "Integração contínua", `resultado inesperado: ${JSON.stringify(out)}`);
    console.log("Smoke test OK: /health, /api/features e feature 15.");
  } catch (error) {
    console.error("Smoke test FALHOU:", error.message);
    process.exitCode = 1;
  } finally {
    server.close();
  }
});
