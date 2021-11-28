const Web3 = require("web3");

// ABI of remix IDE Demo contract
// Reference  file Demo_Contract
const abi = require("./DemoAbi.json");

// Remix IDE contract deployed address
const CONTRACT_ADDRESS = "0x775DA5C7f56F71927e40B7e7f7721A5BE58a9c23";

// Connection with Ganache(Local Blockchain)
const provider = new Web3(
    new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545")
);

const getBalance = async (id) => {
    const balance = await provider.eth.getBalance(id);
    // "0x29AC4654C329E8Cf385FC57f5CA75fB5269e8fC5"
    return balance;
};

// getBalance("0x29ac4654c329e8cf385fc57f5ca75fb5269e8fc5").then((res) =>
//     console.log(provider.utils.fromWei(res, "ether"))
// );

// Send Transaction between Accounts
const sendTransaction = async (from, to, amount) => {
    provider.eth.sendTransaction({
        from: from,
        to: to,
        value: provider.utils.toWei(amount, "ether"),
    });
};

// sendTransaction(
//     "0x29AC4654C329E8Cf385FC57f5CA75fB5269e8fC5",
//     "0x386AC3BFcd3b0548d5f313c337C416439CF91897",
//     "5"
// );

// Contract
const contract = new provider.eth.Contract(abi, CONTRACT_ADDRESS);

// Call demo contract method

// Get X Value
const getValueX = contract.methods.x().call();
// getValueX.then((res) => console.log(res));

// Change Value of X
getValueX.then((res) => console.log("Before", res));

/*
 * from - Account from it this method will be called, it will cost Gas fees
 * num - New x Value
 */
const setValueX = async (num, from) => {
    await contract.methods.set(num).send({
        from: from,
        // from: "0x29AC4654C329E8Cf385FC57f5CA75fB5269e8fC5",
    });
    const x = await contract.methods.x().call();
    return x;
};

setValueX(999, "0x29AC4654C329E8Cf385FC57f5CA75fB5269e8fC5").then((res) =>
    console.log("New value", res)
);
