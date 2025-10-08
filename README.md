# 🌟 GRT-WLT: Multi-Chain Wallet Generator adalah script Node.js untuk membuat wallet di berbagai jaringan blockchain hanya dengan sekali jalan. Mendukung **EVM (Ethereum, BSC, Arbitrum, dll)**, **Solana**, **Sui**, dan **Aptos**. ✅

**By XBOOT**

`GRT-WLT` adalah **script Node.js interaktif** yang memudahkan Anda membuat **banyak wallet** dari berbagai blockchain hanya dengan sekali jalan.  
Mendukung 4 chain populer:
- 🌐 **EVM** (Ethereum, BNB, Polygon, Arbitrum)
- ⚡ **Solana**
- 🔷 **Sui**
- 🟣 **Aptos**

Output bisa berupa **CSV** atau **JSON** sesuai kebutuhan Anda.

---

## ✨ Fitur Utama
✅ **Multi-chain**: Satu script untuk 4 chain  
✅ **CLI interaktif**: Tidak perlu mengedit kode  
✅ **Validasi input**: Mencegah pembuatan wallet berlebihan (>1000)  
✅ **Pilihan format output**: CSV / JSON  
✅ **Pesan keamanan**: Peringatan agar private key tidak tersebar
# 🚀 Multi-Chain Wallet Generator

---

## 📦 Instalasi

1️⃣ **Clone repositori**
```bash
git clone https://github.com/celiaraish/grt-wlt.git
cd grt-wlt
```

2️⃣ **Install dependency**
```bash
npm install
```

3️⃣ **Jalankan script**
```bash
npm start
```

---


NOTE:
USE NODE VERSION UNDER 20
IF ERROR ON APTOS USE APTOS VERSION aptos@1.14.0




## ⚙️ Cara Menggunakan

Setelah menjalankan `npm start`, kamu akan diminta:

1️⃣ **Pilih jaringan**  
   ➡️ Pilihan angka (1: EVM, 2: Solana, 3: Sui, 4: Aptos)

2️⃣ **Masukkan jumlah wallet yang ingin dibuat** (max 100)

3️⃣ **Pilih format output** (CSV/JSON)

4️⃣ **Masukkan nama file output**  
   ➡️ Contoh: `walletku` akan menghasilkan `walletku.csv` atau `walletku.json`

---

## 📄 Output

File hasil akan berisi data seperti:

- **Nomor urut**
- **Address**
- **Private Key** *(hanya untuk EVM & Solana)*
- **Mnemonic Phrase** *(semua chain)*

⚠️ **PERINGATAN:** Private key dan mnemonic phrase sangat sensitif. Jangan pernah membagikan file hasil ke orang lain!

---

## 🛠️ Dependency Utama

- **ethers** → Generate wallet EVM
- **@solana/web3.js** → Generate wallet Solana
- **@mysten/sui.js** → Generate wallet Sui
- **aptos** → Generate wallet Aptos
- **bip39** → Generate mnemonic phrase
- **chalk** → Tampilan CLI lebih menarik

---

## 👨‍💻 Creator

Script ini dibuat oleh **XBOOT** ⚡ untuk memudahkan pembuatan wallet multi-chain.

---

## 📜 Lisensi

MIT License.
