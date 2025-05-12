# Laravel Route Jumper 🚀

[![VS Code Marketplace](https://img.shields.io/visual-studio-marketplace/v/vpinob.laravel-route-jumper)](https://marketplace.visualstudio.com/items?itemName=vpinob.laravel-route-jumper)
[![Installs](https://img.shields.io/visual-studio-marketplace/i/vpinob.laravel-route-jumper)](https://marketplace.visualstudio.com/items?itemName=vpinob.laravel-route-jumper)
[![License](https://img.shields.io/github/license/vpinob/laravel-route-jumper)](LICENSE)

**Jump seamlessly between Laravel route references and their definitions** - right from your Blade templates or controllers to `routes/*.php` files.

<!-- ![Demo Animation]() -->

---

## 🌟 Features

- **Instant navigation** from `route('name')` → `Route::get(...)` definitions
- **Full Laravel support**:
  - All HTTP methods (`get/post/put/delete/any`)
  - Named routes (`->name('profile.update')`)
  - Route groups with prefixes
- **Works in**:
  - Blade files (`*.blade.php`)
  - PHP controllers
  - Middleware and service providers
- **VS Code integration**:
  - Right-click context menu
  - Keyboard shortcuts
  - Status bar indicator (optional)

---

## 🛠 Installation

### **Method 1: VS Code Marketplace**
1. Open **Extensions** in VS Code (`Ctrl+Shift+X` / `Cmd+Shift+X`)
2. Search for: `Laravel Route Jumper`
3. Click **Install**

### **Method 2: CLI Installation**
```bash
code --install-extension vpinob.laravel-route-jumper