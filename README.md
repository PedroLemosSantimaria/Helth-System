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
