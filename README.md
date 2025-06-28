
# Subasta Online = Examen React🖥️⚡

Plataforma web de subastas en tiempo real, donde los usuarios pueden participar en subastas, realizar ofertas y los administradores pueden gestionar productos y usuarios.

Este proyecto utiliza **React**, **TypeScript**, **Vite**, **JSON Server**, **Material UI**, **Formik**, **Yup**, **Zustand**, **i18n**, y **Server-Sent Events (SSE)**.

---

## 🚀 Tecnologías Aplicadas

✅ **React + Vite** → Framework moderno para desarrollo rápido y eficiente.
✅ **TypeScript** → Tipado estático para mayor robustez.
✅ **Material UI (MUI)** → Componentes de interfaz elegantes y responsivos.
✅ **Formik + Yup** → Manejo de formularios con validaciones robustas.
✅ **Zustand** → Estado global simple y eficiente.
✅ **i18n** → Internacionalización preparada para múltiples idiomas.
✅ **JSON Server** → Simulación de API REST para productos y usuarios.
✅ **SSE (Server-Sent Events)** → Comunicación en tiempo real para actualizaciones de subastas.

---

## 🛠️ Funcionalidades

### 👥 Autenticación básica:

* Registro de usuarios con selección de avatar.
* Login rápido almacenando datos en localStorage.

### 🎯 Administración:

* **/admin/usuarios** → Tabla de usuarios con CRUD completo (crear, editar, eliminar).
* **/admin/productos** → Tabla de productos con CRUD completo.

### 🛒 Subastas:

* Participación en subastas en tiempo real con SSE.
* Ofertas visibles al instante para todos los usuarios conectados.
* Historial personal de subastas ganadas.

### 🌍 Internacionalización:

* Proyecto estructurado para permitir varios idiomas (implementado con `react-i18next`).

### ⚡ Comunicación en tiempo real:

* Backend con SSE para actualizar la información sin recargar la página.

---

## 📂 Estructura del Proyecto

```
subasta-online/
├─ public/
├─ src/
│  ├─ components/      → Componentes reutilizables
│  ├─ pages/           → Páginas principales (Admin, Home, Login, Registro, Historial)
│  ├─ context/         → Contexto global (UserContext)
│  ├─ hooks/           → Custom Hooks (useAuction)
│  ├─ utils/           → Utilidades (avatares, helpers)
│  ├─ i18n.ts          → Configuración de internacionalización
├─ sse-server/         → Servidor backend SSE
├─ db.json             → Base de datos simulada (JSON Server)
├─ package.json
├─ vite.config.ts
```

---

## ⚙️ Instalación y Ejecución

### Requisitos:

* Node.js v16+
* NPM

### Pasos:

#### 1️⃣ Clonar el repositorio:

```bash
git clone <URL-del-repositorio>
cd subasta-online
```

#### 2️⃣ Instalar dependencias del frontend:

```bash
npm install
```

#### 3️⃣ Ejecutar el frontend:

```bash
npm run dev
```

El frontend estará disponible en: [http://localhost:5173](http://localhost:5173)

---

## 🗄️ Simulación de API (JSON Server)

En otra terminal:

```bash
npx json-server --watch db.json --port 3001
```

Acceso API REST en: [http://localhost:3001](http://localhost:3001)

---

## 🔥 Servidor SSE (Subastas en tiempo real)

Ir a la carpeta del servidor SSE:

```bash
cd sse-server
npm install
node index.js
```

Servidor SSE en: [http://localhost:3002](http://localhost:3002)

---

## 🎨 Pantallas implementadas

✅ Página Principal
✅ Registro y Login con selección de avatar
✅ Panel de Administración (usuarios y productos)
✅ Subastas en tiempo real
✅ Historial de subastas ganadas
✅ Interfaz responsive (adaptable a móviles y escritorio)


