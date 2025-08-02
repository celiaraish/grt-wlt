import fs from 'fs';
import readline from 'readline';
import chalk from 'chalk';
import { HDNodeWallet } from 'ethers';
import bip39 from 'bip39';
import { derivePath } from 'ed25519-hd-key';
import { Keypair as SolanaKeypair } from '@solana/web3.js';
import { AptosAccount } from 'aptos';
import { Ed25519Keypair as SuiKeypair } from '@mysten/sui.js/keypairs/ed25519';

function showBanner() {
  console.log(chalk.cyan.bold(`\n====================================`));
  console.log(chalk.cyan.bold(`   🚀 Multi-Chain Wallet Generator 🚀`));
  console.log(chalk.green.bold(`         Created by XBOOT`));
  console.log(chalk.cyan.bold(`====================================\n`));
}

function generateWallet(index, networks) {
  const mnemonic = bip39.generateMnemonic();
  const seed = bip39.mnemonicToSeedSync(mnemonic);
  const walletData = { no: index + 1, mnemonic };

  if (networks.includes('evm')) {
    const evmWallet = HDNodeWallet.fromPhrase(mnemonic);
    walletData.evm = { address: evmWallet.address, privateKey: evmWallet.privateKey };
  }

  if (networks.includes('solana')) {
    const solKey = derivePath(`m/44'/501'/0'/0'`, seed.toString('hex')).key;
    const solanaWallet = SolanaKeypair.fromSeed(solKey);
    walletData.solana = {
      address: solanaWallet.publicKey.toBase58(),
      privateKey: Buffer.from(solanaWallet.secretKey).toString('hex')
    };
  }

  if (networks.includes('sui')) {
    const suiKey = derivePath(`m/44'/784'/0'/0'/0'`, seed.toString('hex')).key;
    const suiWallet = SuiKeypair.fromSecretKey(suiKey);
    walletData.sui = { address: suiWallet.getPublicKey().toSuiAddress() };
  }

  if (networks.includes('aptos')) {
    const aptosKey = derivePath(`m/44'/637'/0'/0'/0'`, seed.toString('hex')).key;
    const aptosWallet = new AptosAccount(aptosKey);
    walletData.aptos = { address: aptosWallet.address().hex() };
  }

  return walletData;
}

function saveToFile(wallets, fileName, format, networks) {
  try {
    if (format === 'csv') {
      let headers = ['no', 'mnemonic'];
      if (networks.includes('evm')) headers.push('evm_address', 'evm_private');
      if (networks.includes('solana')) headers.push('solana_address', 'solana_private');
      if (networks.includes('sui')) headers.push('sui_address');
      if (networks.includes('aptos')) headers.push('aptos_address');

      const headerRow = headers.join(',') + '\n';
      const rows = wallets.map(w => {
        return headers.map(h => {
          if (h === 'no') return w.no;
          if (h === 'mnemonic') return w.mnemonic;
          if (h.startsWith('evm')) return h.endsWith('address') ? w.evm?.address || '' : w.evm?.privateKey || '';
          if (h.startsWith('solana')) return h.endsWith('address') ? w.solana?.address || '' : w.solana?.privateKey || '';
          if (h === 'sui_address') return w.sui?.address || '';
          if (h === 'aptos_address') return w.aptos?.address || '';
          return '';
        }).join(',');
      }).join('\n');

      fs.writeFileSync(`${fileName}.csv`, headerRow + rows);
      console.log(chalk.green(`✅ Data berhasil disimpan ke ${fileName}.csv`));
    } else {
      fs.writeFileSync(`${fileName}.json`, JSON.stringify(wallets, null, 2));
      console.log(chalk.green(`✅ Data berhasil disimpan ke ${fileName}.json`));
    }
    console.log(chalk.red.bold("⚠️ Jangan bagikan file ini! Private key & mnemonic bersifat rahasia."));
  } catch (err) {
    console.log(chalk.red(`❌ Gagal menyimpan file: ${err.message}`));
  }
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
showBanner();

console.log(chalk.yellow('👉 Pilih network:'));
console.log(chalk.yellow('   1. EVM'));
console.log(chalk.yellow('   2. Solana'));
console.log(chalk.yellow('   3. Sui'));
console.log(chalk.yellow('   4. Aptos'));
console.log(chalk.yellow('   5. Semua network'));

rl.question(chalk.yellow('Masukkan pilihan angka (pisahkan dengan koma jika lebih dari satu): '), (numInput) => {
  const choices = numInput.split(',').map(n => n.trim());
  const networks = [];
  if (choices.includes('1')) networks.push('evm');
  if (choices.includes('2')) networks.push('solana');
  if (choices.includes('3')) networks.push('sui');
  if (choices.includes('4')) networks.push('aptos');
  if (choices.includes('5')) networks.push('evm', 'solana', 'sui', 'aptos');

  if (networks.length === 0) {
    console.log(chalk.red('❌ Tidak ada network valid yang dipilih.'));
    rl.close();
    return;
  }

  rl.question(chalk.yellow('👉 Berapa wallet yang ingin dibuat? (max 100): '), (jumlah) => {
    const count = parseInt(jumlah);
    if (isNaN(count) || count <= 0 || count > 100) {
      console.log(chalk.red('❌ Input tidak valid! Masukkan angka 1 - 100.'));
      rl.close();
      return;
    }

    rl.question(chalk.yellow('👉 Pilih format output (csv/json): '), (format) => {
      format = format.toLowerCase();
      if (!['csv', 'json'].includes(format)) {
        console.log(chalk.red('❌ Format tidak valid! Gunakan csv atau json.'));
        rl.close();
        return;
      }

      rl.question(chalk.yellow('👉 Masukkan nama file output (tanpa ekstensi): '), (fileName) => {
        if (!fileName) fileName = 'wallets';

        const wallets = [];
        for (let i = 0; i < count; i++) {
          wallets.push(generateWallet(i, networks));
        }

        saveToFile(wallets, fileName, format, networks);
        rl.close();
      });
    });
  });
});
