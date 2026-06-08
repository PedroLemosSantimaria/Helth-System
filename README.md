# Sistema de Atendimento Hospitalar

Sistema desenvolvido para disciplina/projeto de faculdade com o objetivo de
gerenciar um fluxo simples de atendimento hospitalar: cadastro de pacientes,
fila de atendimento, chamada do proximo paciente, triagem e dashboard.

## Estrutura do projeto

```text
Helth-System/
  ApiHelth/
    ApiHelth/        # Backend ASP.NET Core Web API
  Helth/             # Frontend React + Vite
```

## Tecnologias

- Backend: ASP.NET Core Web API (.NET 10), C# e Entity Framework Core
- Frontend: React, Vite, React Router, Tailwind CSS e Axios
- Banco de dados: SQL Server Express
- Banco local usado no projeto: `HospitalDb`
- Instancia SQL Server esperada: `SQLEXPRESS`

## Funcionalidades principais

- Cadastro e listagem de pacientes
- Criacao de atendimento vinculado a paciente
- Listagem da fila de atendimento
- Chamada do proximo paciente
- Cadastro de triagem com sintomas, pressao arterial, peso, altura e especialidade
- Listagem de triagens salvas
- Dashboard com resumo do sistema

## Pre-requisitos para rodar em outra maquina

Instale os itens abaixo antes de iniciar:

1. Node.js compativel com o Vite usado no projeto
2. .NET 10 SDK
3. SQL Server Express
4. SQL Server Management Studio, opcional, mas recomendado para conferir o banco
5. Git

Ao instalar o SQL Server Express, use ou confirme a instancia:

```text
SQLEXPRESS
```

O backend esta configurado para conectar em:

```text
Server=.\SQLEXPRESS;Database=HospitalDb;Trusted_Connection=True;TrustServerCertificate=True;
```

Essa configuracao fica em:

```text
ApiHelth/ApiHelth/appsettings.json
```

## Passo a passo de instalacao

### 1. Clonar o repositorio

```bash
git clone https://github.com/PedroLemosSantimaria/Helth-System.git
cd Helth-System
```

Se estiver trabalhando em uma branch especifica:

```bash
git switch melhorias-funcionais-vitor
```

### 2. Configurar o frontend

Entre na pasta do frontend:

```bash
cd Helth
```

Instale as dependencias:

```bash
npm install
```

Confira se existe o arquivo `.env` dentro da pasta `Helth`.
Ele deve apontar para a API local:

```env
VITE_API_URL=http://localhost:5139/api
```

Se o arquivo nao existir, crie `Helth/.env` com esse conteudo.

### 3. Configurar o backend e o banco

Volte para a raiz do projeto e entre na pasta da API:

```bash
cd ../ApiHelth/ApiHelth
```

Restaure as dependencias do .NET:

```bash
dotnet restore
```

Instale a ferramenta do Entity Framework, caso ainda nao tenha:

```bash
dotnet tool install --global dotnet-ef
```

Se a ferramenta ja estiver instalada e precisar atualizar:

```bash
dotnet tool update --global dotnet-ef
```

Crie/atualize o banco `HospitalDb` no SQL Server Express:

```bash
dotnet ef database update
```

Esse comando usa as migrations do projeto e cria as tabelas iniciais, incluindo
status de atendimento e especialidades cadastradas por seed.

## Como rodar o projeto

Use dois terminais: um para o backend e outro para o frontend.

### Terminal 1: backend

Na pasta:

```text
ApiHelth/ApiHelth
```

Execute:

```bash
dotnet run
```

A API deve subir em:

```text
http://localhost:5139
```

Os endpoints ficam sob:

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

### Terminal 2: frontend

Na pasta:

```text
Helth
```

Execute:

```bash
npm run dev
```

O frontend deve abrir em:

```text
http://localhost:5173
```

## Comandos de validacao

Backend:

```bash
cd ApiHelth/ApiHelth
dotnet build
```

Frontend:

```bash
cd Helth
npm run build
```

## Fluxo de uso recomendado

1. Cadastrar um paciente.
2. Conferir se o paciente aparece na listagem.
3. Adicionar o paciente na fila, se necessario.
4. Chamar o proximo paciente.
5. Fazer a triagem informando o ID do atendimento chamado.
6. Escolher a especialidade pelo nome no select.
7. Salvar a triagem.
8. Conferir a triagem na listagem de triagens salvas.

## Observacoes importantes

- O frontend depende da API rodando em `http://localhost:5139/api`.
- O banco esperado e `HospitalDb` no SQL Server Express `SQLEXPRESS`.
- Nao e necessario criar migration para rodar o projeto atual; use as migrations ja existentes.
- Se o `dotnet ef` nao for reconhecido, feche e abra o terminal apos instalar a ferramenta.
- Se a API nao conectar ao banco, confira se o servico do SQL Server Express esta iniciado.
- Se a porta `5173` estiver ocupada, o Vite pode sugerir outra porta no terminal.

## Problemas comuns

### Erro de conexao com SQL Server

Verifique:

- SQL Server Express instalado
- Instancia `SQLEXPRESS` ativa
- Connection string em `appsettings.json`
- Autenticacao integrada do Windows habilitada

### Frontend nao chama a API

Verifique:

- Backend rodando em `http://localhost:5139`
- Arquivo `Helth/.env` com `VITE_API_URL=http://localhost:5139/api`
- Reinicie o `npm run dev` depois de alterar o `.env`

### Banco sem tabelas

Execute novamente:

```bash
cd ApiHelth/ApiHelth
dotnet ef database update
```
