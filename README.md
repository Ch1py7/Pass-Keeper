<div align="center"> <img src="https://raw.githubusercontent.com/Ch1py7/Pass-Keeper/refs/heads/main/public/readme/screenshot.webp" alt="Screenshot Preview" width="600"/> </div> <div align="center"> <span>📁</span> <a href="#-project-structure">View Project Structure</a> </div>

# 🌟 Pass Keeper

**Pass Keeper** is a secure and modern password manager built with privacy and cross-platform support in mind. It allows you to encrypt and manage your credentials, generate strong passwords, and synchronize with your own database. 🔐  

## 🎯 Features
- 🚀 **Database Synchronization** – Synchronize your data between local storage and a personal SQL or PostgreSQL database. Useful for accessing your passwords from multiple locations securely.
- 🔒 **Password Generator** – Automatically generate strong, random passwords to increase your security and reduce the burden of coming up with your own.
- ⚡ **Lightweight Desktop App** - Powered by Tauri v2, Pass Keeper runs as a native desktop application with minimal resource usage.

## 🛠 Installation
1. Download the latest release from the [Releases page](https://github.com/Ch1py7/Pass-Keeper/releases).
2. Run the installer for your OS (currently supported: Windows and Mac).
3. Launch the app and start managing your secrets!

## 🏗️ Project Structure
```plaintext
📂 /Project
├── 📁 src-tauri           # Backend logic using Rust (Tauri)
├── 📁 src                 # Frontend app (React + TS)
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── 📁 components       # UI components
│   ├── 📁 errors           # Error boundaries & messages
│   ├── 📁 folderKeybinds   # Hotkey/shortcut logic
│   ├── 📁 hooks            # Custom React hooks
│   ├── 📁 notifications    # Toasts/alerts
│   ├── 📁 services         # Kdbx and DB interaction
│   ├── 📁 store            # Global state management
│   └── 📁 utils            # Utility functions
├── package.json
├── README.md
└── LICENSE
```

## 🛠 Built With
- **[React](https://react.dev/):** Modern JavaScript library for building user interfaces.
- **[TypeScript](https://www.typescriptlang.org/):** Strongly typed language that compiles to JavaScript.
- **[Tailwind CSS](https://tailwindcss.com/):** Utility-first CSS framework.
- **[Tauri v2](https://v2.tauri.app/):** Framework for building secure and lightweight desktop apps.
- **[Iconify](https://iconify.design/):** Over 150,000 open-source icons at your fingertips.

## 🤝 Contributing
Contributions are welcome!
If you find a bug or have a feature request, feel free to [open an issue](https://github.com/Ch1py7/Pass-Keeper/issues) or submit a pull request.

## 📚 License
This project is licensed under the [MIT License](https://github.com/Ch1py7/Pass-Keeper/blob/main/LICENSE).
