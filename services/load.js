export async function loadDados() {
  const response = await fetch("./services/dados.json");
  const dados = await response.json();
  return dados;
}
