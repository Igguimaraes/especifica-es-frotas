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

export let LIST_FROTAS = loadStorage() || [
  {
    image:
      "https://d36qmzp7jiean8.cloudfront.net/cliente_016004/veiculos/1383242_202606181818217610814_big.webp",
    name: "Valtra",
    model: "A 850",
    year: 2013,
    number: 39,
    fil_1: "filtro 01",
    fil_2: "filtro 02",
    fil_3: "filtro 03",
    fil_4: "filtro 04",
    fil_5: "filtro 05",
    fil_6: "filtro 06",
    fil_7: "filtro 07",
    oil_motor: "oleo motor",
    oil_hidra: "oleo hidraulico",
    oil_brake: "oleo freio",
  },
  {
    image:
      "https://alemdofato.uai.com.br/wp-content/uploads/sites/5/2022/09/foto-artigo-do-celso-foto-deere.jpg",
    name: "JD",
    model: "200",
    year: 2013,
    number: 70,
    fil_1: "filtro 01",
    fil_2: "filtro 02",
    fil_3: "filtro 03",
    fil_4: "filtro 04",
    fil_5: "filtro 05",
    fil_6: "filtro 06",
    fil_7: "filtro 07",
    oil_motor: "oleo motor",
    oil_hidra: "oleo hidraulico",
    oil_brake: "oleo freio",
  },
];
