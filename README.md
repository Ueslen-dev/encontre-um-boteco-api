

<div align="center">
    <img src="https://user-images.githubusercontent.com/65665108/143971461-d8ddcafa-9f2c-44fb-933d-758973ee5a8b.png" width="250"/>
</div>

## :bulb: Sobre o projeto
O Encontre um Boteco API é uma aplicação simples desenvolvida no padrão REST, a API foi desenvolvida utilizando Node Js, TypeScript e Express, plugada em uma base de dados MongoDB Cloud. 

A API possui serviço para upload de arquivos e disparos de e-mails, onde foi utilizado o Multer e o Nodemailler.

<div align="center">
    <img src="https://user-images.githubusercontent.com/65665108/177460095-9a837a73-deee-490e-842f-ea0989ee5867.png" width="500"/>
</div>

## 🚀 Tecnologias

Tecnologias que foram utilizadas no projeto:

- [NodeJS](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Mongoose](https://mongoosejs.com/)
- [Express](https://expressjs.com/pt-br/)
- [Multer](https://www.npmjs.com/package/multer)
- [Nodemailer](https://nodemailer.com/about/)
- [Handlebars](https://handlebarsjs.com/)
- [Eslint](https://eslint.org/)

<div align="center">
    <img src="https://user-images.githubusercontent.com/65665108/177460239-585f80fd-af25-4c89-995b-11aa4efbc577.png" width="600"/> 
</div>

## 👀 Observação

O projeto foi desenvolvido para ser utilizado no projeto: [Encontre um Boteco](https://github.com/Ueslen-dev/encontre-um-boteco)


## 💻 Começando
Para começar precisamos instalar algumas coisas

### Requerimentos

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/)
- Crie uma conta no [MongoDB Cloud](https://account.mongodb.com/account/login) e crie um cluster


```bash
$ git clone https://github.com/Ueslen-dev/encontre-um-boteco-api && cd encontre-um-boteco-api
```

**Siga esses passos**
1. Na pasta raiz do projeto altere o nome do arquivo `.env.example` para `.env`
2. Abra o arquivo e insira as seguintes variáveis de ambiente:
```bash
PORT= porta em que o servidor vai rodar
DB_USER= usuário do banco de dados
DB_PASS= senha do banco de dados
DB_CLUSTER= cluster criado no MongoDB Cloud
DB= nome do banco de dados
EMAIL_USER= e-mail do usuário que irá disparar e-mails
EMAIL_PASS= senha do e-mail
EMAIL_HOST= host do provedor de e-mails
EMAIL_PORT= porta do provedor de e-mails

# Instale as dependências
$ yarn
# Rodando o projeto
$ yarn dev
```
* Para disparos de e-mails local recomendo utilizar o [Mailtrap](https://mailtrap.io/)
## 📝 Licença

Esse projeto é licenciado pelo MIT License

---

Feito com amor 💙&nbsp; por Ueslen Santana 👋 &nbsp;[Veja meu linkedin](https://www.linkedin.com/in/ueslen-santos)
