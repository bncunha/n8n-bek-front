import { generateUUID } from "@/lib/generateUUID";

// Configurações da API
const API_CONFIG = {
  // Timeout de 3 minutos (180 segundos)
  TIMEOUT: 180000,

  // Endpoints
  ENDPOINTS: {
    CHAT: "/" + import.meta.env.VITE_WEBHOOK_PATH || "/api/chat",
    UPLOAD: "/api/upload",
  },
};

class ApiService {
  constructor() {
    this.timeout = API_CONFIG.TIMEOUT;
    this.uuid = generateUUID();
    this.baseURL = import.meta.env.VITE_API_URL;
  }

  /**
   * Envia mensagem para o backend
   * @param {string} message - Mensagem de texto
   * @param {File[]} files - Array de arquivos (opcional)
   * @returns {Promise<Object>} Resposta do backend
   */
  async sendMessage(message, files = []) {
    const formData = new FormData();

    // Adiciona os arquivos
    files.forEach((file, index) => {
      formData.append(`file_${index}`, file);
    });

    // Adiciona metadados dos arquivos
    formData.append(
      "files_metadata",
      JSON.stringify(
        files.map((file) => ({
          name: file.name,
          size: file.size,
          type: file.type,
          lastModified: file.lastModified,
        }))
      )
    );

    try {
      const response = await this.fetchWithTimeout(
        `${this.baseURL}`,
        {
          method: "POST",
          body: JSON.stringify({
            url: "http://" + this.ip + API_CONFIG.ENDPOINTS.CHAT,
            method: "POST",
            body: {
              message: message,
              uuid: this.uuid,
            },
          }),
          headers: {
            // Não definir Content-Type para FormData - o browser define automaticamente
          },
        },
        this.timeout
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      throw this.handleError(error);
    }
  }

  /**
   * Fetch com timeout personalizado
   * @param {string} url - URL da requisição
   * @param {Object} options - Opções do fetch
   * @param {number} timeout - Timeout em milissegundos
   * @returns {Promise<Response>} Resposta da requisição
   */
  async fetchWithTimeout(url, options, timeout) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === "AbortError") {
        throw new Error(
          "Timeout: A requisição demorou mais de 3 minutos para responder"
        );
      }
      throw error;
    }
  }

  setBaseURL(ip) {
    this.ip = ip;
  }
  /**
   * Trata erros da API
   * @param {Error} error - Erro capturado
   * @returns {Error} Erro tratado
   */
  handleError(error) {
    if (error.message.includes("Timeout")) {
      return new Error(
        "A requisição demorou mais de 3 minutos. Tente novamente."
      );
    }

    if (error.message.includes("Failed to fetch")) {
      return new Error(
        "Não foi possível conectar ao servidor. Verifique sua conexão."
      );
    }

    if (error.message.includes("HTTP error")) {
      return new Error("Erro no servidor. Tente novamente mais tarde.");
    }

    return new Error("Erro inesperado. Tente novamente.");
  }
}

// Instância singleton do serviço
const apiService = new ApiService();

export default apiService;
export { API_CONFIG };
