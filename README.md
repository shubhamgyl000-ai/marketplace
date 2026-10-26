# Marketly — Online Marketplace

A beginner-friendly starter project using HTML, CSS, JavaScript, and Java Spring Boot.

## Features
- Responsive storefront
- Product cards, search, and category filter
- Shopping cart with quantity totals and remove buttons
- Java REST API at `/api/products`
- Demo products so the frontend works without Java

## Project structure
```
marketplace/
├── index.html
├── style.css
├── script.js
└── backend/
    ├── pom.xml
    └── src/main/java/com/marketplace/
        ├── MarketplaceApplication.java
        └── ProductController.java
```

## Run the Java backend
Requires Java 17+ and Maven.

Windows PowerShell:
```powershell
cd backend
mvn spring-boot:run
```

API: http://localhost:8080/api/products

## Open the frontend
Open `index.html` in your browser. The site uses demo products automatically if the Java API is not running.

## Publish the frontend on GitHub Pages
In the repository, open **Settings → Pages**, select **Deploy from a branch**, choose **main** and **/(root)**, then save. GitHub Pages hosts the static frontend only; the Java backend must run separately on a Java-capable host.

## Current limitations
This is a starter demo. User login, database persistence, admin product management, and real payment checkout are not implemented yet. Do not enter real payment details.