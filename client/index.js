const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");

const serverUrl = "http://localhost:1225";
const merkleTree = new MerkleTree(niceList);

async function main() {
  // TODO: how do we prove to the server we're on the nice list?
  const name = "Sidney Kertzmann";
  const index = niceList.indexOf(name);
  const proof = merkleTree.getProof(index);
  try {
    const { data: gift } = await axios.post(`${serverUrl}/gift`, {
      proof,
      name,
    });

    console.log({ gift });
  } catch (e) {
    console.log(e);
  }
}

main();
