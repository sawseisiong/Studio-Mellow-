# Studio Mellow

Studio Mellow 是一個以插畫為主題的電商網站，提供前台購物體驗與後台管理功能。專案以 React 19 與 Vite 6 打造。


## 線上預覽

- 前台：<https://sawseisiong.github.io/Studio-Mellow-/>

## 專案特色

- 使用 Vite 開發，提供快速的熱更新體驗
- 支援商品瀏覽、加入購物車與結帳流程
- 後台可管理商品、優惠券與訂單
- 自訂 Hook 與元件，程式碼維護容易
- 透過 GitHub Pages 部署，無需額外伺服器

## 開發環境建置

1. 安裝 Node.js (建議 18 以上)
2. 下載專案並執行：

   ```bash
   npm install
   npm run dev
   ```

3. 依照 `.env.example` 建立 `.env` 檔，填入 API_URL 與 API_PATH

## 打包與部署

- 開發完成後可執行 `npm run build` 打包專案
- 如需發佈到 GitHub Pages，先確認 `vite.config.js` 中 base 設定，再執行 `npm run deploy`

## 目錄結構 (節錄)

```text
Studio-Mellow-
├── public/           靜態資源
├── src/
│   ├── components/   共享 React 元件
│   ├── pages/        前台與後台頁面
│   └── stylesheets/  SCSS 與樣式覆寫
├── .env.example      環境變數範例
└── vite.config.js    Vite 設定
```

