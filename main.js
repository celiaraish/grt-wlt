import fs from "fs";
import readline from "readline";
import chalk from "chalk";
import { Wallet } from "ethers";
import { Keypair } from "@solana/web3.js";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519.js";
import { AptosAccount } from "aptos";

// Banner cantik
function showBanner() {
  console.log(chalk.cyan.bold(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
       🌐 Multi-Chain Wallet Generator
         ✨ by XBOOT (EVM • Solana • Sui • Aptos)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`));
}

// Fungsi generate wallet
function generateWallets(chain, count) {
  let wallets = [];

  for (let i = 0; i < count; i++) {
    if (chain === "EVM") {
      const wallet = Wallet.createRandom();
      wallets.push({ index: i + 1, address: wallet.address, privateKey: wallet.privateKey });
    }

    if (chain === "Solana") {
      const kp = Keypair.generate();
      wallets.push({ index: i + 1, address: kp.publicKey.toBase58(), privateKey: Buffer.from(kp.secretKey).toString("hex") });
    }

    if (chain === "Sui") {
      const kp = Ed25519Keypair.generate();
      wallets.push({ index: i + 1, address: kp.getPublicKey().toSuiAddress(), privateKey: Buffer.from(kp.getSecretKey()).toString("hex") });
    }

    if (chain === "Aptos") {
      const account = new AptosAccount();
      wallets.push({ index: i + 1, address: account.address().hex(), privateKey: Buffer.from(account.signingKey.secretKey).toString("hex") });
    }
  }

  return wallets;
}

// Simpan file CSV atau JSON
function saveFile(fileName, format, wallets) {
  try {
    if (format === "csv") {
      const header = "index,address,privateKey\n";
      const rows = wallets.map(w => `${w.index},${w.address},${w.privateKey}`).join("\n");
      fs.writeFileSync(`${fileName}.csv`, header + rows);
      console.log(chalk.green(`✅ Wallet berhasil disimpan ke ${fileName}.csv`));
    } else {
      fs.writeFileSync(`${fileName}.json`, JSON.stringify(wallets, null, 2));
      console.log(chalk.green(`✅ Wallet berhasil disimpan ke ${fileName}.json`));
    }
  } catch (err) {
    console.log(chalk.red("❌ Gagal menyimpan file:"), err.message);
  }
}

// CLI interaktif
async function start() {
  showBanner();
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  const ask = (q) => new Promise(resolve => rl.question(q, resolve));

  console.log(chalk.yellow("Pilih chain:"));
  console.log("1️⃣  EVM");
  console.log("2️⃣  Solana");
  console.log("3️⃣  Sui");
  console.log("4️⃣  Aptos\n");

  const chainChoice = await ask("👉 Pilih chain (1-4): ");
  const chains = { "1": "EVM", "2": "Solana", "3": "Sui", "4": "Aptos" };
  const chain = chains[chainChoice];

  if (!chain) {
    console.log(chalk.red("❌ Pilihan tidak valid."));
    rl.close();
    return;
  }

  const countInput = await ask("👉 Jumlah wallet yang ingin dibuat (maks 1000): ");
  const count = parseInt(countInput);

  if (isNaN(count) || count <= 0 || count > 1000) {
    console.log(chalk.red("❌ Jumlah wallet tidak valid."));
    rl.close();
    return;
  }

  const fileName = await ask("👉 Nama file output (tanpa ekstensi): ");
  const formatChoice = await ask("👉 Pilih format (csv/json): ");
  const format = formatChoice.toLowerCase();

  if (format !== "csv" && format !== "json") {
    console.log(chalk.red("❌ Format tidak valid."));
    rl.close();
    return;
  }

  console.log(chalk.cyan(`\n🔄 Membuat ${count} wallet untuk ${chain}...`));
  const wallets = generateWallets(chain, count);
  saveFile(fileName, format, wallets);

  console.log(chalk.red.bold("\n⚠️ Jangan bagikan file ini! Private key bersifat rahasia.\n"));

  rl.close();
}

start();
