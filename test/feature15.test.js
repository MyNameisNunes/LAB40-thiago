const test = require("node:test");
const assert = require("node:assert/strict");
const feature = require("../src/features/feature15");

// Testes de referência fornecidos pelo professor.
test("normaliza espaços nas extremidades e no meio", () => {
  assert.equal(feature.execute({ texto: " Integração contínua " }).resultado, "Integração contínua");
});

test("normaliza tabs e quebras de linha", () => {
  assert.equal(feature.execute({ texto: "uma\t\nduas" }).resultado, "uma duas");
});

test("vazio permanece vazio e tipo incorreto é rejeitado", () => {
  assert.equal(feature.execute({ texto: "" }).resultado, "");
  assert.throws(() => feature.execute({ texto: 7 }), { name: "Error" });
});

// Caso típico: entrada de referência do enunciado.
test("entrada de referência produz 'Integração contínua'", () => {
  const result = feature.execute({ texto: "  Integração   contínua  " });
  assert.deepEqual(result, { resultado: "Integração contínua" });
});

test("remove espaços no início e no fim", () => {
  assert.equal(feature.execute({ texto: "   CI/CD   " }).resultado, "CI/CD");
});

test("reduz múltiplos espaços entre palavras a um só", () => {
  assert.equal(feature.execute({ texto: "a    b     c" }).resultado, "a b c");
});

test("trata tabs como whitespace", () => {
  assert.equal(feature.execute({ texto: "\tlint\t\ttestes\t" }).resultado, "lint testes");
});

test("trata quebras de linha como whitespace", () => {
  assert.equal(feature.execute({ texto: "build\n\ndeploy\r\nentrega\n" }).resultado, "build deploy entrega");
});

test("preserva acentos e caracteres especiais", () => {
  assert.equal(feature.execute({ texto: " ação  à  ç  ñ  @#$% " }).resultado, "ação à ç ñ @#$%");
});

// Limites: textos sem conteúdo útil.
test("texto vazio retorna resultado vazio", () => {
  assert.equal(feature.execute({ texto: "" }).resultado, "");
});

test("texto só com whitespace retorna resultado vazio", () => {
  assert.equal(feature.execute({ texto: " \t\n  " }).resultado, "");
});

test("texto já normalizado permanece igual", () => {
  assert.equal(feature.execute({ texto: "Integração contínua" }).resultado, "Integração contínua");
});

test("não modifica o objeto de entrada", () => {
  const input = { texto: "  a   b  " };
  feature.execute(input);
  assert.deepEqual(input, { texto: "  a   b  " });
});

// Entradas inválidas.
test("rejeita texto com tipo incorreto", () => {
  for (const texto of [123, true, null, ["a"], { a: 1 }]) {
    assert.throws(() => feature.execute({ texto }), { message: "Campo 'texto' deve ser uma string." });
  }
});

test("rejeita campo texto ausente", () => {
  assert.throws(() => feature.execute({}), { message: "Campo 'texto' é obrigatório." });
});

test("rejeita entrada que não é objeto", () => {
  for (const input of [undefined, null, "texto", 42, []]) {
    assert.throws(() => feature.execute(input), /Entrada inválida/);
  }
});

test("módulo está marcado como implementado e mantém o contrato", () => {
  assert.equal(feature.id, 15);
  assert.equal(feature.implemented, true);
  assert.equal(typeof feature.name, "string");
  assert.equal(typeof feature.description, "string");
});
