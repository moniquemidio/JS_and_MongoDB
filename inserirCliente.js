// importar MongoClient
const { MongoClient } = require("mongodb");

// URL da conexão (Mongo local)
const url = "mongodb://localhost:27017";

// Cria cliente Mongo
const client = new MongoClient(url);

// Função assíncrona principal: Define uma função assíncrona (async) chamada main(). 
// Isso permite usar await para aguardar operações como connect() e insertOne().
async function main() {

//Inicia um bloco try para tentar executar o código e capturar erros (caso aconteçam) com catch.
  try {
    // Conectar ao servidor: client.connect() conecta o Node.js ao servidor MongoDB.
    //await faz o código aguardar a conexão antes de continuar.  
    await client.connect();
    console.log("🟢 Conectado ao MongoDB!");

    // Seleciona o banco e a coleção. Acessa (ou cria, se não existir) o banco de dados chamado "loja".
    const db = client.db("loja");
    const clientes = db.collection("clientes");

    // Documento que será inserido
    const novoCliente = {
      nome: "ExemploCliente",
      idade: 32,
      email: "exemplocliente@email.com"
    };

    // Insere no banco: await espera o Mongo terminar a operação antes de continuar.
    const resultado = await clientes.insertOne(novoCliente);
    console.log("✅ Documento inserido com ID:", resultado.insertedId);

    //Se algum erro acontecer dentro do try, ele é capturado aqui no catch e exibido no console.
  } catch (erro) {
    console.error("❌ Erro ao conectar ou inserir:", erro);

    //Garante que a conexão com o banco será fechada, mesmo que ocorra erro.
  } finally {
    // Fecha a conexão
    await client.close();
  }
}

// Executa a função: Executa a função main() que você acabou de declarar lá em cima. Sem isso, nada aconteceria.
main();
