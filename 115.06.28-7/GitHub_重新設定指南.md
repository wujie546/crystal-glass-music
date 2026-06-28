# 🛠️ GitHub 重新設定 — 超簡單圖文步驟指南

> 📌 **什麼時候需要這份指南？**
> 當您的電腦**重新安裝 Windows** 或**送修回來**後，需要重新設定 GitHub 連線時，按照以下步驟操作即可。

---

## 📋 總覽（共 4 大步驟）

| 步驟 | 內容 | 大約時間 |
|---|---|---|
| 步驟 1 | 安裝 Git（程式碼管理工具） | 3 分鐘 |
| 步驟 2 | 安裝 gh CLI（GitHub 遙控器） | 2 分鐘 |
| 步驟 3 | 登入 GitHub 帳號 | 2 分鐘 |
| 步驟 4 | 測試是否成功 | 1 分鐘 |

---

## 步驟 1️⃣：安裝 Git

### 1-1. 開啟 PowerShell
- 在鍵盤上按 **Windows 鍵**（左下角有 Windows 圖案的按鍵）
- 輸入 **`powershell`**
- 點擊出現的 **「Windows PowerShell」**（藍色圖示）

### 1-2. 複製貼上以下指令
在 PowerShell 黑色視窗中，**點右鍵貼上**以下指令，然後按 **Enter**：

```
winget install --id Git.Git --accept-source-agreements --accept-package-agreements
```

### 1-3. 等待安裝完成
- 看到 **「Successfully installed」** 就表示成功了 ✅
- 如果顯示 **「already installed」** 表示已經裝過了，也是成功 ✅

### 1-4. 設定 Git 使用者名稱
**關閉 PowerShell，重新開啟一個新的 PowerShell**（這樣才能找到剛裝好的 Git），然後貼上：

```
git config --global user.name "wujie546"
```

按 Enter，再貼上：

```
git config --global user.email "您的Email@example.com"
```

按 Enter。

> 💡 把 `您的Email@example.com` 換成您註冊 GitHub 時用的 Email

---

## 步驟 2️⃣：安裝 gh CLI（GitHub 遙控器）

### 2-1. 在同一個 PowerShell 視窗中，貼上以下指令，按 Enter：

```
winget install --id GitHub.cli --accept-source-agreements --accept-package-agreements
```

### 2-2. 等待安裝完成
- 看到 **「Successfully installed」** 就表示成功了 ✅

### 2-3. 關閉 PowerShell，重新開啟一個新的 PowerShell
（這樣電腦才能找到剛安裝好的 gh CLI）

---

## 步驟 3️⃣：登入 GitHub 帳號（一次性驗證）

### 3-1. 在新的 PowerShell 中，貼上以下指令，按 Enter：

```
gh auth login --web -h github.com -p https
```

### 3-2. 畫面會顯示一組 8 位數驗證碼
例如：
```
! First copy your one-time code: C172-6579
Open this URL to continue in your web browser: https://github.com/login/device
```

### 3-3. 請記住那組驗證碼（例如 C172-6579）

### 3-4. 開啟瀏覽器，前往以下網址：
👉 **https://github.com/login/device**

### 3-5. 在網頁的輸入框中，填入剛才的驗證碼
- 輸入完畢後，點擊 **「Continue」** 按鈕

### 3-6. 點擊綠色的 「Authorize GitHub CLI」 按鈕

### 3-7. 回到 PowerShell，看到以下訊息就表示登入成功 🎉
```
✓ Authentication complete.
✓ Logged in as wujie546
```

---

## 步驟 4️⃣：測試是否全部設定成功

### 4-1. 在 PowerShell 中，貼上以下指令，按 Enter：

```
gh auth status
```

### 4-2. 如果看到類似以下內容，就表示 100% 成功：
```
github.com
  ✓ Logged in to github.com account wujie546
```

---

## 🎉 恭喜！全部設定完成！

設定完成後，不管您使用 **Antigravity、Codex、Claude Code** 或任何 AI 工具，
跟它說「幫我推到 GitHub」，它就能**全自動幫您上架**了！

---

---

## 📌 附錄 A：如何手動在 GitHub 上建立新專案

1. 👉 開啟瀏覽器，前往 **https://github.com/new**
2. 在 **Repository name** 欄位輸入專案名稱（例如 `my-cool-app`）
3. 選擇 **Public**（公開，這樣才能開啟免費網站）
4. 往下拉，點擊綠色 **「Create repository」** 按鈕
5. 完成！✅

---

## 📌 附錄 B：如何開啟 GitHub Pages（免費網站）

1. 進入您的專案頁面（例如 `https://github.com/wujie546/專案名稱`）
2. 點擊上方的 **「Settings」**（齒輪圖示的設定）
3. 左邊選單點擊 **「Pages」**
4. 在 **Branch** 那裡選擇 **「main」**
5. 點擊 **「Save」** 按鈕
6. 等 1~2 分鐘，您的免費網站就上線了！
7. 網址格式為：**`https://wujie546.github.io/專案名稱/`**

---

## 📌 附錄 C：如何查看您所有的 GitHub 專案

👉 開啟瀏覽器，前往 **https://github.com/wujie546?tab=repositories**

---

## 🔑 您的重要資訊備忘

| 項目 | 內容 |
|---|---|
| GitHub 帳號 | **wujie546** |
| GitHub 個人頁面 | https://github.com/wujie546 |
| 巴西葡萄牙語遊戲專案 | https://github.com/wujie546/pt-br-learning-game |
| 巴西葡萄牙語遊戲網址 | https://wujie546.github.io/pt-br-learning-game/ |
