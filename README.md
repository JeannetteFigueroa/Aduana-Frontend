# Sistema Integrado de Gestión Fronteriza – Los Libertadores

## Descripción del Proyecto

Este proyecto corresponde al desarrollo de un prototipo frontend para la modernización del proceso de control fronterizo en el Complejo Los Libertadores.

La solución busca centralizar y digitalizar procesos asociados a:

* Control de viajeros.
* Declaraciones SAG.
* Validaciones y permisos.
* Gestión de alertas.
* Reportes operacionales.
* Control administrativo.

El proyecto fue desarrollado como parte de la asignatura **Ingeniería de Software** de la carrera **Ingeniería en Informática** durante el tercer semestre.

**Profesor:** Federico Lohse

**Integrantes:**

* Jeannette Figueroa
* Marco Carrasco

**Herramientas utilizadas:**

* React 19
* TypeScript
* Vite
* Tailwind CSS
* TanStack Router / TanStack Start
* ShadCN UI

---

# Estado Actual del Proyecto

Esta versión corresponde a un **prototipo frontend funcional**.

Actualmente no existe conexión con backend ni bases de datos reales.

Toda la información mostrada corresponde a simulaciones visuales orientadas a validar la experiencia de usuario y el diseño del sistema.

---

# Instalación Local

## Requisitos Previos

* Node.js 20 o superior
* npm o bun

Verificar instalación:

```bash
node -v
npm -v
```

## 1. Clonar o descargar el proyecto

```bash
git clone <repositorio>
```

## 2. Instalar dependencias

```bash
npm install
```

## 3. Ejecutar en modo desarrollo

```bash
npm run dev
```

Acceder a:

```text
http://localhost:3000
```

---

# Despliegue en Vercel (Paso a Paso)

Este proyecto está configurado para desplegarse en **Vercel** usando el preset oficial de **Nitro**.

## Opción A: Deploy desde la CLI de Vercel

### Paso 1: Instalar Vercel CLI

```bash
npm i -g vercel
```

### Paso 2: Login en Vercel

```bash
vercel login
```

### Paso 3: Compilar el proyecto

Desde la raíz del proyecto ejecutar:

```bash
npm run build
```

Esto generará la carpeta `.vercel/output/` con todo listo para producción (función serverless + archivos estáticos).

### Paso 4: Deploy

```bash
vercel --prebuilt
```

Vercel detectará automáticamente la carpeta `.vercel/output/` y publicará la aplicación.

---

## Opción B: Deploy conectando GitHub/GitLab/Bitbucket

### Paso 1: Subir el proyecto a un repositorio Git

```bash
git init
git add .
git commit -m "Primer commit"
git remote add origin <URL_DEL_REPO>
git push -u origin main
```

### Paso 2: Importar en Vercel

1. Ir a [vercel.com/new](https://vercel.com/new)
2. Seleccionar el repositorio recién creado
3. Vercel detectará automáticamente que es un proyecto **TanStack Start + Nitro**
4. Dejar los valores por defecto:
   * **Framework Preset:** Detectará automáticamente Vite/Nitro
   * **Build Command:** `npm run build`
   * **Output Directory:** `.vercel/output` (detectado automáticamente)
5. Clic en **Deploy**

### Paso 3: Configurar variables de entorno (si aplica)

Si más adelante agregas backend real (Java microservicios + MySQL), configura las URLs en:

**Vercel Dashboard → Tu proyecto → Settings → Environment Variables**

Ejemplo:

| Variable | Valor (desarrollo) |
|----------|-------------------|
| `VITE_API_URL` | `http://localhost:8081/api` |

> **Nota:** Las variables que empiecen con `VITE_` son accesibles desde el frontend. Las que NO lleven `VITE_` (por ejemplo `DATABASE_URL`, `JWT_SECRET`) solo estarán disponibles en el servidor y nunca llegarán al navegador.

---

## Estructura del Build para Vercel

Después de ejecutar `npm run build`, se genera:

```
.vercel/output/
├── config.json          # Configuración de Vercel Build Output API
├── functions/
│   └── __server.func/   # Función serverless (SSR + API routes)
├── static/              # Assets estáticos (JS, CSS, imágenes)
└── nitro.json           # Metadata del build
```

No necesitas modificar nada manualmente dentro de `.vercel/output/`.

---

# Tecnologías Utilizadas

| Tecnología         | Uso                             |
| ------------------ | ------------------------------- |
| React 19           | Interfaz de usuario             |
| TypeScript         | Tipado estático                 |
| Vite               | Bundler y entorno de desarrollo |
| Tailwind CSS       | Estilos                         |
| TanStack Start     | Framework fullstack (SSR + rutas)|
| TanStack Router    | Enrutamiento tipado             |
| Nitro              | Motor serverless para deploy     |
| ShadCN UI          | Componentes visuales            |
| Recharts           | Gráficos y estadísticas         |

---

# Consideraciones para Futuras Integraciones

Este proyecto corresponde a una versión de demostración académica.

Las futuras etapas consideran:

* **Backend:** Arquitectura de microservicios en Java (Spring Boot)
* **Base de datos:** MySQL (via XAMPP en desarrollo, RDS/Cloud SQL en producción)
* **Autenticación real:** JWT o OAuth2
* **APIs REST:** Documentación Swagger/OpenAPI
* **Comunicación frontend-backend:** Reemplazar simulaciones (`@backend` en comentarios) por llamadas HTTP reales

Los puntos de integración están marcados en el código con el comentario `// @backend` para facilitar la migración.

---

# Créditos

Proyecto desarrollado por:

**Jeannette Figueroa**

**Marco Carrasco**

Carrera: Ingeniería en Informática

Asignatura: Ingeniería de Software

Profesor: Federico Lohse
