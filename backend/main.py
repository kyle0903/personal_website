from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import List, Optional
import os

app = FastAPI(title="Kyle's Personal Website API", version="1.0.0")

# CORS 設定
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 靜態檔案服務
app.mount("/api/static", StaticFiles(directory="static"), name="static")

# React build 檔案服務
# 嘗試不同的路徑來找到 build 資料夾
BUILD_PATHS = [
    "web/build",           # 從專案根目錄運行
    "../web/build",        # 從 backend 資料夾運行
    "./build",             # 如果 build 在當前目錄
]

BUILD_DIR = None
for path in BUILD_PATHS:
    if os.path.exists(path):
        BUILD_DIR = path
        break

if BUILD_DIR:
    app.mount("/static", StaticFiles(directory=os.path.join(BUILD_DIR, "static")), name="react_static")

# 資料模型
class Project(BaseModel):
    id: str
    name: str
    description: str
    tech_stack: List[str]
    features: List[str]
    github_url: Optional[str] = None
    demo_url: Optional[str] = None
    image_url: Optional[str] = None
    category: str
    status: str = "completed"

class Experience(BaseModel):
    title: str
    company: str
    period: str
    description: str

class AboutInfo(BaseModel):
    name: str
    title: str
    description: str
    skills: List[str]
    skill_categories: dict
    experiences: List[Experience]
    contact: dict

# 專案資料
PROJECTS_DATA = [
    {
        "id": "app-order-receiving",
        "name": "收單條碼驗證系統",
        "description": "專為倉儲管理、庫存盤點和訂單處理而設計的現代化條碼掃描系統。提供完整的條碼生命週期管理，從批次上傳、即時掃描到資料分析，支援離線作業模式，確保在網路不穩定的環境下仍能正常運作。",
        "tech_stack": ["Python", "FastAPI", "React.js", "PostgreSQL", "Docker", "PWA"],
        "features": [
            "即時條碼掃描與驗證",
            "離線模式支援",
            "批次上傳與資料管理",
            "音效回饋與螢幕保持",
            "響應式設計與 PWA 支援",
            "完整的資料分析與匯出"
        ],
        "github_url": "https://github.com/kyle0903/app-order-receiving",
        "demo_url": None,
        "image_url": "/api/static/images/app-order-receiving.png",
        "category": "企業級系統",
        "status": "completed"
    },
    {
        "id": "tixcraft-extension",
        "name": "拓元搶票助手",
        "description": "Chrome 瀏覽器擴充功能，整合完整自動搶票流程，包含 AI 驗證碼識別、智慧票種選擇與自動提交訂單功能，統計正確率達 90%，大幅提升搶票成功率。",
        "tech_stack": ["JavaScript", "HTML", "CSS", "OpenAI API", "Python", "Flask"],
        "features": [
            "自動進入購票流程",
            "AI 驗證碼識別 (90% 正確率)",
            "智慧票種關鍵字篩選",
            "自動提交訂單",
            "多頁面流程整合",
            "API 連線測試機制"
        ],
        "github_url": "https://github.com/kyle0903/tixcraft_assistant",
        "demo_url": None,
        "image_url": "/api/static/images/tixcraft_extension.png",
        "category": "工具與擴充功能",
        "status": "completed"
    },
    {
        "id": "sport-reserve",
        "name": "新北市羽球場地預約系統",
        "description": "專為新北市政府地區運動中心設計的羽球場地快速預約系統，支援三重與板橋場館的七天內場地預訂，透過 Docker 容器化部署，提供穩定可靠的預約服務。",
        "tech_stack": ["Python", "Flask", "JavaScript", "HTML", "CSS", "Docker"],
        "features": [
            "新北市政府羽球場地預約",
            "支援三重與板橋場館",
            "七天內場地查詢與預訂",
            "場館、日期、時間選擇"
        ],
        "github_url": "https://github.com/kyle0903/sport_reserve",
        "demo_url": None,
        "image_url": "/api/static/images/sport-reserves.png",
        "category": "工具與擴充功能",
        "status": "completed"
    },
    {
        "id": "crypto-trading",
        "name": "加密貨幣交易平台",
        "description": "使用 React 和 Semantic UI 建立的加密貨幣交易平台前端介面，支援多種主流加密貨幣交易。",
        "tech_stack": ["React", "Semantic UI", "JavaScript", "CSS", "HTML"],
        "features": [
            "支援 8 種主流加密貨幣",
            "即時價格顯示",
            "市價/限價交易",
            "餘額管理",
            "響應式設計"
        ],
        "github_url": "https://github.com/kyle0903/bito_order",
        "demo_url": None,
        "image_url": "/api/static/images/crypto-trading.png",
        "category": "網頁應用",
        "status": "planned"
    }
]

ABOUT_DATA = {
    "name": "Kyle",
    "title": "富萊特國際股份有限公司 - 後端工程師",
    "description": "我是目前已在海空運承攬公司擔任兩年的後端工程師，主要是以Python (Flask / FastAPI) 作為開發，擅長 RESTful API 設計、資料處理與系統整合，熟悉 PostgreSQL、MongoDB 的資料庫查詢與建立，並具備 Docker 環境建置。在國際物流與報關系統專案中，累積了許多建置多項 API 串接，與協助內外部系統的資料整合的實務經驗。\n\n此外，我曾在碩士階段專注於研究演算法穩定幣與 DeFi 機制，並在以太坊虛擬網路上以 Node.js 與 Solidity 實作發幣與兌換功能。這些經驗讓我能將後端開發專業與不同領域的應用結合，並快速投入相關專案開發。",
    "skills": [
        "Python", "Flask", "FastAPI", "RESTful API", "PostgreSQL", "MongoDB",
        "Node.js", "Express.js", "Pytest", "MySQL", "JavaScript", "HTML", "CSS",
        "React.js", "Vue.js", "Vite", "Webpack", "Docker", "GCP", "RabbitMQ",
        "Git", "OpenAI API", "Azure AI"
    ],
    "skill_categories": {
        "後端開發": ["Python", "Flask", "FastAPI", "RESTful API", "MySQL", "MongoDB", "PostgreSQL", "Node.js", "Express.js", "Pytest"],
        "前端開發": ["JavaScript", "HTML", "CSS", "React.js", "Vue.js", "Vite", "Webpack"],
        "系統部署與管理": ["Docker", "GCP", "RabbitMQ", "Git", "OpenAI API", "Azure AI"]
    },
    "experiences": [
        {
            "title": "後端工程師",
            "company": "富萊特國際股份有限公司",
            "period": "2022 - 現在",
            "description": "<i style=\"color: #666; font-style: italic;\">富萊特為海空運承攬業者，專營跨國報關與物流服務，年處理數百萬筆進出口報關與發票資料。</i>\n\n在國際物流與報關系統專案中，我的主要貢獻包括：\n• 主導開發倉庫收單匹配系統\n• 參與開發企業級報關與財務整合平台\n• 開發發票 OCR 自動辨識與轉檔系統\n• 設計多項 API 串接介面與後端邏輯"
        },
        {
            "title": "資訊與決策科學研究所 碩士",
            "company": "國立台北商業大學",
            "period": "2020 - 2022",
            "description": "專注於研究演算法穩定幣與 DeFi 機制，並在以太坊虛擬網路上以 Node.js 與 Solidity 實作發幣與兌換功能。"
        },
        {
            "title": "資訊管理系 專科",
            "company": "國立台北護理健康大學",
            "period": "2018 - 2020",
            "description": "學習資訊管理基礎知識與系統開發技能。"
        }
    ],
    "contact": {
        "email": "nswer_kyle@portonmail.com",
        "github": "https://github.com/kyle0903",
        "linkedin": None
    }
}

@app.get("/")
async def serve_react_app():
    """提供 React 應用程式"""
    if BUILD_DIR:
        return FileResponse(os.path.join(BUILD_DIR, "index.html"))
    return {"message": "歡迎來到 Kyle 的個人網站 API"}

@app.get("/api/projects", response_model=List[Project])
async def get_projects():
    """取得所有專案列表"""
    return PROJECTS_DATA

@app.get("/api/projects/{project_id}", response_model=Project)
async def get_project(project_id: str):
    """取得特定專案詳情"""
    project = next((p for p in PROJECTS_DATA if p["id"] == project_id), None)
    if not project:
        raise HTTPException(status_code=404, detail="專案不存在")
    return project

@app.get("/api/projects/category/{category}", response_model=List[Project])
async def get_projects_by_category(category: str):
    """根據類別取得專案列表"""
    projects = [p for p in PROJECTS_DATA if p["category"] == category]
    return projects

@app.get("/api/about", response_model=AboutInfo)
async def get_about():
    """取得個人資訊"""
    return ABOUT_DATA

@app.get("/api/health")
async def health_check():
    """健康檢查端點"""
    return {"status": "healthy", "message": "API 運行正常"}

# 處理 build 根目錄的檔案（如 logo192.png, favicon.ico 等）
@app.get("/{filename}")
async def serve_build_files(filename: str):
    """處理 build 根目錄的檔案"""
    if BUILD_DIR:
        file_path = os.path.join(BUILD_DIR, filename)
        if os.path.exists(file_path) and os.path.isfile(file_path):
            return FileResponse(file_path)
    
    # 如果檔案不存在，回傳 React 應用程式
    if BUILD_DIR:
        return FileResponse(os.path.join(BUILD_DIR, "index.html"))
    
    return {"message": "React 應用程式尚未建置，請先執行 npm run build"}

# SPA 路由處理 - 處理所有非 API 路由
@app.get("/{full_path:path}")
async def serve_react_app_catch_all(full_path: str):
    """處理所有非 API 路由，回傳 React 應用程式"""
    # 如果是 API 路由，回傳 404
    if full_path.startswith("api/"):
        raise HTTPException(status_code=404, detail="API 端點不存在")
    
    # 檢查是否為靜態檔案
    if full_path.startswith("static/") and BUILD_DIR:
        static_file_path = os.path.join(BUILD_DIR, full_path)
        if os.path.exists(static_file_path):
            return FileResponse(static_file_path)
    
    # 其他所有路由都回傳 index.html
    if BUILD_DIR:
        return FileResponse(os.path.join(BUILD_DIR, "index.html"))
    
    return {"message": "React 應用程式尚未建置，請先執行 npm run build"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
