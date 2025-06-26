# 📨 WhatsApp File Automation via n8n + CloudConvert + Vercel

This project lets users upload either a **PDF** or a **Google Sheet (XLSX/CSV)** via a modern web UI. It automates the process of:

* Converting non-PDFs to PDF (using CloudConvert)
* Extracting phone numbers
* Sending the PDF to the correct WhatsApp number using the WhatsApp Business Cloud API

Fully powered by:

* **Frontend**: Next.js 14 with ShadCN UI (hosted on Vercel)
* **Backend**: n8n on Oracle Cloud (via Cloudflare Tunnel)

---

## 📁 Project Structure

```
project-root
├── frontend (Next.js on Vercel)
│   ├── pages/index.tsx → Upload UI
│   └── components/ui → ShadCN UI components
└── backend (n8n Workflow hosted on Oracle VM)
```

---

## 🚀 Features

* Uploads PDF or Google Sheets
* If it's a Sheet, converts it to PDF using **CloudConvert API**
* Extracts phone number (from filename or content)
* Sends file to WhatsApp via **WhatsApp Cloud API**
* Free & scalable: no 3rd-party servers needed beyond Vercel & Oracle

---

## 🛠️ Setup Instructions

### 1. 🔧 Backend (Oracle VM + n8n)

#### Step 1: Install n8n

```bash
sudo npm install -g n8n
```

#### Step 2: Install Cloudflare Tunnel

```bash
curl -fsSL https://developers.cloudflare.com/cloudflare-one/static/downloads/cloudflared-install.sh | sh
cloudflared tunnel --url http://localhost:5678
```

#### Step 3: Start n8n

```bash
n8n
```

> Note: You should see a public URL like `https://barbara-briefs-volt.trycloudflare.com`

#### Step 4: Import Workflow

* Import the provided `workflow.json` file (you can request it from ChatGPT)
* Activate the workflow

---

### 2. 🌐 Frontend (Next.js + Vercel)

#### Step 1: Clone and setup

```bash
git clone https://github.com/your-username/sheets-to-whatsapp.git
cd sheets-to-whatsapp
npm install
```

#### Step 2: Update endpoint

In `index.tsx`, set:

```ts
const res = await fetch("https://<your-cloudflare-url>/webhook/pdf-bot", ...);
```

#### Step 3: Deploy to Vercel

```bash
git init
git remote add origin https://github.com/your-username/sheets-to-whatsapp.git
git add .
git commit -m "initial"
git push -u origin main
```

Go to [https://vercel.com](https://vercel.com), import project → Deploy

---

### 3. 🧠 CloudConvert Setup

* Go to [https://cloudconvert.com/dashboard/api/v2/keys](https://cloudconvert.com/dashboard/api/v2/keys)
* Create an API Key
* Use it in your n8n `HTTP Request` node when creating the job

**CloudConvert Steps in n8n:**

1. Create job
2. Upload file
3. Wait 10 seconds
4. Poll job ID
5. Extract final PDF URL

---

### 4. 💬 WhatsApp Business Cloud API Setup

1. Go to [https://developers.facebook.com/apps](https://developers.facebook.com/apps)
2. Create App → WhatsApp
3. Get:

   * `WABA_ACCESS_TOKEN`
   * `PHONE_NUMBER_ID`
4. Use `HTTP Request` node to send:

```json
{
  "messaging_product": "whatsapp",
  "to": "91xxxxxxxxxx",
  "type": "document",
  "document": {
    "link": "https://pdf-host.com/my.pdf",
    "filename": "invoice.pdf"
  }
}
```

---

## 🧪 Testing

1. Upload a `.xlsx`, `.csv`, or `.pdf`
2. If `.xlsx` or `.csv`, CloudConvert will convert it to PDF
3. n8n will extract the number and send the file via WhatsApp
4. Success message appears on frontend

---

## 🧯 Error Handling

* 404 on webhook? → Make sure it's **active** in n8n
* 500 error? → Check the `Execute Workflow` log
* File not converting? → Make sure CloudConvert task name matches

---

## 📦 Optional Improvements

* Extract phone number from Google Sheet cell
* OCR support for scanned PDFs
* Database to store uploads + statuses
* User-auth to restrict who can use the bot

---

## ✅ Credits

* Frontend: [Next.js](https://nextjs.org/) + [ShadCN UI](https://ui.shadcn.dev/)
* Automation: [n8n.io](https://n8n.io/)
* Conversion: [CloudConvert](https://cloudconvert.com/)
* Messaging: [WhatsApp Cloud API](https://developers.facebook.com/docs/whatsapp/overview/)
* Hosting: [Vercel](https://vercel.com/) + [Oracle Cloud](https://cloud.oracle.com/)

---

## 🧠 Questions?

Ask ChatGPT or file an issue in your repo.

Now go build the future 🚀
