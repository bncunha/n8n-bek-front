# Chatbot Frontend

Este é o frontend do chatbot desenvolvido em React.js com funcionalidades de envio de texto e upload de arquivos.

## Funcionalidades

- ✅ Interface de chat responsiva
- ✅ Envio de mensagens de texto
- ✅ Upload de múltiplos arquivos
- ✅ Integração com backend síncrono (timeout de 3 minutos)
- ✅ Indicadores de carregamento
- ✅ Histórico de conversas
- ✅ Design moderno com Tailwind CSS e shadcn/ui

## Configuração

### 1. Instalação das dependências

```bash
npm install
# ou
pnpm install
```

### 2. Configuração do ambiente

Copie o arquivo `.env.example` para `.env` e configure a URL do seu backend:

```bash
cp .env.example .env
```

Edite o arquivo `.env` e defina a URL do seu backend:

```
REACT_APP_API_URL=http://localhost:8000
```

### 3. Executar em desenvolvimento

```bash
npm run dev
# ou
pnpm run dev
```

O aplicativo estará disponível em `http://localhost:5173`

### 4. Build para produção

```bash
npm run build
# ou
pnpm run build
```

Os arquivos de produção serão gerados na pasta `dist/`

## Integração com Backend

### Endpoint esperado

O frontend espera que o backend tenha o seguinte endpoint:

**POST** `/api/chat`

### Formato da requisição

O frontend envia os dados como `FormData` com os seguintes campos:

- `message`: String com a mensagem de texto
- `file_0`, `file_1`, etc.: Arquivos enviados pelo usuário
- `files_metadata`: JSON string com metadados dos arquivos

Exemplo de metadados:
```json
[
  {
    "name": "documento.pdf",
    "size": 1024000,
    "type": "application/pdf",
    "lastModified": 1640995200000
  }
]
```

### Formato da resposta esperada

O backend deve retornar um JSON com o seguinte formato:

```json
{
  "message": "Resposta do chatbot aqui",
  "status": "success"
}
```

### Timeout

O frontend está configurado para aguardar até **3 minutos** pela resposta do backend. Certifique-se de que seu backend processe as requisições dentro deste tempo limite.

### Health Check (Opcional)

O frontend pode verificar se o backend está disponível através do endpoint:

**GET** `/health`

Deve retornar status HTTP 200 se o backend estiver funcionando.

## Deploy no Netlify

### 1. Build do projeto

```bash
npm run build
```

### 2. Configuração no Netlify

1. Faça upload da pasta `dist/` para o Netlify
2. Configure as variáveis de ambiente:
   - `REACT_APP_API_URL`: URL do seu backend em produção

### 3. Configuração de redirecionamento

Crie um arquivo `dist/_redirects` com o conteúdo:

```
/*    /index.html   200
```

Isso garante que o roteamento do React funcione corretamente.

## Estrutura do Projeto

```
src/
├── components/
│   └── ui/           # Componentes UI do shadcn/ui
├── services/
│   └── apiService.js # Serviço de integração com backend
├── App.jsx           # Componente principal do chatbot
├── App.css           # Estilos globais
└── main.jsx          # Ponto de entrada da aplicação
```

## Tecnologias Utilizadas

- **React 18**: Framework principal
- **Vite**: Build tool e dev server
- **Tailwind CSS**: Framework de CSS
- **shadcn/ui**: Biblioteca de componentes
- **Lucide React**: Ícones
- **Framer Motion**: Animações (disponível se necessário)

## Personalização

### Cores e Tema

As cores podem ser personalizadas no arquivo `src/App.css` através das variáveis CSS customizadas.

### Componentes

Novos componentes podem ser adicionados na pasta `src/components/`. Os componentes UI do shadcn/ui estão disponíveis em `src/components/ui/`.

### API Service

O serviço de API pode ser personalizado no arquivo `src/services/apiService.js` para atender às necessidades específicas do seu backend.

## Suporte

Para dúvidas ou problemas, verifique:

1. Se o backend está rodando e acessível
2. Se as variáveis de ambiente estão configuradas corretamente
3. Se não há erros no console do navegador
4. Se a rede permite conexões com o backend

