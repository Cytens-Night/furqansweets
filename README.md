# 🍯 Furqan Sweets — Authentic Somali Sweets E-Commerce Store & CRM

A premium, state-of-the-art web storefront and full CRM Admin Dashboard built for **Furqan Sweets**. Customers can explore authentic Somali Halwa sweets, biscuits, and bakery snacks, while the store owner can manage products, prices, images, opening hours, and site texts in real-time through an enterprise-secure CRM dashboard.

---

## 🌟 Key Features

### 1. 🛍️ Dynamic Storefront (`index.html` & `shop.html`)
- **Dual Language Presentation**: Displays English titles alongside authentic Somali translations (`Ma u xiistay Macmacaan Soomaaliyeed?`).
- **Live Catalog & Prices**: Fetches product listings, opening hours, and store contact numbers dynamically from the backend data store.
- **Responsive Premium UI**: Glassmorphism hero banners, interactive Halwa variant selector cards, and smooth micro-animations.

### 2. 🛡️ State-of-the-Art CRM Admin Dashboard (`admin.html`)
- **Security PIN Authentication**: Protects store management behind a 4-10 digit security PIN (Default: `2026`).
- **3-Attempt Security Lockout Protection**:
  - Entering the wrong PIN **3 times consecutively** triggers an automatic **1-hour (3600 second) account lockout**.
  - Displays a live countdown banner that persists across page refreshes.
- **2-Step Email & Master Key Fallback Verification System**:
  - Owners who forget their PIN or get locked out can click **"Forgot PIN / Password? Reset via Email"**.
  - Requires verifying their registered owner email (`owner@furqansweets.co.uk`) and either their **Master Security Recovery Key** (`FURQAN-2026-RECOVERY`) or an email recovery OTP token.
  - Instantly unlocks the account, resets the lockout timer, and updates the PIN.
- **Tabbed Real-Time CMS**:
  - ⚙️ **Store & Site Texts**: Edit store name, logo image, opening hours, phone numbers (general & bulk wholesale), and hero headings.
  - 🍯 **Halwa Products**: Edit Halwa variant names, Somali translations, £/kg prices, and images.
  - 🍪 **Snacks & Biscuits**: Categorize items (`Extra Snacks` vs `Biscuits Bags`), update prices, and upload photos.
  - ☁️ **Supabase Cloud Sync**: Connect to Supabase for live cloud database synchronization.
- **Live Image Uploader**: Direct image upload interface that saves base64 image data to the local `assets/` directory.

### 3. ⚡ Zero-Dependency Local Web & REST API Server (`server.ps1`)
- Built using native Windows PowerShell `System.Net.HttpListener` — no Node.js, Python, or external software required.
- Provides REST API endpoints:
  - `GET /api/data`: Returns the live contents of `data.json`.
  - `POST /api/data`: Updates `data.json` atomically with CRM changes.
  - `POST /api/upload`: Saves uploaded product and logo images into `assets/`.

---

## 🚀 How to Run Locally

1. Open a PowerShell terminal inside the project directory.
2. Run the local web server:
   ```powershell
   powershell -ExecutionPolicy Bypass -File .\server.ps1 -Port 8000
   ```
3. Open your browser and visit:
   - 🏠 **Main Storefront Homepage**: [http://localhost:8000/](http://localhost:8000/)
   - 🍪 **Bakery & Snacks Shop**: [http://localhost:8000/shop.html](http://localhost:8000/shop.html)
   - ⚙️ **CRM Admin Dashboard**: [http://localhost:8000/admin.html](http://localhost:8000/admin.html)

---

## 🔐 Security & Recovery Reference

| Setting | Default Value | Where to Configure |
| :--- | :--- | :--- |
| **Admin Security PIN** | `2026` | CRM -> Security & Recovery Tab |
| **Registered Owner Email** | `owner@furqansweets.co.uk` | CRM -> Security & Recovery Tab |
| **Master Recovery Key** | `FURQAN-2026-RECOVERY` | CRM -> Security & Recovery Tab |

> [!IMPORTANT]
> **Lockout Recovery**: If your account is locked out after 3 incorrect attempts, click **"Forgot PIN / Password?"** on the login modal, enter your Owner Email and Master Recovery Key, and set a new PIN to unlock immediately.

---

## ☁️ Supabase Online Cloud Setup

To sync your store data with a Supabase PostgreSQL cloud database:
1. In the CRM Dashboard, open the **☁️ Supabase Cloud Sync** tab and click **📋 Copy Supabase SQL Schema** (or copy from [`supabase_schema.sql`](file:///c:/Users/busin/Desktop/Furqansweets%20%20website/supabase_schema.sql)).
2. In your Supabase Dashboard, go to **SQL Editor**, paste the schema, and click **Run**. This creates the `store_config` table with Row Level Security enabled.
3. Enter your **Supabase Project URL** (`https://xxx.supabase.co`) and **Supabase API Key** in the CRM dashboard.
4. Click **🚀 Push Store Data to Supabase** to backup your live products and store configuration to the cloud!
