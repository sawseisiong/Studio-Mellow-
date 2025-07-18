<!-- Banner -->

<h1 align="center">Studio Mellow 🖼️</h1>
<p align="center">
  <strong>插畫電商前後台 • React + Vite + Bootstrap 5</strong><br>
</p>

---

## 🚀 線上體驗

| 前台 | 後台 (Dashboard) |
|------|-----------------|
| **https://sawseisiong.github.io/Studio-Mellow-/** | **https://sawseisiong.github.io/Studio-Mellow-/login**<br>測試帳號：`testtest@gmail.com`<br>密碼：`testtest123` |

<details>
<!-- <summary>點我看 Demo GIF / 截圖</summary> -->

![產品瀏覽](docs/demo-browse.gif)
![後台訂單](docs/demo-admin.gif)

</details>

---

## ✨ 特色亮點
- ⚡ **極速前端**：採用 Vite 6 與 React 19，HMR 秒級更新。
- 🛒 **完整購物流程**：商品清單 → 加入購物車 → 付款成功。
- 🎞️ **LottieFiles 載入畫面**：使用 `<dotlottie-player>` 為頁面切換增添流暢 Loading 動畫。
- 📦 **後台一條龍**：登入後可管理商品、優惠券、訂單。
- 📱 **RWD＋動效**：Bootstrap 5 + GSAP + AOS，行動裝置同樣流暢。
- 🔗 **GitHub Pages 零伺服器部署**：一行 `npm run deploy` 即發佈。
- 🧩 **模組化元件**：React Hooks + Router。

---

## 📂 專案結構（精簡）
```text
Studio-Mellow-
├── public/           # 靜態資產 & OG 圖
├── src/
│   ├── api/          # axios 呼叫封裝
│   ├── components/   # 共用 React 元件
│   ├── pages/        # 前後台頁面
│   ├── hooks/        # 自訂 hooks（如 useAuth）
│   └── styles/       # SCSS 與 Bootstrap override
├── .env.example      # API_ENDPOINT 等環境變數範例
└── vite.config.js    # Path alias、Gh-pages base
