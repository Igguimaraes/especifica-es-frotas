import { LIST_FROTAS } from "./dados";

export function saveStorage() {
  localStorage.setItem("frotas", JSON.stringify(LIST_FROTAS));
}

export function loadStorage() {
  const dados = localStorage.getItem("frotas");
  if (!dados) {
    return null;
  }
  return JSON.parse(dados);
}
