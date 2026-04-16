qualitycare-portfolio/
├── frontend/
│   └── index.html          # Full HTML/CSS/JS website UI
├── backend/
│   ├── server.js           # Node.js + Express REST API
│   ├── package.json
│   └── .env.example
└── README.md

# 1. Init repo
cd qualitycare-portfolio
git init

# 2. Stage files
git add .

# 3. Commit
git commit -m "feat: Quality Care UAE — frontend UI + backend API (freelance)"

# 4. Create repo on github.com/new (name: qualitycare-uae-portfolio)

# 5. Link & push
git remote add origin https://github.com/YOUR_USERNAME/qualitycare-uae-portfolio.git
git branch -M main
git push -u origin main

# 6. Optional gitignore
echo -e "node_modules/\n.env\n.DS_Store" > .gitignore
git add .gitignore && git commit -m "chore: gitignore" && git push
