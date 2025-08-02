# 🌟 GRT-WLT: Multi-Chain Wallet Generator

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

---

## 📦 Instalasi

1️⃣ **Clone repo**
```bash
git clone https://github.com/celiaraish/grt-wlt.git
cd grt-wlt
```

2️⃣ **Install dependencies**
```bash
npm install
```

---

## ▶️ Cara Menjalankan

```bash
node main.js
```

Lalu ikuti instruksi di CLI:

1. Pilih **chain**:
   - 1 = EVM
   - 2 = Solana
   - 3 = Sui
   - 4 = Aptos

2. Masukkan **jumlah wallet** (maks 1000)  
3. Tentukan **nama file output** (tanpa ekstensi)  
4. Pilih format output **CSV** atau **JSON**

---

## 📂 Contoh Output

### 📄 **CSV**
```
index,address,privateKey
1,0x1234abcd...,0xabcd1234...
2,0x5678efgh...,0xefgh5678...
```

### 🗂 **JSON**
```json
[
  {
    "index": 1,
    "address": "0x1234abcd...",
    "privateKey": "0xabcd1234..."
  }
]
```

---

## ⚠️ Keamanan
- 🚨 **JANGAN BAGIKAN PRIVATE KEY atau MNEMONIC Anda!**
- File CSV/JSON hanya untuk keperluan **development** & **testing**
- Jangan upload file hasil ke publik atau GitHub

---

## 📜 Script Utama
📄 **main.js** – berisi semua logika CLI, generate wallet, dan simpan file.  

👉 Jalankan dengan:
```bash
npm start
```

Atau langsung:
```bash
node main.js
```

---

✨ Dibuat dengan ❤️ oleh **XBOOT**
