# 📦 OfflineOrderApp

An **offline-first React Native app** that allows users to browse products, create/update/delete orders offline, and automatically sync them when network connectivity is restored.

Built with **React Native**, **Redux Toolkit**, **Realm**, and **NetInfo**, it also includes **conflict resolution**, **sync indicators**, and **retry on failure**.

---

## ✅ Features

- 📱 Browse products with name, price, and image
- 📴 Full offline CRUD for orders
- 🔁 Sync queued actions on reconnect
- 🔄 Conflict resolution using `last-write-wins`
- 🟡 Visual indicators for pending syncs
- 🔴 Failed sync retry support
- 🧠 High-performance local storage using **Realm**

---

## 🛠️ Setup & Installation
Follow these steps to run the project locally:

1. Clone the repository

git clone https://github.com/saby87/OnlineOrderApp
cd OfflineOrderApp

2. Install dependencies

npm install

3. Install iOS pods (for macOS/iOS)

npx pod-install

4. Run the app

npm run android   # For Android
npm run ios       # For iOS (macOS only)
5. Optional: Run Tests

npm install --save-dev jest @types/jest ts-jest
npx jest
✅ Prerequisites
Node.js (18+ recommended)

React Native CLI

Xcode (for iOS) or Android Studio (for Android)

macOS required for iOS builds

watchman (recommended for macOS users)
