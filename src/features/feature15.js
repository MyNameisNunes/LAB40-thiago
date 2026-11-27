// Funcionalidade 15: Removedor de espaços duplicados.
// Objetivo: Remove espaços repetidos e espaços nas extremidades.
// Exemplo de entrada: { texto: '  Integração   contínua  ' }
// Implemente conforme as regras e critérios do enunciado fornecido pelo professor.
const implemented = true;
// Valida a entrada e troca cada sequência de whitespace (espaço, tab, quebra de linha) por um espaço.
function execute(input) {
  if (input === null || typeof input !== "object" || Array.isArray(input)) {
    throw new Error("Entrada inválida: envie um objeto JSON com o campo 'texto'.");
  }
  if (!("texto" in input)) {
    throw new Error("Campo 'texto' é obrigatório.");
  }
  if (typeof input.texto !== "string") {
    throw new Error("Campo 'texto' deve ser uma string.");
  }
  return { resultado: input.texto.replace(/\s+/g, " ").trim() };
}
// Mantém o contrato de integração utilizado pela API central.
module.exports = {
  id: 15,
  name: "Removedor de espaços duplicados",
  description: "Remove espaços repetidos e espaços nas extremidades.",
  implemented,
  execute
};
