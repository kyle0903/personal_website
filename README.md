# Kyle 的個人網站

一個使用 React + FastAPI 技術棧開發的現代化個人作品集網站。

## 🎯 功能特色

- **響應式設計**: 完美適配桌面、平板和手機設備
- **現代化 UI**: 使用 Material-UI 設計系統，提供流暢的用戶體驗
- **作品集展示**: 完整展示個人專案和技術技能
- **動態數據**: 後端 API 提供動態內容管理
- **SEO 優化**: 優化搜尋引擎可見度
- **可達性支援**: 支援鍵盤導航和螢幕閱讀器

## 🛠️ 技術棧

### 前端

- **React 18**: 現代化 JavaScript 框架
- **Material-UI**: Google Material Design 設計系統
- **React Router**: 客戶端路由管理
- **Axios**: HTTP 請求庫

### 後端

- **FastAPI**: 高性能 Python Web 框架
- **Pydantic**: 數據驗證和序列化
- **uvicorn**: ASGI 服務器

## 📁 專案結構

```
personal_website/
├── backend/                 # FastAPI 後端
│   ├── main.py             # 主應用程式和 API 路由
│   ├── requirements.txt    # Python 依賴
│   ├── Dockerfile         # Docker 配置
│   └── static/            # 靜態資源
│       └── images/        # 專案圖片
├── web/                   # React 前端
│   ├── public/           # 公共資源
│   ├── src/              # 源代碼
│   │   ├── components/   # 可重用組件
│   │   ├── pages/        # 頁面組件
│   │   └── services/     # API 服務
│   ├── package.json      # Node.js 依賴
│   └── package-lock.json
└── README.md            # 專案說明
```

## 🚀 快速開始

### 環境要求

- Node.js 16+
- Python 3.8+
- npm 或 yarn

### 1. 克隆專案

```bash
git clone <your-repo-url>
cd personal_website
```

### 2. 啟動後端服務

```bash
# 進入後端目錄
cd backend

# 安裝 Python 依賴
pip install -r requirements.txt

# 啟動 FastAPI 服務器
python main.py
```

後端服務將在 `http://localhost:8000` 啟動

### 3. 啟動前端服務

```bash
# 進入前端目錄
cd web

# 安裝 Node.js 依賴
npm install

# 啟動開發服務器
npm start
```

前端應用將在 `http://localhost:3000` 啟動

## 📱 頁面功能

### 🏠 首頁 (Home)

- 個人介紹和技能展示
- 精選專案預覽
- 響應式英雄區塊

### 👤 關於我 (About)

- 詳細個人資訊
- 技術技能分類展示
- 工作經歷時間軸
- 興趣和專長介紹

### 💼 作品集 (Projects)

- 專案網格視圖
- 類別篩選功能
- 專案搜尋和排序
- 懸停效果和互動

### 📄 專案詳情 (Project Detail)

- 完整專案描述
- 技術棧展示
- 功能特色列表
- 外部連結 (GitHub, 展示)

### 📞 聯絡我 (Contact)

- 多種聯絡方式
- 社群媒體連結
- 聯絡表單 (可擴展)

## 🎨 設計特色

- **Material Design**: 遵循 Google 設計準則
- **響應式佈局**: 支援所有設備尺寸
- **流暢動畫**: CSS 和 React 動畫效果
- **現代化配色**: 藍紫色漸變主題
- **可達性**: 鍵盤導航和螢幕閱讀器支援

## 🔧 API 端點

### 專案相關

- `GET /api/projects` - 獲取所有專案
- `GET /api/projects/{id}` - 獲取特定專案
- `GET /api/projects/category/{category}` - 按類別獲取專案

### 個人資訊

- `GET /api/about` - 獲取個人資訊
- `GET /api/health` - 健康檢查

## 🔄 部署

### Docker 部署

```bash
# 構建後端鏡像
cd backend
docker build -t personal-website-backend .

# 運行後端容器
docker run -p 8000:8000 personal-website-backend
```

### 前端構建

```bash
cd web
npm run build
```

## 🛠️ 自定義配置

### 修改個人資訊

編輯 `backend/main.py` 中的 `ABOUT_DATA` 和 `PROJECTS_DATA`

### 主題配置

修改 `web/src/App.js` 中的 `theme` 配置

### 新增專案

在 `backend/main.py` 的 `PROJECTS_DATA` 中添加新專案數據

## 📈 效能優化

- 圖片懶加載
- 代碼分割
- 靜態資源緩存
- 響應式圖片
- 最小化 bundle 大小

## 🤝 貢獻指南

1. Fork 專案
2. 創建功能分支
3. 提交更改
4. 推送到分支
5. 創建 Pull Request

## 📄 授權

此專案使用 MIT 授權 - 查看 [LICENSE](LICENSE) 文件了解詳情

## 📧 聯絡

Kyle - nswer_kyle@portonmail.com

專案連結: [https://github.com/kyle0903/personal-website](https://github.com/kyle0903/personal-website)

---

_使用 ❤️ 和 React + FastAPI 製作_
