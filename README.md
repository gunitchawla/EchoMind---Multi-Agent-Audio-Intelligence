<div align="center">
  
# 🎙️ EchoMind
**Multi-Agent Audio Intelligent System**

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](#)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](#)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](#)
[![Twilio](https://img.shields.io/badge/Twilio-F22F46?style=for-the-badge&logo=twilio&logoColor=white)](#)

*EchoMind is an AI-powered acoustic surveillance platform for smart cities. It analyzes ambient audio in real-time to detect hidden threats like gunshots, breaking glass, and human screams. With explainable AI and automated Twilio SMS alerts, it ensures rapid, transparent security responses.*

</div>

<br />

## 🌟 The Vision
Traditional security systems rely heavily on visual data (CCTV), leaving massive blind spots in areas without camera coverage, during the night, or when lines of sight are blocked. **EchoMind** introduces a critical secondary layer of defense: **Sound**. By continuously monitoring acoustic environments, EchoMind detects the signatures of danger instantly, dispatching automated alerts before authorities even receive a 911 call.

---

## 🔥 Key Features

- **🎯 Multi-Modal Threat Detection:** Instantly identifies specific acoustic signatures including **Gunshots**, **Human Screams**, **Glass Breakage**, and **Alarms**.
- **🧠 Explainable AI (XAI):** Security shouldn't be a black box. EchoMind features a dedicated Explainable AI panel that provides transparency through SHAP feature importance, LIME local explanations, and time-frequency spectrogram heatmaps.
- **📱 Automated SMS Dispatch:** When a critical threat (Risk Score > 65) is detected, the platform triggers an automated emergency SMS directly to security personnel via the **Twilio API**.
- **🎤 Live Voice Input:** Test the AI in real-time via your browser microphone or upload pre-recorded `.mp3`/`.wav` samples.
- **💾 JSON Incident Export:** Maintain strict security audit trails. One-click export for individual threat analysis reports or complete session histories.
- **🚨 Interactive Simulation Sandbox:** Built-in testing environment featuring high-fidelity threat sounds and visual lockdown overlays to demonstrate the automated response pipeline.

---

## 🛠️ Technical Stack

- **Frontend:** React, TypeScript, Vite, TailwindCSS, Shadcn/UI
- **Backend:** Node.js, Express, tRPC
- **Database:** SQLite with Drizzle ORM
- **Visualizations:** Recharts (for AI feature importance graphs)
- **Integrations:** Twilio REST API

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Local Installation
1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/echomind.git
   cd echomind
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory and add your Twilio credentials:
   ```env
   TWILIO_ACCOUNT_SID=your_account_sid
   TWILIO_AUTH_TOKEN=your_auth_token
   TWILIO_PHONE_NUMBER=your_twilio_number
   ```

4. **Start the Development Server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5000`.

---

## 🌍 Deployment

EchoMind can be easily deployed as a full-stack Web Service on platforms like **Render** or **Railway**. 

**Render Build Configuration:**
- **Environment:** `Node`
- **Build Command:** `NODE_ENV=development npm install --legacy-peer-deps && npm run build`
- **Start Command:** `npm run start`

*(Make sure to add your Twilio Environment Variables in the platform's dashboard!)*

---

## 🌐 Sustainable Development Goals (SDGs)
EchoMind proudly aligns with the United Nations SDGs:
- 🏙️ **SDG 11 (Sustainable Cities):** Improving urban safety and resilience through smart surveillance.
- 🕊️ **SDG 16 (Peace & Justice):** Automating violence detection to significantly reduce crime response times.

---

<div align="center">
  <p>Built for the future of smart city security.</p>
</div>
