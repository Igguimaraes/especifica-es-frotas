import { ConsultCad } from "../consult/consult.js";
import { Inputs } from "../inputs/inputs.js";
import { saveStorage } from "../services/dados.js";

const btnCad = document.getElementById("btn-cad");
btnCad.addEventListener("click", () => {
  document.body.appendChild(Inputs());
});
const btnConsult = document.getElementById("btn-consult");
btnConsult.addEventListener("click", () => {
  document.body.appendChild(ConsultCad());
});

saveStorage();
