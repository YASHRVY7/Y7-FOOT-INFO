# ⚽️ Football Info Platform


  
  
  
  



  A full-stack European football league explorer
  Built with Angular frontend and NestJS backend API



  
  
  
  
  <p align="center">
  <img src="https://angular.io/assets/images/logos/angular/angular.svg" height="60" alt="Angular" />
  <img src="https://nestjs.com/img/logo-small.svg" height="60" alt="NestJS" />
  <img src="https://seeklogo.com/images/N/netlify-logo-758722CDF4-seeklogo.com.png" height="50" alt="Netlify" />
  <img src="https://render.com/images/render-mark-gradient.svg" height="50" alt="Render" />
</p>

<p align="center">
  <strong>A full-stack European football league explorer</strong><br/>
  Built with Angular frontend and NestJS backend API
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white" alt="Angular" />
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white" alt="Netlify" />
  <img src="https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white" alt="Render" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Live-brightgreen?style=flat-square" alt="Status" />
  <img src="https://img.shields.io/badge/Version-1.0.0-blue?style=flat-square" alt="Version" />
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=flat-square" alt="License" />
  <img src="https://img.shields.io/badge/API-Football--Data-orange?style=flat-square" alt="API" />
</p>



  
  
  
  



  🌐 Live Demo •
  ✨ Features •
  🚀 Quick Start •
  🚀 Deployment


---

## 🌐 Live Demo

https://github.com/user-attachments/assets/c05b66da-11f7-4d55-ab15-a76a66f14947



- **🎯 Frontend:** [https://whimsical-kangaroo-b5d5d3.netlify.app](https://whimsical-kangaroo-b5d5d3.netlify.app)

## ✨ Features

- 🏆 **Top 8 European Leagues** - Premier League, La Liga, Serie A, Bundesliga, and more
- 👥 **Team Information** - Complete team rosters and details
- 📊 **Live Standings** - Current league standings and statistics  
- ⚽ **Player Profiles** - Detailed player information
- 📱 **Responsive Design** - Works perfectly on all devices
- 🔒 **Secure API** - CORS-enabled with proper authentication

## 🏗️ Project Structure

```
football-info-platform/
├── 📂 football-backend/     # NestJS API Server
│   ├── src/
│   │   ├── leagues/         # League endpoints
│   │   ├── teams/           # Team endpoints  
│   │   ├── players/         # Player endpoints
│   │   ├── standings/       # Standings endpoints
│   │   └── main.ts          # App bootstrap
│   ├── package.json
│   └── .env
├── 📂 football-frontend/    # Angular Web App
│   ├── src/
│   │   ├── app/             # Angular components
│   │   ├── environments/    # Environment configs
│   │   └── index.html
│   ├── package.json
│   └── netlify.toml
└── README.md
```

---

## 🔧 Backend - NestJS API


  
  
  


**Powerful TypeScript backend serving football data**

### 🛠️ Tech Stack
- **Framework:** NestJS
- **Language:** TypeScript
- **Data Source:** Football-Data.org API
- **Hosting:** Render

### 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/leagues` | List top 8 European leagues |
| `GET` | `/teams/:leagueCode` | Get teams in specific league |
| `GET` | `/players/:teamId` | Get players in specific team |
| `GET` | `/standings/:leagueCode` | Get league standings |

### 🚀 Local Development

```
# Navigate to backend directory
cd football-backend

# Install dependencies
npm install

# Create environment file
echo 'FOOTBALL_DATA_API_KEY=your-api-key-here' > .env

# Start development server
npm run start:dev

# Build for production
npm run build

# Start production server
npm run start
```

### 🔐 Environment Variables

Create a `.env` file in the backend root:

```
FOOTBALL_DATA_API_KEY=your-football-data-api-key
NODE_ENV=development
```

### 📋 Supported League Codes

- `PL` - Premier League (England)
- `PD` - La Liga (Spain) 
- `SA` - Serie A (Italy)
- `BL1` - Bundesliga (Germany)
- `FL1` - Ligue 1 (France)
- `PPL` - Primeira Liga (Portugal)
- `DED` - Eredivisie (Netherlands)
- `BSA` - Süper Lig (Turkey)

---

## 🎨 Frontend - Angular App


  
  
  


**Modern, responsive football league explorer**

### 🛠️ Tech Stack
- **Framework:** Angular 18+
- **Language:** TypeScript
- **Styling:** CSS3 with responsive design
- **Hosting:** Netlify

### 🚀 Local Development

```
# Navigate to frontend directory
cd football-frontend

# Install dependencies
npm install

# Start development server
ng serve

# Build for production
ng build --configuration production
```

### 🌍 Environment Configuration

**Development** (`src/environments/environment.ts`):
```
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:3000'  // Local backend
};
```

**Production** (`src/environments/environment.prod.ts`):
```
export const environment = {
  production: true,
  apiBaseUrl: 'https://y7-foot-info.onrender.com'  // Live backend
};
```

### 📦 Build Commands

```
# Development build
ng build

# Production build
ng build --configuration production

# Serve locally
ng serve --open
```

---

## 🚀 Deployment

### 🔴 Backend Deployment (Render)


  


1. **Create Render Account** at [render.com](https://render.com)

2. **Connect Repository** and select `football-backend`

3. **Configure Build Settings:**
   ```
   Build Command: npm install && npm run build
   Start Command: npm run start
   ```

4. **Set Environment Variables:**
   ```
   NODE_ENV=production
   FOOTBALL_DATA_API_KEY=your-actual-api-key
   ```

5. **Deploy** - Render will auto-deploy on git push

### 🟢 Frontend Deployment (Netlify)


  


1. **Build Production Version:**
   ```
   cd football-frontend
   ng build --configuration production
   ```

2. **Deploy to Netlify:**
   ```
   # Using Netlify CLI
   npm install -g netlify-cli
   netlify deploy --prod --dir=dist/football-frontend/browser
   
   # Or drag & drop dist folder to netlify.com
   ```

3. **Configure `netlify.toml`:**
   ```
   [build]
     command = "ng build --configuration production"
     publish = "dist/football-frontend/browser"
   
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   
   [[headers]]
     for = "/*"
     [headers.values]
       Content-Security-Policy = "default-src 'self'; connect-src 'self' https://y7-foot-info.onrender.com; img-src 'self' https://crests.football-data.org data: blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
   ```

---

## 🔑 Getting Football Data API Key


  


1. Visit [Football-Data.org](https://www.football-data.org/client/register)
2. Create a **free account**
3. Get your API token from the dashboard
4. **Free tier limits:** 10 requests/minute, 10,000/month

---

## 🛡️ Security Features

- ✅ **CORS Configuration** - Only allows requests from frontend domain
- ✅ **Content Security Policy** - Prevents XSS attacks
- ✅ **Environment Variables** - API keys stored securely
- ✅ **Input Validation** - All endpoints validate parameters
- ✅ **Error Handling** - Graceful error responses

---

## 🔄 Future Enhancement

### 📦 Cache Management (Next Priority)

**Why:** API has limits (10 requests/minute) - need caching for production use.

**Plan:**
- 🗄️ Add Redis cache to store API responses
- ⏱️ Cache data for different times:
  - Leagues: 24 hours
  - Teams: 6 hours  
  - Standings: 1 hour
- ⚡ Faster response times
- 📊 Stay within API limits
- 🔄 Auto-refresh old data

**Result:** App works better with many users, fewer API errors.

---

## 🛠️ Development

### 🔧 Prerequisites


  
  
  


- **Node.js** 18+ and npm
- **Angular CLI** 18+
- **Football-Data.org API Key**

### 🚀 Quick Start

```
# Clone repository
git clone 
cd football-info-platform

# Setup backend
cd football-backend
npm install
echo 'FOOTBALL_DATA_API_KEY=your-key' > .env
npm run start:dev

# Setup frontend (new terminal)
cd ../football-frontend  
npm install
ng serve

# Visit http://localhost:4200
```

### 🧪 Available Scripts

**Backend:**
```
npm run start:dev    # Development with hot reload
npm run start:debug  # Debug mode with breakpoints
npm run build        # Production build
npm run start        # Production server
```

**Frontend:**
```
ng serve            # Development server
ng build            # Development build
ng build --prod     # Production build
ng test             # Run unit tests
```

---

## 🤝 Contributing


  


1. **Fork** the repository
2. **Create** your feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

---

## 📄 License


  


This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **⚽ Football Data:** [Football-Data.org](https://www.football-data.org) for providing free football API
- **🎨 Icons:** Angular, NestJS, Netlify, and Render for their official logos
- **💖 Built with:** Angular framework and NestJS ecosystem

---
