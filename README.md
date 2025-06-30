# Subasta Online -Examen React 🖥️⚡

Plataforma web de subastas en tiempo real, donde los usuarios pueden participar en subastas, realizar ofertas y los administradores gestionan productos y usuarios.

Este proyecto está dividido en dos carpetas independientes:

-   ✅ `subasta-online` → Frontend de la plataforma
-   ✅ `sse-server` → Backend de eventos en tiempo real (SSE)

---

## 🚀 Tecnologías Aplicadas

-   ✅ **React + Vite** → Desarrollo rápido y eficiente
-   ✅ **TypeScript** → Tipado estático robusto
-   ✅ **Material UI (MUI)** → Componentes visuales modernos
-   ✅ **Formik + Yup** → Formularios con validaciones
-   ✅ **Zustand** → Manejo de estado global simple
-   ✅ **i18n** → Internacionalización lista para múltiples idiomas
-   ✅ **JSON Server** → Simulación de API REST
-   ✅ **SSE (Server-Sent Events)** → Actualizaciones en tiempo real

---

## 📂 Estructura de Carpetas

```
raíz-del-proyecto/
├─ subasta-online/    → Frontend de la plataforma
│   ├─ src/
│   ├─ public/
    ├─ db.json        → Base de datos simulada (JSON Server)
│   ├─ package.json
│   └─ vite.config.ts
│
├─ sse-server/        → Servidor SSE (tiempo real)
│   ├─ index.js
│   ├─ package.json
      
```

---

## 🛠️ Funcionalidades

-   👥 Registro de usuarios con selección de avatar
-   🛒 Gestión de productos y usuarios (solo para administradores)
-   🎯 Subastas en tiempo real con SSE
-   ⚡ Ofertas y mensajes que se actualizan sin recargar la página
-   📊 Historial personal de subastas ganadas
-   🌍 Preparado para varios idiomas con i18n
-   💻 Interfaz responsive y amigable

---

## ⚙️ Instalación y Ejecución

### Requisitos:

* Node.js v16+
* NPM

### 1️⃣ Frontend (subasta-online) y Simulación de API REST (JSON Server)

```bash
cd subasta-online
npm install
npm run dev
```

Accede a: [http://localhost:5173](http://localhost:5173)

API en: [http://localhost:3001](http://localhost:3001)

---

### 2️⃣ Backend de Subastas en Tiempo Real (sse-server)

```bash
cd sse-server
npm install
node index.js
```

SSE disponible en: [http://localhost:3002](http://localhost:3002)

---


## 🎨 Pantallas Implementadas

-   ✅ Inicio de sesión y registro de usuarios
-   ✅ Panel de administración de productos y usuarios
-   ✅ Subastas en tiempo real con pujas visibles al instante
-   ✅ Historial de subastas ganadas por el usuario actual
-   ✅ Diseño responsive adaptable

---
