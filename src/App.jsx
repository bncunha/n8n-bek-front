import { useEffect, useState } from "react";
import "./Chat.css";
import n8nService from "./services/n8nService";
import apiService from "./services/apiService";
import Chat from "./Chat";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkN8nStatus();
  }, []);

  const checkN8nStatus = async () => {
    await n8nService
      .getIp()
      .then((ip) => {
        apiService.setBaseURL(ip);
        setLoading(false);
      })
      .catch((_) => {
        alert("Erro ao iniciar. Reinicie a página e tente novamente.");
        setLoading(false);
      });
  };

  return loading ? (
    <div className="text-center">
      <h1 className="text-xl">Iniciando o Chat...</h1>
      <p className="m-2">Por favor, aguarde enquanto o sistema é preparado.</p>
      <p className="m-2">Isso pode levar alguns minutos.</p>
      <p className="m-2">Se demorar muito, tente reiniciar a página.</p>
    </div>
  ) : (
    <Chat />
  );
}

export default App;
