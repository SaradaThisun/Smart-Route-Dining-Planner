# 🍽️ TravelTaste — Smart Route Dining Planner

> **Discover the best restaurants along your travel route in Sri Lanka.**  
> TravelTaste uses custom data structures and algorithms to recommend dining stops based on your route, preferences, and budget.

![React Native](https://img.shields.io/badge/React_Native-0.86-blue?logo=react)
![Expo](https://img.shields.io/badge/Expo-57-black?logo=expo)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## 📋 Table of Contents

- [Features](#-features)
- [Architecture](#-architecture)
- [Data Structures & Algorithms](#-data-structures--algorithms)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [API Documentation](#-api-documentation)
- [Team](#-team)

---

## ✨ Features

- **Route-Based Discovery** — Enter start & destination to find restaurants along your travel path
- **Smart Ranking** — Restaurants scored using a Priority Queue based on rating, distance, cuisine match, and budget
- **Interactive Map Ruler** — Visual route representation with restaurant stops positioned by distance
- **Filter & Preferences** — Filter by cuisine, budget, halal, vegetarian, parking, and family-friendly
- **Grid-Based Spatial Search** — Efficient nearby restaurant lookup using a spatial grid index
- **Graph Route Modeling** — Travel route modeled as a weighted graph for distance calculations
- **Dijkstra's Shortest Path** — Optimal pathfinding through the restaurant network
- **Binary Search Tree** — Efficient restaurant lookup by rating

---

## 🏗 Architecture

```
┌──────────────────────────┐     HTTP      ┌──────────────────────────┐
│                          │    POST /     │                          │
│   React Native (Expo)    │──────────────▶│   Express.js Backend     │
│   Mobile App             │◀──────────────│   REST API               │
│                          │    JSON       │                          │
├──────────────────────────┤               ├──────────────────────────┤
│ • Onboarding Screen      │               │ • Grid Spatial Index     │
│ • Route Input Screen     │               │ • Graph (Route Model)    │
│ • Map Ruler Screen       │               │ • Priority Queue         │
│ • Explore Screen         │               │ • Linked List            │
│ • Profile Screen         │               │ • Binary Search Tree     │
│ • Saved Screen           │               │ • HashMap                │
│ • Filter Panel           │               │ • Dijkstra's Algorithm   │
└──────────────────────────┘               └──────────────────────────┘
```

---

## 🧮 Data Structures & Algorithms

| DS / Algorithm | File | Purpose |
|---|---|---|
| **Graph** | `utils/graph.js` | Models the travel route as nodes (waypoints) connected by weighted edges (distance) |
| **Dijkstra's Algorithm** | `utils/graph.js` | Finds shortest path between any two nodes in the route/restaurant network |
| **Linked List** | `utils/linkedList.js` | Stores ranked restaurant results as a chain of nodes |
| **Priority Queue** | `utils/rankUtils.js` | Scores and ranks restaurants by multiple criteria (rating, distance, preferences) |
| **Grid Spatial Index** | `utils/gridIndex.js` | Divides geographic area into grid cells for O(1) nearby restaurant lookups |
| **Binary Search Tree** | `utils/bst.js` | Indexes restaurants by rating for efficient range queries |
| **HashMap** | `HashMap.js` | Groups places by city for fast city-based lookups |

---

## 🛠 Tech Stack

### Frontend (Mobile App)
- **React Native** with Expo SDK 57
- **Expo Router** for file-based navigation
- **React Native Maps** for map integration
- **TypeScript** for type safety

### Backend (API Server)
- **Node.js** with Express.js
- **Turf.js** for geospatial calculations
- **Custom DSA implementations** (no external DS libraries)

---

## 📁 Project Structure

```
TravelTaste/
├── travel-taste-app/          # React Native mobile app
│   ├── app/
│   │   ├── (tabs)/            # Tab navigation screens
│   │   ├── onboarding.tsx     # Welcome/onboarding flow
│   │   ├── login.tsx          # User authentication
│   │   ├── signup.tsx         # Registration
│   │   ├── route-input.tsx    # Start/destination input with preferences
│   │   ├── map-ruler.tsx      # Visual route with restaurant stops
│   │   ├── explore.tsx        # Browse restaurants
│   │   ├── saved.tsx          # Saved/favorite restaurants
│   │   ├── profile.tsx        # User profile
│   │   └── edit-profile.tsx   # Profile editing
│   ├── components/
│   │   ├── FilterPanel.tsx    # Restaurant filter UI
│   │   └── RestaurantDetailSheet.tsx  # Restaurant detail modal
│   └── constants/
│       └── theme.ts           # Design tokens & colors
│
├── travel-taste-backend/      # Node.js API server
│   ├── server.js              # Express server entry point
│   ├── routes/
│   │   └── recommend.js       # POST /recommend endpoint
│   ├── utils/
│   │   ├── graph.js           # Graph + Dijkstra's algorithm
│   │   ├── gridIndex.js       # Spatial grid index
│   │   ├── linkedList.js      # Singly linked list
│   │   ├── rankUtils.js       # Priority queue + scoring
│   │   ├── routeUtils.js      # Geo math (turf.js)
│   │   └── bst.js             # Binary search tree
│   ├── data/
│   │   └── restaurants.json   # 30 restaurants across Sri Lanka
│   └── HashMap.js             # City-based place grouping
│
└── README.md                  # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18
- **npm** >= 9
- **Expo CLI** (`npm install -g expo-cli`)
- Android/iOS emulator or Expo Go app on your phone

### 1. Clone the repository

```bash
git clone https://github.com/SaradaThisun/Smart-Route-Dining-Planner.git
cd Smart-Route-Dining-Planner
```

### 2. Start the Backend

```bash
cd travel-taste-backend
npm install
npm start
```

The API server will start on `http://localhost:3000`.

### 3. Start the Mobile App

```bash
cd travel-taste-app
npm install
npx expo start
```

Scan the QR code with Expo Go or press `a` for Android / `i` for iOS emulator.

---

## 📡 API Documentation

### `GET /`
Health check endpoint.

**Response:**
```json
{ "message": "TravelTaste API is running" }
```

### `POST /recommend`
Get restaurant recommendations along a route.

**Request Body:**
```json
{
  "routeCoords": [[79.8612, 6.9271], [80.6337, 7.2906], [81.0466, 6.8667]],
  "preferences": {
    "cuisine": "Sri Lankan",
    "budget": 2,
    "maxDistance": 10,
    "halal": true,
    "vegetarian": false
  }
}
```

**Response:**
```json
{
  "totalDistance": 185.3,
  "graphTotalDistance": 185.3,
  "count": 5,
  "restaurants": [
    {
      "id": 1,
      "name": "Ella Rice & Curry House",
      "rating": 4.7,
      "cuisine": "Sri Lankan",
      "price": 2,
      "km": 42.5,
      "distanceFromRoute": 1.2,
      "score": 87.5
    }
  ]
}
```

### `GET /restaurants`
List all restaurants with optional filters.

**Query Parameters:** `cuisine`, `halal`, `vegetarian`, `minRating`, `maxPrice`

### `GET /restaurants/:id`
Get a single restaurant by ID.

### `POST /restaurants`
Add a new restaurant.

### `PUT /restaurants/:id`
Update an existing restaurant.

### `DELETE /restaurants/:id`
Delete a restaurant.

---

## 👥 Team

| Name | Branch | Role |
|------|--------|------|
| Sarada | `Sarada` | Team Lead |
| Vinura | `Vinura` | Backend & DSA |
| Dulsha | `Dulsha` | Frontend |
| Tharindu | `Tharindu` | Frontend |

---

## 📄 License

This project is developed as part of an academic assignment.
