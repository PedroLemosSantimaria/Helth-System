# 📌 Sistema de Atendimento Hospitalar

## 📖 Visão Geral
Este sistema tem como objetivo gerenciar o fluxo de atendimento de pacientes em uma unidade de saúde, controlando desde o cadastro até a triagem e encaminhamento.

## 🧪 Tecnologias Utilizadas
- **Back-end:** .NET Core (API REST - Code First)
- **Front-end:** React JS (Vite)
- **Banco de Dados:** SQL Server + Entity Framework

---

## 📋 Requisitos

### ✅ Requisitos Funcionais

#### **RF01 - Cadastro de Pacientes**
O sistema deve permitir cadastrar pacientes com:
- Nome
- Telefone
- Sexo
- Email

#### **RF02 - Listagem de Pacientes**
O sistema deve listar todos os pacientes cadastrados.

#### **RF03 - Atualização de Pacientes**
O sistema deve permitir editar os dados de um paciente.

#### **RF04 - Exclusão de Pacientes**
O sistema deve permitir excluir pacientes.

#### **RF05 - Criar Atendimento**
O sistema deve:
1. Gerar atendimento vinculado a um paciente
2. Gerar número sequencial automático
3. Registrar data/hora de chegada
4. Definir status inicial como **Aguardando**

#### **RF06 - Fila de Atendimento**
O sistema deve:
- Listar atendimentos com status **Aguardando**
- Ordenar por número sequencial

#### **RF07 - Chamar Próximo Paciente**
O sistema deve:
- Selecionar o próximo paciente da fila
- Alterar status para **Em Triagem**

#### **RF08 - Realizar Triagem**
O sistema deve permitir registrar:
- Sintomas
- Pressão arterial
- Peso
- Altura
- Especialidade

> **Nota:** Após o registro, o status deve ser alterado para **Triado**.

#### **RF09 - Dashboard**
O sistema deve exibir:
- Pacientes
- Atendimentos
- Triagens

---

### ⚙️ Requisitos Não Funcionais
- API RESTful
- Uso de Entity Framework (Code First)
- Persistência em banco relacional
- Front-end SPA (React)
- Respostas em JSON

---

## 🛠️ Como montar o ambiente local

Esta seção complementa o README com um passo a passo para rodar o projeto em outra máquina.

### Estrutura do projeto

```text
Helth-System/
  ApiHelth/
    ApiHelth/        # Back-end ASP.NET Core Web API
  Helth/             # Front-end React + Vite
```

### Pré-requisitos

Instale antes de rodar o projeto:

- Git
- Node.js compatível com o Vite do projeto
- .NET 10 SDK
- SQL Server Express
- SQL Server Management Studio, opcional, mas recomendado

Ao instalar o SQL Server Express, use ou confirme a instância:

```text
SQLEXPRESS
```

O back-end está configurado para usar o banco local:

```text
HospitalDb
```

A connection string fica em `ApiHelth/ApiHelth/appsettings.json`:

```json
"DefaultConnection": "Server=.\\SQLEXPRESS;Database=HospitalDb;Trusted_Connection=True;TrustServerCertificate=True;"
```

### 1. Clonar o repositório

```bash
git clone https://github.com/PedroLemosSantimaria/Helth-System.git
cd Helth-System
```

Se for trabalhar na branch de melhorias:

```bash
git switch melhorias-funcionais-vitor
```

### 2. Configurar o front-end

Entre na pasta do front-end:

```bash
cd Helth
```

Instale as dependências:

```bash
npm install
```

Confira se existe o arquivo `Helth/.env` com:

```env
VITE_API_URL=http://localhost:5139/api
```

Se o arquivo não existir, crie o `.env` dentro da pasta `Helth` com esse conteúdo.

### 3. Configurar o back-end e o banco

Volte para a raiz do projeto e entre na pasta da API:

```bash
cd ../ApiHelth/ApiHelth
```

Restaure as dependências do .NET:

```bash
dotnet restore
```

Instale a ferramenta do Entity Framework, caso ainda não tenha:

```bash
dotnet tool install --global dotnet-ef
```

Se ela já estiver instalada e precisar atualizar:

```bash
dotnet tool update --global dotnet-ef
```

Crie ou atualize o banco `HospitalDb`:

```bash
dotnet ef database update
```

Esse comando usa as migrations já existentes e cria as tabelas iniciais, incluindo status de atendimento e especialidades.

### 4. Rodar o back-end

Na pasta `ApiHelth/ApiHelth`, execute:

```bash
dotnet run
```

A API deve subir em:

```text
http://localhost:5139
```

Os endpoints usam o prefixo:

```text
http://localhost:5139/api
```

Exemplos:

```text
GET  http://localhost:5139/api/Paciente
GET  http://localhost:5139/api/Atendimento/fila
GET  http://localhost:5139/api/Especialidade
GET  http://localhost:5139/api/Triagem
POST http://localhost:5139/api/Triagem
```

### 5. Rodar o front-end

Em outro terminal, entre na pasta `Helth`:

```bash
cd Helth
```

Execute:

```bash
npm run dev
```

O front-end deve abrir em:

```text
http://localhost:5173
```

### Comandos de validação

Back-end:

```bash
cd ApiHelth/ApiHelth
dotnet build
```

Front-end:

```bash
cd Helth
npm run build
```

### Observações

- O front-end depende da API rodando em `http://localhost:5139/api`.
- O banco esperado é `HospitalDb` no SQL Server Express `SQLEXPRESS`.
- Se alterar o arquivo `.env`, reinicie o `npm run dev`.
- Se o comando `dotnet ef` não for reconhecido, feche e abra o terminal depois da instalação.
- Se a API não conectar ao banco, confira se o serviço do SQL Server Express está iniciado.
