🏠 Imobiliária Prime Master

Plataforma SPA Angular para gestão de imóveis, com autenticação baseada em perfil (cliente e corretor) e CRUD completo para corretores.

🎯 Objetivo

Desenvolver uma Single Page Application (SPA) que permita:

Corretores: Gerenciar imóveis com CRUD completo.

Clientes: Pesquisar imóveis, manifestar interesse, acompanhar imóveis favoritos.

Visitantes: Explorar imóveis em destaque e criar conta de cliente.

Garantir controle de acesso seguro com autenticação e autorização por perfil.

📋 Funcionalidades por Perfil
Perfil	Funcionalidades
Visitante	Visualizar imóveis em destaque, detalhes de imóvel, criar conta de cliente
Cliente	Marcar imóveis como "Tenho Interesse", ver lista de interesses, editar perfil
Corretor	CRUD de imóveis, visualizar clientes interessados
⚙️ Tecnologias Utilizadas

Frontend: Angular 17+ (Standalone Components)

Estilização: SCSS com tema verde esmeralda (#009B77)

Formulários: Reactive Forms

Comunicação com API: HttpClient + RxJS (Observable)

Backend simulado: JSON Server

Autenticação: localStorage + AuthService

Proteção de rotas: Guardas (CanActivateFn)

📁 Estrutura do Projeto
src/
└── app/
    ├── core/
    │   ├── guards/        # Guardas de rota
    │   ├── services/      # Auth, Imóveis, Interesses
    │   └── models/        # Interfaces e modelos
    ├── views/
    │   ├── public/        # Home, Login
    │   ├── cliente/       # Funcionalidades do cliente
    │   └── corretor/      # Funcionalidades do corretor
    └── templates/
        ├── components/    # Componentes reutilizáveis (cards, navbar, footer)
        └── pipes/         # Pipes personalizados

🔄 Fluxo de Navegação
flowchart TD
    Start[Início] --> CheckLogin{Usuário Logado?}

    CheckLogin -- Não --> Login[Tela de Login]
    CheckLogin -- Sim --> Tipo{Tipo de Usuário?}

    Tipo -- "cliente" --> Cliente[Dashboard Cliente: /cliente/meus-interesses]
    Tipo -- "corretor" --> Corretor[Dashboard Corretor: /corretor/dashboard]

    Login --> Autenticar[Autenticar com AuthService]
    Autenticar --> Credenciais{Credenciais Válidas?}
    Credenciais -- Sim --> Tipo
    Credenciais -- Não --> Erro[Exibir Mensagem de Erro]
    Erro --> Login

🏷️ Diagrama de Classes
classDiagram
    class Usuario {
        +id: number
        +nome: string
        +email: string
        +senha: string
        +tipo: string
    }

    class Imovel {
        +id: number
        +titulo: string
        +corretorId: number
        +tipo: string
        +cidade: string
        +preco: number
        +descricao: string
        +imagemUrl: string
    }

    class Interesse {
        +id: number
        +clienteId: number
        +imovelId: number
    }

    Usuario "1" -- "0..*" Imovel : publica
    Usuario "1" -- "0..*" Interesse : manifesta
    Imovel "1" -- "0..*" Interesse : recebe

🚀 Casos de Uso
flowchart TD
    subgraph Atores
        V[Visitante]
        C[Cliente]
        R[Corretor]
    end

    subgraph Funcionalidades
        F1[Visualizar Imóveis em Destaque]
        F2[Visualizar Detalhes do Imóvel]
        F3[Criar Conta de Cliente]
        F4[Marcar Imóvel como Interesse]
        F5[Visualizar Meus Interesses]
        F6[Editar Perfil]
        F7[Gerenciar Meus Imóveis]
        F8[Visualizar Clientes Interessados]
        F9[Login]
    end

    V --> F1
    V --> F2
    V --> F3

    C --> F4
    C --> F5
    C --> F6
    C --> F9

    R --> F7
    R --> F8
    R --> F9

💻 Instalação e Setup
1. Instale dependências
npm install

2. Inicie o JSON Server
npx json-server --watch db.json --port 3000

3. Inicie o Angular
ng serve

4. Acesse o projeto
http://localhost:4200

🎨 Tema e Identidade Visual

Cor Primária (verde esmeralda): #009B77

Cor Secundária (cinza escuro): #333333

Cor de fundo / branco: #FFFFFF

Todos os botões, links e destaques seguem o tema verde esmeralda, mantendo consistência visual em toda a aplicação.

📸 Layout e Telas
Página Inicial / Home

Dashboard do Cliente

Dashboard do Corretor

Formulário de Login / Cadastro

⚖️ Observações Técnicas

Autenticação: AuthService + localStorage

Guardas de rota: CanActivateFn para proteger páginas por perfil

Interesses em imóveis: Funcionalidade exclusiva para clientes

Responsividade: Layouts compatíveis com desktop e mobile usando Flexbox e Grid

Animações: Cards e botões possuem transições suaves e hover states

📄 License

MIT © Daniel Goes
