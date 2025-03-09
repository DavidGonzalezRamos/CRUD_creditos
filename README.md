# 💰 Gestión de Créditos

Este proyecto es una aplicación web para la gestión de créditos, desarrollada con **Flask** (backend) y **React** (frontend). Permite registrar, editar, visualizar y graficar créditos otorgados a diferentes clientes.

## Tecnologías Utilizadas

### Backend:
- Python (Flask)
- Flask-CORS
- SQLAlchemy
- Matplotlib

### Frontend:
- React
- Axios
- Tailwind CSS
- React Toastify

---

## 🛠️ Instalación y Ejecución

### 🔹 **1. Configurar y Ejecutar el Backend (Flask)**

#### 1️⃣ **Clonar el repositorio**
```bash
git clone https://github.com/DavidGonzalezRamos/CRUD_creditos.git
cd CRUD_creditos
```

#### 2️⃣ **Crear y activar entorno virtual** (opcional pero recomendado)
```bash
#creacion del entorno
cd examen_backend
python3 -m venv .venv
# En Windows:
.venv\Scripts\activate
# En Mac/Linux:
source .venv/bin/activate
```

#### 3️⃣ **Instalar dependencias**
```bash
pip install flask flask_sqlalchemy flask_cors matplotlib
```

#### 4️⃣ **Ejecutar el servidor**
```bash
python3 main.py
```

El backend se ejecutará en: **http://localhost:5000**

---

### 🔹 **2. Configurar y Ejecutar el Frontend (React)**

#### 1️⃣ **Ir a la carpeta del frontend en otra terminal**
```bash
cd examen_frontend
```

#### 2️⃣ **Instalar dependencias**
```bash
npm install
```

#### 3️⃣ **Ejecutar el servidor**
```bash
npm run dev
```

El frontend se ejecutará en: **http://localhost:5173**

---

## 📊 **Visualización del Gráfico**
El gráfico muestra la cantidad de créditos otorgados por cliente y el monto total. Se genera con **Matplotlib** y se muestra en el frontend.

---

HECHO POR: ANGEL DAVID GONZALEZ RAMOS

