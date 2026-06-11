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
* TanStack Router
* ShadCN UI
* Lovable (IA de apoyo para generación de interfaz y componentes)

---

# Estado Actual del Proyecto

Esta versión corresponde a un **prototipo frontend funcional**.

Actualmente no existe conexión con backend ni bases de datos reales.

Toda la información mostrada corresponde a simulaciones visuales orientadas a validar la experiencia de usuario y el diseño del sistema.

---

# Funcionalidades Simuladas

## Dashboard Administrativo

Permite visualizar indicadores operacionales simulados:

* Flujo de viajeros.
* Declaraciones procesadas.
* Alertas activas.
* Estado general del sistema.

---

## Gestión de Viajeros

Simulación de:

* Registro de ingreso.
* Consulta de información.
* Visualización de antecedentes del viajero.

---

## Declaración SAG

Simulación del proceso de declaración de productos regulados por el Servicio Agrícola y Ganadero.

Permite:

* Completar formularios.
* Visualizar estados.
* Confirmar envío de declaración.

---

## Validaciones

Simulación de:

* Validación documental.
* Revisión de antecedentes.
* Estados de aprobación o rechazo.

---

## Permisos Especiales

Simulación de solicitudes y autorizaciones para ingreso o tránsito de viajeros.

---

## Alertas Operacionales

Visualización de alertas simuladas para:

* Documentación pendiente.
* Revisiones manuales.
* Observaciones de seguridad.

---

## Reportes

Panel visual con gráficos e indicadores demostrativos para mostrar el potencial módulo de análisis y estadísticas.

---

# Instalación

## Requisitos Previos

Instalar:

* Node.js 20 o superior
* npm

Verificar instalación:

```bash
node -v
npm -v
```

---

# Ejecución Local

## 1. Clonar o descargar el proyecto

```bash
git clone <repositorio>
```

o descargar el archivo ZIP y descomprimirlo.

---

## 2. Abrir el proyecto

Abrir la carpeta raíz del proyecto en Visual Studio Code.

---

## 3. Instalar dependencias

Desde la terminal ejecutar:

```bash
npm install
```

Este comando instalará automáticamente todas las dependencias necesarias.

---

## 4. Ejecutar el proyecto

```bash
npm run dev
```

---

## 5. Abrir en navegador

Una vez iniciado Vite, acceder a:

```text
http://localhost:3000
```

o la URL indicada por la consola.

---

# Tecnologías Utilizadas

| Tecnología      | Uso                       |
| --------------- | ------------------------- |
| React 19        | Desarrollo de interfaz    |
| TypeScript      | Tipado del proyecto       |
| Vite            | Entorno de desarrollo     |
| Tailwind CSS    | Estilos                   |
| ShadCN UI       | Componentes visuales      |
| TanStack Router | Navegación                |
| Recharts        | Visualización de gráficos |
| Lovable         | Asistencia mediante IA    |

---

# Consideraciones

Este proyecto corresponde a una versión de demostración académica.

Las funcionalidades observadas actualmente son simulaciones frontend diseñadas para representar el comportamiento esperado del sistema final.

Las futuras etapas consideran:

* Implementación de arquitectura de microservicios.
* Integración con bases de datos.
* Autenticación y autorización.
* APIs REST.
* Documentación Swagger/OpenAPI.
* Despliegue en infraestructura cloud.

---

# Créditos

Proyecto desarrollado por:

**Jeannette Figueroa**

**Marco Carrasco**

Carrera: Ingeniería en Informática

Asignatura: Ingeniería de Software

Profesor: Federico Lohse

Con apoyo de herramientas de Inteligencia Artificial para prototipado y asistencia de desarrollo, incluyendo Lovable.
