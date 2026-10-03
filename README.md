# Admin Panel - Frontend Technical Challenge

A modern, responsive, and maintainable Admin Panel built with Nuxt 3 and Vue 3.

## 🚀 Features
- **Authentication**: Secure login with localStorage token and route protection.
- **Dashboard**: Real-time statistics with interactive Chart.js analytics (Line & Doughnut).
- **User Management**: Full CRUD operations with search, filter, and modal forms.
- **Order Management**: Status tracking, detailed view modals, and status filtering.
- **Profile**: User informtion display and session management.

## 🛠️ Tech Stack
- Nuxt 3 & Vue 3 (Composition API)
- Pinia (State Management)
- Tailwind CSS (Styling)
- Chart.js & vue-chartjs (Analytics)
- JSON Server (Mock API)

## 📦 Setup & Development
1. Install dependencies:
```bash
   npm install
```
2. Run the development server (starts both Nuxt and JSON Server):
```bash
   npm run dev
```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure
- `pages/`: Application routes.
-`components/`: Reusable UI components (modals, charts, cards).
- `composables/`: Custom logic (e.g., `useApi` for centralized API calls).
- `stores/`: Pinia stores for global state (e.g., `dashboardStore`).
- `middleware/`: Route protection (`auth.ts`).

## 💡 Key Technical Decisions
- **No Layout Shift**: Used `useAsyncData` in Dashboard to fetch data on the server side, ensuring a smooth, jump-free loading experience.
- **Reactive Modals**: Used `watch` in `OrderModal` to fetch user details asynchronouly only when the modal opens, preventing unnecessary API calls.
- **Error Resilience**: Implemented `.catch()` in `Promise.all` to ensure that if one API fails, the rest of the dashboard still renders.