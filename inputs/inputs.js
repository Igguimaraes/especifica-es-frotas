import { LIST_FROTAS, saveStorage } from "../services/dados.js";

export function Inputs() {
  const main = document.createElement("div");
  main.className = "main-Input";

  const content = document.createElement("div");
  content.className = "content-Input";

  // Título
  const h1 = document.createElement("h1");
  h1.textContent = "Cadastrar Modelo";

  // === SEÇÃO: INFORMAÇÕES DA MÁQUINA ===
  const titleMachine = document.createElement("div");
  titleMachine.className = "section-title";
  titleMachine.textContent = "Informações da Máquina";

  const gridMachine = document.createElement("div");
  gridMachine.className = "form-grid";

  // Nome da máquina
  const inputName = createField("Máquina", "text", "Ex: Colheitadeira S790");

  // Modelo (select)
  const selectM = document.createElement("select");
  selectM.id = "selectModel";
  const optDefault = document.createElement("option");
  optDefault.value = "";
  optDefault.textContent = "Selecione";
  optDefault.disabled = true;
  optDefault.selected = true;
  const optJD = document.createElement("option");
  optJD.value = "JD";
  optJD.textContent = "John Deere";
  const optNH = document.createElement("option");
  optNH.value = "New Holland";
  optNH.textContent = "New Holland";
  selectM.append(optDefault, optJD, optNH);
  const groupModel = document.createElement("div");
  groupModel.className = "form-group";
  const labelModel = document.createElement("label");
  labelModel.textContent = "Modelo";
  groupModel.append(labelModel, selectM);

  // Ano da frota
  const inputYear = createField("Ano da Frota", "number", "Ex: 2022");

  // Número de Frota
  const inputFrota = createField("Nº da Frota", "text", "Ex: 1234");

  const inputImage = createField(
    "URL da Imagem",
    "url",
    "https://exemplo.com/foto.jpg",
  );

  gridMachine.append(inputName, groupModel, inputYear, inputFrota, inputImage);

  // === SEÇÃO: FILTROS ===
  const titleFilters = document.createElement("div");
  titleFilters.className = "section-title";
  titleFilters.textContent = "Filtros";

  const gridFilters = document.createElement("div");
  gridFilters.className = "form-grid";

  const inputFilt1 = createField("Filtro 01", "text", "Código do filtro");
  const inputFilt2 = createField("Filtro 02", "text", "Código do filtro");
  const inputFilt3 = createField("Filtro 03", "text", "Código do filtro");
  const inputFilt4 = createField("Filtro 04", "text", "Código do filtro");
  const inputFilt5 = createField("Filtro 05", "text", "Código do filtro");
  const inputFilt6 = createField("Filtro 06", "text", "Código do filtro");
  const inputFilt7 = createField("Filtro 07", "text", "Código do filtro");

  gridFilters.append(
    inputFilt1,
    inputFilt2,
    inputFilt3,
    inputFilt4,
    inputFilt5,
    inputFilt6,
    inputFilt7,
  );

  // === SEÇÃO: ÓLEOS / LUBRIFICANTES ===
  const titleOils = document.createElement("div");
  titleOils.className = "section-title";
  titleOils.textContent = "Óleos e Lubrificantes";

  const gridOils = document.createElement("div");
  gridOils.className = "form-grid";

  const inputOilMotor = createField("Óleo do Motor", "text", "Ex: SAE 15W-40");
  const inputOilHidraulico = createField(
    "Óleo Hidráulico",
    "text",
    "Ex: AW 68",
  );
  const inputOilBrake = createField("Óleo de Freio", "text", "Ex: DOT 4");

  gridOils.append(inputOilMotor, inputOilHidraulico, inputOilBrake);

  // === BOTÕES ===
  const buttonsRow = document.createElement("div");
  buttonsRow.className = "buttons-row";

  const btnCreate = document.createElement("button");
  btnCreate.textContent = "Cadastrar";
  btnCreate.className = "btnCreate";

  const btnExit = document.createElement("button");
  btnExit.textContent = "Cancelar";
  btnExit.className = "btnExit";

  buttonsRow.append(btnCreate, btnExit);

  // === EVENTOS ===
  btnCreate.addEventListener("click", () => {
    const payload = {
      image: inputImage.querySelector("input").value,
      name: inputName.querySelector("input").value,
      model: selectM.value,
      year: Number(inputYear.querySelector("input").value),
      number: inputFrota.querySelector("input").value,
      fil_1: inputFilt1.querySelector("input").value,
      fil_2: inputFilt2.querySelector("input").value,
      fil_3: inputFilt3.querySelector("input").value,
      fil_4: inputFilt4.querySelector("input").value,
      fil_5: inputFilt5.querySelector("input").value,
      fil_6: inputFilt6.querySelector("input").value,
      fil_7: inputFilt7.querySelector("input").value,
      oil_motor: inputOilMotor.querySelector("input").value,
      oil_hidra: inputOilHidraulico.querySelector("input").value,
      oil_brake: inputOilBrake.querySelector("input").value,
    };

    LIST_FROTAS.push(payload);
    saveStorage();

    // Feedback visual
    btnCreate.textContent = "✓ Cadastrado";
    btnCreate.style.backgroundColor = "#16a34a";
    setTimeout(() => {
      btnCreate.textContent = "Cadastrar";
      btnCreate.style.backgroundColor = "";
      main.remove();
    }, 1500);
  });

  btnExit.addEventListener("click", () => {
    main.remove();
  });

  // === MONTAGEM FINAL ===
  content.append(
    h1,
    titleMachine,
    gridMachine,
    titleFilters,
    gridFilters,
    titleOils,
    gridOils,
    buttonsRow,
  );
  main.appendChild(content);
  return main;
}

// Helper para criar campo com label + input
export function createField(labelText, type, placeholder) {
  const group = document.createElement("div");
  group.className = "form-group";

  const label = document.createElement("label");
  label.textContent = labelText;

  const input = document.createElement("input");
  input.type = type;
  input.placeholder = placeholder;

  group.append(label, input);
  return group;
}
