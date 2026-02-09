# Tokopedia Clone App 🛍️

A modern, feature-rich e-commerce application built with **React Native** and **Expo**, replicating the core functionalities of Tokopedia. This project demonstrates complex UI/UX implementation, global state management, and seamless navigation.

## 📱 Overview

This application simulates a real-world e-commerce experience, featuring a dynamic home screen, detailed product pages with animations, a functional shopping cart, wishlist management, transaction history, and an engaging video feed.

## ✨ Key Features

- **🏠 Home Screen**: 
  - Dynamic banner carousel.
  - Category navigation.
  - Product recommendations.
  
- **🛍️ Product Details**:
  - **"Fly to Cart" Animation**: Visual feedback when adding items to the cart.
  - **Wishlist Integration**: Heart icon toggle with notification.
  - Image gallery and detailed descriptions.
  - Related product recommendations.

- **🛒 Shopping Cart**:
  - Global state management using Context API.
  - Adjust quantity, remove items, and calculate totals dynamically.
  - Selection logic for checkout.

- **❤️ Wishlist**:
  - Save favorite items.
  - **Category Filter**: Filter wishlist items by category (e.g., "Men's Clothing", "Electronics").
  - Move items directly to the cart.
  - Badge notification on the tab bar.

- **📜 Transaction History**:
  - View past orders with status.
  - **Filter Transactions**: Filter by status or category.
  - **Buy Again**: Quickly re-order items from history.

- **🎬 Video Feed**: 
  - TikTok-style vertical video feed.
  - Autoplay/pause visibility tracking.
  - Product overlay to buy directly from the feed.

- **🎨 UI/UX**:
  - **Custom Splash Screen**: Branded launch screen.
  - **Tab Navigation**: Custom bottom bar with notification badges.
  - **Micro-interactions**: Smooth transitions and feedback modals.

## 🛠️ Tech Stack

- **Framework**: React Native (Expo)
- **Language**: TypeScript
- **Navigation**: Expo Router (File-based routing)
- **State Management**: React Context API
- **Icons**: Lucide React Native
- **Media**: Expo AV (Audio/Video)
- **Styling**: Inline Styles / React Native StyleSheet

## 🚀 Getting Started

Follow these steps to run the project locally:

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/tokopedia-clone.git
    cd tokopedia-clone
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the server**
    ```bash
    npx expo start -c
    ```
    *(Note: The `-c` flag clears the cache, recommended for asset updates like splash screens)*

4.  **Run on Device/Emulator**
    -   **Android**: Press `a` in the terminal (requires Android Studio or connected device).
    -   **iOS**: Press `i` in the terminal (requires Xcode or Simulator).
    -   **Physical Device**: Scan the QR code with the **Expo Go** app.

## 📂 Folder Structure

```
├── app/                  # Application source code (Expo Router)
│   ├── (tabs)/           # Tab navigation screens (Home, Feed, Wishlist, Transaction)
│   ├── cart.tsx          # Shopping cart screen
│   ├── detailProducts.tsx# Product detail screen
│   └── _layout.tsx       # Root layout and context providers
├── assets/               # Images and static resources
├── components/           # Reusable UI components
├── context/              # Global state (CartContext)
└── app.json              # Expo configuration
```

## 📸 Screenshots

*(Add your screenshots here)*

---

Built with ❤️ by **[Your Name/Team]**
