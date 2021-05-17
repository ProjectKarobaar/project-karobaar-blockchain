const Web3 = require("web3");
const Tx = require("ethereumjs-tx");

function createConnection(address){
    return new Web3(address);
}

async function getBalance(conn, address){
    let wei = await conn.eth.getBalence(address);
    return conn.utils.fromwei(wei, "ether");
}

async function sendEthers(conn, from, to, value, privatKey){
    let tr = {
        from: from,
        to: to,
        nonce: await conn.eth. getTransactionCount(from),
        gasPrice: conn.utils.toHex(1000),
        gasLimit: conn.utils.toHex(1000000),
        value: conn.utils.toWei(value, "ether"),
    };
    let pk = new Buffer(privateKey, "hex");
    let tx = new Tx(tr);
    tx.sign(pk);
    let serializedTx = tx.serialize();
    conn.eth.sendSignedTransaction{
        "0x" + serializedTx.toString("hex"), 
        function(err){
        if(!err) console.log("Successful");
        else console.error(err);
      }
    };
}
module.exports = {
    createConnection: createConnection,
    getBalance: getBalance,
    sendEthers: sendEthers,
};
