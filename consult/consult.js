import { LIST_FROTAS, saveStorage } from "../services/dados.js";

function createGroup(tag, className, children = []) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  children.forEach((child) => el.append(child));
  return el;
}

function createTextEl(tag, text, className) {
  const el = document.createElement(tag);
  el.textContent = text;
  if (className) el.className = className;
  return el;
}

function createInput(placeholder) {
  const input = document.createElement("input");
  input.placeholder = placeholder;
  return input;
}

function createButton(text, className, onClick) {
  const btn = document.createElement("button");
  btn.textContent = text;
  if (className) btn.className = className;
  if (onClick) btn.addEventListener("click", onClick);
  return btn;
}

function createListItem(text, onClick) {
  const li = document.createElement("li");
  li.textContent = text;
  li.style.cursor = "pointer";
  li.addEventListener("click", onClick);
  return li;
}

function createSpec(label, value) {
  const p = document.createElement("p");

  p.innerHTML = ` <strong> ${label} </strong> ${value}`;
  return p;
}

function createField(labelText, type, value) {
  const main = document.createElement("div");
  main.className = "form-group";
  const label = document.createElement("label");
  label.textContent = labelText;

  const input = document.createElement("input");
  input.value = value;

  main.append(label, input);

  return main;
}

// =============== componente principal =================

export function ConsultCad() {
  const container = createGroup("div", "consultContainer");

  // ============ lado direito Lista Frota ============
  const rightPanel = createGroup("div", "consultRight", [
    createButton("Sair", "btnExit", () => container.remove()),
    createTextEl("h1", "Selecione a Frota"),
  ]);

  const inputBusca = createInput("Digite o número da frota");

  const ul = document.createElement("ul");

  const btnBusca = createButton("Busca", "btnBusca", () => {
    buscarFrota(inputBusca.value, ul, leftPanel);
  });

  const btnReset = createButton("Exibir todos", "btnReset", () => {
    carregarTodasFrotas(ul, leftPanel);
  });

  rightPanel.append(inputBusca, btnBusca, btnReset, ul);

  // ============= Lado esquerdo especificações =================
  const leftPanel = createGroup("div", "consultLeft", [
    createTextEl("h1", "Especificações"),
  ]);

  const divContent = document.createElement("div");

  const card = document.createElement("div");
  card.className = "content-main content-consult";

  const cardContent = document.createElement("div");
  //cardContent.className = "content-card";

  LIST_FROTAS.forEach((frota) => {
    const img = document.createElement("img");
    img.className = "frota-image";
    img.src = `${frota.image} `;
    img.alt = `${frota.name}`;

    card.appendChild(img);
    return img;
  });

  console.log(LIST_FROTAS.length);

  divContent.appendChild(card);
  leftPanel.appendChild(divContent);

  //============== inserir painel ==================

  container.append(rightPanel, leftPanel);

  carregarTodasFrotas(ul, leftPanel);
  return container;
}

function carregarTodasFrotas(ul, leftPanel) {
  ul.innerHTML = "";

  LIST_FROTAS.forEach((frota) => {
    const li = createListItem(`${frota.name} - ${frota.number}`, () => {
      exibirEspecific(frota, leftPanel);
    });
    ul.append(li);
    return ul;
  });
}

function buscarFrota(valor, ul, leftPanel) {
  const number = Number(valor);
  ul.innerHTML = "";

  if (!valor || isNaN(number)) {
    const li = createListItem("Digite um número válido");
    li.style.color = "#f87171";
    ul.appendChild(li);
    return;
  }

  const frota = LIST_FROTAS.find((f) => f.number === number);

  if (frota) {
    const li = createListItem(`${frota.number} - ${frota.model} `, () => {
      exibirEspecific(frota, leftPanel);
    });
    ul.appendChild(li);
  } else {
    const li = createListItem("Frota não enconstrada");

    li.style.color = "#f87171";
    ul.appendChild(li);
  }
  return ul;
}

function exibirEspecific(frota, panel) {
  panel.innerHTML = "";

  if (frota.image) {
    const img = document.createElement("img");
    img.src = frota.image;
    img.alt = frota.name;
    img.className = "frota-image";
    img.onerror = () => {
      img.style.display = "none";
    };
    const btnEdit = createButton("Editar", "btnEdit", () => {
      document.body.append(upDate(frota));
    });
    const btnDelet = createButton("Excluir", "btnExc", () => {
      deletedFrota(frota.number);
    });
    panel.append(img, btnEdit, btnDelet);
  }

  const specs = [
    { label: "Ano", value: frota.year },
    { label: "Número", value: frota.number },
    { label: "Filtro 1", value: frota.fil_1 },
    { label: "Filtro 2", value: frota.fil_2 },
    { label: "Filtro 3", value: frota.fil_3 },
    { label: "Filtro 4", value: frota.fil_4 },
    { label: "Filtro 5", value: frota.fil_5 },
    { label: "Filtro 6", value: frota.fil_6 },
    { label: "Filtro 7", value: frota.fil_7 },
    { label: "Óleo de Motor", value: frota.oil_motor },
    { label: "Óleo de Hidráulico", value: frota.oil_hidra },
    { label: "Óleo de Freio", value: frota.oil_brake },
  ];

  panel.append(
    createTextEl("h1", `${frota.name} - ${frota.model}`),
    ...specs.map((s) => createSpec(s.label, s.value)),
  );
}

function deletedFrota(id) {
  const res = LIST_FROTAS.findIndex((f) => f.number === id);

  const confir = confirm("Deseja Exluir ? ", res);

  if (confir === true) {
    setTimeout(() => {
      alert("deletado com sucesso");
      LIST_FROTAS.splice(res, 1);
      saveStorage();
      renderConsult();
    }, 1500);
  } else {
    console.log("erro", res);
  }
}

function upDate(frota) {
  const main = document.createElement("div");
  main.className = "main-Input";
  const content = document.createElement("div");
  content.className = "content-Input";

  //========== MQUINA =================

  const grid_maq = document.createElement("div");
  grid_maq.className = "form-grid";
  const tittleMaq = document.createElement("div");
  tittleMaq.textContent = "Máquinas";
  tittleMaq.className = "section-title";

  const nameEdit = createField("Nome da frota", "text", `${frota.name}`);
  const yearEdit = createField("Ano da Frota", "text", `${frota.year}`);
  const numberEdit = createField("Número da frota", "text", `${frota.number}`);
  const selectEdit = createField("Selecione Modelo", "text", `${frota.model}`);
  const imageEdit = createField("Imagem", "text", `${frota.image}`);
  grid_maq.append(nameEdit, yearEdit, numberEdit, selectEdit, imageEdit);

  //====== FILTROS ==========

  const grid_filtros = document.createElement("div");
  grid_filtros.className = "form-grid";

  const tittleFil = document.createElement("div");
  tittleFil.textContent = "Filtros";
  tittleFil.className = "section-title";
  const fil_1_Edit = createField("Filtro 1", "text", `${frota.fil_1}`);
  const fil_2_Edit = createField("Filtro 2", "text", `${frota.fil_2}`);
  const fil_3_Edit = createField("Filtro 3", "text", `${frota.fil_3}`);
  const fil_4_Edit = createField("Filtro 4", "text", `${frota.fil_4}`);
  const fil_5_Edit = createField("Filtro 5", "text", `${frota.fil_5}`);
  const fil_6_Edit = createField("Filtro 6", "text", `${frota.fil_6}`);
  const fil_7_Edit = createField("Filtro 8", "text", `${frota.fil_7}`);
  grid_filtros.append(
    fil_1_Edit,
    fil_2_Edit,
    fil_3_Edit,
    fil_4_Edit,
    fil_5_Edit,
    fil_6_Edit,
    fil_7_Edit,
  );

  //=============== ÓLEOS =================

  const grid_oil = document.createElement("div");
  grid_oil.className = "form-grid";

  const tittleOil = document.createElement("div");
  tittleOil.textContent = "Óleo ";
  tittleOil.className = "section-title";

  const oil_motorEdit = createField(
    "Oleo de Motor",
    "text",
    `${frota.oil_motor}`,
  );
  const oil_hidraEdit = createField(
    "Óleo Hidráulico",
    "text",
    `${frota.oil_hidra}`,
  );
  const oil_brakeEdit = createField(
    "Óleo de Freio",
    "text",
    `${frota.oil_brake}`,
  );

  //================== botões ===========================
  const btnRows = document.createElement("div");
  btnRows.className = "buttons-row";

  const btnSave = createButton("Salvar", "btnCreate", () => {
    const frotaUpdade = LIST_FROTAS.find((f) => f.number === frota.number);
    const patch = {
      name: nameEdit.querySelector("input").value.trim(),
      number: numberEdit.querySelector("input").value.trim(),
      model: selectEdit.querySelector("input").value.trim(),
      year: Number(yearEdit.querySelector("input").value.trim()),
      image: imageEdit.querySelector("input").value.trim(),
      fil_1: fil_1_Edit.querySelector("input").value.trim(),
      fil2: fil_2_Edit.querySelector("input").value.trim(),
      fil_3: fil_3_Edit.querySelector("input").value.trim(),
      fil_4: fil_4_Edit.querySelector("input").value.trim(),
      fil_5: fil_5_Edit.querySelector("input").value.trim(),
      fil_6: fil_6_Edit.querySelector("input").value.trim(),
      fil_7: fil_7_Edit.querySelector("input").value.trim(),
      oil_motor: oil_motorEdit.querySelector("input").value.trim(),
      oil_hidra: oil_hidraEdit.querySelector("input").value.trim(),
      oil_brake: oil_brakeEdit.querySelector("input").value.trim(),
    };

    Object.assign(frotaUpdade, patch);

    saveStorage();

    btnSave.style.backgroundColor = "#16a34a";
    btnSave.textContent = " Salvando...";

    setTimeout(() => {
      btnSave.style.backgroundColor = "";
      btnSave.textContent = "";
      main.remove();
      renderConsult();
    }, 1500);
  });

  const btnCancel = createButton("Cancelar", "btnExit", () => {
    main.remove();
  });

  btnRows.append(btnSave, btnCancel);
  //============== renderizar ===============

  grid_oil.append(oil_motorEdit, oil_hidraEdit, oil_brakeEdit);

  content.append(
    tittleMaq,
    grid_maq,
    tittleFil,
    grid_filtros,
    tittleOil,
    grid_oil,
    btnRows,
  );

  main.appendChild(content);
  return main;
}

function renderConsult() {
  window.location.reload();
  /* const app = document.querySelector("consultContainer");
  app.innerHTML = "";
  app.append(ConsultCad()); 
  */
}

/*


 function dConsultCad() {
  const divContainer = document.createElement("div");
  divContainer.className = "divContainer";

  // Pagina lado direito
  const divContentRight = document.createElement("div");
  divContentRight.className = "divRight";
  const h1_d = document.createElement("h1");
  h1_d.textContent = "Selecione a Frota";

  const ul = document.createElement("ul");

  const li = document.createElement("li");

  // Pagina lado esquerdo
  const divContentLeft = document.createElement("div");
  divContentLeft.className = "divLeft";
  const h1_l = document.createElement("h1");
  h1_l.textContent = "Especificações";

  const inputBusc = document.createElement("input");
  inputBusc.placeholder = "Digite número da frota";

  const btnExit = document.createElement("button");
  btnExit.textContent = "Sair";
  btnExit.addEventListener("click", () => {
    divContainer.remove();
  });

  //inserção dos conteúdos
  const response = LIST_FROTAS;

  const btnBusca = document.createElement("button");
  btnBusca.textContent = "buscar";

  btnBusca.addEventListener("click", async () => {
    try {
      const frotas = response;

      ul.innerHTML = "";

      const intBusc = Number(inputBusc.value);

      if (frotas) {
        const frota = frotas.find((f) => f.number === intBusc);
        ul.innerHTML = "";
        const li = document.createElement("li");
        li.textContent = `${frota.number} - ${frota.model}`;
        li.style.cursor = "pointer";

        li.addEventListener("click", () => {
          exibirEspecific(frota, divContentLeft);
        });

        ul.appendChild(li);
      }

      
      frotas.forEach((frota) => {
        const li = document.createElement("li");

        li.textContent = `${frota.name} - ${frota.number}`;

        li.addEventListener("click", () => {
          exibirEspecific(frota, divContentLeft);
        });

        ul.appendChild(li);
      });
    } catch (error) {
      console.error("erro ao carregar", error);
      const li = document.createElement("li");
      li.textContent = "Erro ao carregar frota";
      li.style.color = "red";
      ul.appendChild(li);
    }
  });

  function carregarFrotas() {
    try {
      const frotas = response;

      frotas.forEach((frota) => {
        const li = document.createElement("li");
        li.textContent = ` ${frota.number} - ${frota.name}`;
        li.style.cursor = "pointer";
        li.addEventListener("click", () => {
          exibirEspecific(frota, divContentLeft);
        });

        ul.appendChild(li);
      });

      const filtrados = frotas.map((f) => {});
    } catch (er) {
      console.log(er);
    }
  }

  carregarFrotas();

  // lado direito

  divContentRight.appendChild(h1_d);

  divContentRight.appendChild(inputBusc);
  divContentRight.appendChild(btnBusca);
  divContentRight.appendChild(ul);

  //lado esquerdo
  divContentLeft.appendChild(h1_l);

  // conteudo central
  divContainer.append(divContentRight, divContentLeft);

  return divContainer;
}



function exibirEspecific(frota, divContentLeft) {
  divContentLeft.innerHTML = "";

  const h1 = document.createElement("h1");
  h1.textContent = `${frota.name} - ${frota.model}`;
  divContentLeft.appendChild(h1);

  const specs = [
    { label: "Ano", value: frota.year },
    { label: "Número", value: frota.number },
    { label: "Filtro 1", value: frota.fil_1 },
    { label: "Filtro 2", value: frota.fil_2 },
    { label: "Filtro 3", value: frota.fil_3 },
    { label: "Filtro 4", value: frota.fil_4 },
    { label: "Filtro 5", value: frota.fil_5 },
    { label: "Filtro 6", value: frota.fil_6 },
    { label: "Filtro 7", value: frota.fil_7 },
    { label: "Óleo de Motor", value: frota.oil_motor },
    { label: "Óleo de Hidráulico", value: frota.oil_hidra },
    { label: "Óleo de Freio", value: frota.oil_brake },
  ];

  specs.forEach((spec) => {
    const p = document.createElement("p");
    p.innerHTML = `<strong> ${spec.label}:</strong> ${spec.value}`;
    divContentLeft.appendChild(p);
  });
}

*/
