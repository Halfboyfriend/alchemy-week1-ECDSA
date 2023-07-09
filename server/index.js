const express = require("express");
const app = express();
const crypto = require('./crypto');
const cors = require("cors");

const port = 3042;

app.use(cors());
app.use(express.json());

// const balances = new Map([
//   ["71CAB4296C6119251DE6E3487425E5CFEDC3E4C1", 100], // SAM
//   ["759F1AFDC24ABA433A3E18B683F8C04A6EAA69F0", 50], // JONES
//   ["A509451F7A2F64C15837BFBB81298B1E3E24E4FA",  75] // MAY

// ])

const balances = {
    "71CAB4296C6119251DE6E3487425E5CFEDC3E4C1": 100,
    "759F1AFDC24ABA433A3E18B683F8C04A6EAA69F0": 50,
    "A509451F7A2F64C15837BFBB81298B1E3E24E4FA": 75
}

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { message, signature } = req.body;
  const {recipient, amount} = message;

  const pubKey = crypto.signatureToPubKey(message, signature);
  const sender = crypto.publicKeyToAddress(pubKey);

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances.get(sender) < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances.set(sender, balances.get(sender) - amount);
    balances.set(recipient, balances.get(recipient) + amount);
    res.send({ balance: balances.get(sender) });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
