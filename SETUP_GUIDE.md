# 🚀 Mind Mine Money - Setup Guide

This project is set up to run entirely within **Docker**, meaning you do **not** need to install Node.js, Python, or PostgreSQL on your local Windows machine.

## 📋 Prerequisites

1.  **Docker Desktop**: You must have Docker Desktop installed and running.
    *   [Download for Windows](https://docs.docker.com/desktop/install/windows-install/)
    *   **Verify**: Open PowerShell and run `docker --version`.

## 🛠️ Installation & Running

### 1. Start the Project

Open a terminal in the root `MindMine_Money` folder and run:

```powershell
docker-compose up --build
```

**What this does:**
*   Builds the frontend container.
*   Installs all dependencies (`node_modules`) *inside* the container.
*   Starts the Next.js development server on port 3000.

### 2. Access the App

Once you see `Ready in ...` in the terminal logs:

*   Open your browser to: [http://localhost:3000](http://localhost:3000)

## 🔄 How to Develop

### Editing Code
Simply edit files in your local `frontend/src` folder (e.g., `src/app/page.tsx`).
*   **Hot Reload**: The changes will automatically reflect in the browser.
*   **Note**: You might see red underlines in your editor if it can't find `node_modules`. This is normal because dependencies are installed *inside* Docker, not on your host.

### Installing New Packages
Since you don't have `npm` locally, you must ask Docker to install packages for you:

**To install a package (e.g., `axios`):**

```powershell
# Run this in a NEW terminal window while the server is running
docker-compose exec frontend npm install axios
```

### Troubleshooting

**"Port 3000 is already in use"**
*   Stop any other node processes or docker containers.

**"Dependency not found" errors in VS Code**
*   This is expected because the `node_modules` folder is hidden inside Docker.
*   **Fix**: You can run `docker-compose cp frontend:/app/node_modules ./frontend/node_modules` to copy them out for VS Code to see (optional).

## 🗂️ Project Structure

*   `docker-compose.yml`: Main configuration file.
*   `frontend/Dockerfile.dev`: Instructions for building the app.
*   `frontend/src`: Your source code.
