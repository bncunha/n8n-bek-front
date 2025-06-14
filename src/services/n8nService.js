class N8NService {
  constructor() {}

  async getIp() {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      const response = await this.getStatus();
      if (response.status === "PRONTO") {
        resolve(response.ip);
      } else if (response.status == "PREPARANDO") {
        setTimeout(async () => {
          resolve(await this.getIp());
        }, 3000);
      } else if (response.status == "INICIADO") {
        setTimeout(async () => {
          resolve(await this.getIp());
        }, 60000);
      } else {
        reject(new Error("N8N não está pronto"));
      }
    });
  }

  async getStatus() {
    const response = await fetch(import.meta.env.VITE_N8N_URL);
    const body = await response.json();
    return body;
  }
}

// Instância singleton do serviço
const n8nService = new N8NService();

export default n8nService;
