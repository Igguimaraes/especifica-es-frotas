const DATA_SOURCE = {
  type: "local",
  local: "./dados.json",
  api: "https://api.com/dados",
};

class DataService {
  constructor(config = DATA_SOURCE) {
    this.config = config;
  }

  async fetchData() {
    try {
      if (this.config.type === "local") {
        return await this._loadLocal();
      } else {
        return await this._loadFromApi();
      }
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      throw error;
    }
  }

  async _loadLocal() {
    const { default: data } = await import(this.config.local, {
      assert: { type: "json" },
    });
    return data;
  }

  async _loadFromApi() {
    const response = await fetch(this.config.api, {
      method: "GET",
      headers: { "content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`HTTP://${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  }

  setSource(type, path = null) {
    this.config.type = type;
    if (path) {
      this.config[type] = path;
    }
  }
}

export const service = new DataService();

service.fetchData().then((data) => {
  console.log(`Dados carregados`, data);
});
