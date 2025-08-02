const fs = require("fs");
const readline = require("readline");
const chalk = require("chalk");
const { ethers } = require("ethers");
const { Keypair } = require("@solana/web3.js");
const { Ed25519Keypair: SuiKeypair } = require("@mysten/sui.js");
const { AptosAccount } = require("aptos");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function banner() {
  console.log(chalk.cyan.bold(`
===============================================
🚀 MULTI-CHAIN WALLET CREATOR 🚀
By XBOOT
Support: EVM | Solana | Sui | Aptos
===============================================
`));
}

function generateWallets(chain, amount) {
  let wallets = [];
  for (let i = 0; i < amount; i++) {
    if (chain === "evm") {
      const wallet = ethers.Wallet.createRandom();
      wallets.push({
        index: i + 1,
        address: wallet.address,
        privateKey: wallet.privateKey,
        mnemonic: wallet.mnemonic.phrase
      });
    } else if (chain === "solana") {
      const kp = Keypair.generate();
      wallets.push({
        index: i + 1,
        address: kp.publicKey.toBase58(),
        secretKey: Buffer.from(kp.secretKey).toString("hex")
      });
    } else if (chain === "sui") {
      const kp = SuiKeypair.generate();
      wallets.push({
        index: i + 1,
        address: kp.getPublicKey().toSuiAddress(),
        secretKey: Buffer.from(kp.export().privateKey).toString("hex")
      });
    } else if (chain === "aptos") {
      const acc = new AptosAccount();
      wallets.push({
        index: i + 1,
        address: acc.address().toString(),
        privateKey: Buffer.from(acc.signingKey.secretKey).toString("hex")
      });
    }
  }
  return wallets;
}

function saveCSV(wallets, filename) {
  const keys = Object.keys(wallets[0]);
  const header = keys.join(",") + "\n";
  const rows = wallets.map(w => keys.map(k => w[k]).join(",")).join("\n");
  fs.writeFileSync(`${filename}.csv`, header + rows);
  console.log(chalk.green(`✅ File berhasil disimpan: ${filename}.csv`));
}

function saveJSON(wallets, filename) {
  fs.writeFileSync(`${filename}.json`, JSON.stringify(wallets, null, 2));
  console.log(chalk.green(`✅ File berhasil disimpan: ${filename}.json`));
}

// ================== CLI ==================
banner();
console.log(chalk.yellow("Pilih chain:"));
console.log("1. EVM (Ethereum/BNB/etc.)");
console.log("2. Solana");
console.log("3. Sui");
console.log("4. Aptos\n");

rl.question("👉 Masukkan nomor chain (1-4): ", (chainInput) => {
  const chainMap = { "1": "evm", "2": "solana", "3": "sui", "4": "aptos" };
  const chain = chainMap[chainInput];

  if (!chain) {
    console.log(chalk.red("❌ Chain tidak valid."));
    rl.close();
    return;
  }

  rl.question("👉 Masukkan jumlah wallet (max 1000): ", (amountInput) => {
    const amount = parseInt(amountInput);
    if (isNaN(amount) || amount <= 0 || amount > 1000) {
      console.log(chalk.red("❌ Jumlah tidak valid. Gunakan angka 1-1000."));
      rl.close();
      return;
    }

    rl.question("👉 Nama file output (tanpa ekstensi): ", (filename) => {
      rl.question("👉 Pilih format output (csv/json): ", (format) => {

        console.log(chalk.yellow.bold("\n⚠️ Jangan bagikan file ini! Semua private key bersifat rahasia.\n"));

        const wallets = generateWallets(chain, amount);

        if (format.toLowerCase() === "csv") {
          saveCSV(wallets, filename);
        } else if (format.toLowerCase() === "json") {
          saveJSON(wallets, filename);
        } else {
          console.log(chalk.red("❌ Format tidak dikenal."));
        }

        rl.close();
      });
    });
  });
});
