# Sistema Aduanero Inteligente para la Optimización del Control Fronterizo

## Descripción General

El presente proyecto corresponde al desarrollo de una plataforma de gestión aduanera basada en una arquitectura de microservicios, cuyo objetivo es optimizar los procesos de control fronterizo, reducir los cuellos de botella operacionales y mejorar la gestión de información asociada a viajeros, vehículos, permisos y validaciones de ingreso al país.

La solución busca digitalizar y centralizar procesos que tradicionalmente presentan retrasos debido a la duplicidad de registros, validaciones manuales y falta de integración entre organismos involucrados en los controles fronterizos.

El sistema permite gestionar información de viajeros, vehículos, funcionarios, permisos y validaciones provenientes de distintos organismos, manteniendo trazabilidad y facilitando la toma de decisiones durante el proceso de fiscalización.

---

# Información Académica

**Institución:** Duoc UC

**Carrera:** Ingeniería en Informática

**Asignatura:** Ingeniería de Software

**Profesor:** Federico Lohse

## Integrantes

* Jeannette Figueroa
* Marco Carrasco

---

# Objetivo del Proyecto

Desarrollar un sistema aduanero moderno basado en microservicios capaz de:

* Reducir los tiempos de atención en pasos fronterizos.
* Minimizar errores asociados al ingreso manual de información.
* Centralizar los procesos de validación.
* Facilitar la interoperabilidad entre organismos participantes.
* Mejorar la trazabilidad de viajeros, vehículos y mercancías.
* Reducir los cuellos de botella durante los procesos de control fronterizo.

---

# Arquitectura del Sistema

La solución fue diseñada utilizando una arquitectura de microservicios basada en Spring Cloud, permitiendo desacoplar los distintos dominios de negocio y facilitando el mantenimiento, escalabilidad y evolución del sistema.

## Arquitectura General

```text
Frontend (React + Vite)
          │
          ▼
     API Gateway
          │
          ▼
    Eureka Server
          │
 ┌────────┼────────┐
 │        │        │
 ▼        ▼        ▼

msauth
msusuarios
msviajeros
msaduana
mspdi
msalertas
mspermisos
msreportes
mssag
```

### Componentes Principales

#### API Gateway

Punto único de entrada para todas las solicitudes realizadas desde el frontend.

Responsabilidades:

* Enrutamiento de solicitudes.
* Gestión centralizada de acceso.
* Comunicación con microservicios internos.
* Seguridad y control de peticiones.

---

#### Eureka Server

Servidor de descubrimiento de servicios.

Responsabilidades:

* Registro automático de microservicios.
* Descubrimiento dinámico de servicios.
* Gestión de disponibilidad de instancias.

---

# Tecnologías Utilizadas

## Backend

* Java 21
* Spring Boot 3
* Spring Cloud
* Spring Security
* Spring Data JPA
* Spring Cloud OpenFeign
* Netflix Eureka
* API Gateway
* Maven
* Lombok

## Base de Datos

* MySQL
* XAMPP

## Frontend

* React
* Vite
* TypeScript
* Tailwind CSS
* Shadcn UI
* React Router

## Herramientas de Desarrollo

* Git
* GitHub
* Postman
* Cloudflare Tunnel
* Vercel

---

# Infraestructura de Desarrollo

Para simplificar el despliegue durante el desarrollo académico, se decidió utilizar una infraestructura híbrida:

## Backend

Los microservicios se ejecutan localmente utilizando Spring Boot.

La base de datos se ejecuta mediante:

* XAMPP
* MySQL

## Exposición de Servicios

Se utiliza Cloudflare Tunnel para exponer los servicios backend mediante URLs públicas seguras.

Esto permite que el frontend desplegado pueda consumir los servicios sin necesidad de desplegar los microservios en infraestructura cloud dedicada.

## Frontend

El frontend se encuentra desplegado mediante:

* Vercel

---

# Microservicios Implementados

## msauth

Responsable de la autenticación y autorización de usuarios.

### Funcionalidades

* Inicio de sesión.
* Gestión de usuarios.
* Gestión de roles.
* Control de acceso.
* Auditoría de accesos.

### Estado

✅ Implementado

---

## msusuarios

Responsable de la administración de funcionarios y usuarios internos del sistema.

### Funcionalidades

* Registro de funcionarios.
* Actualización de información.
* Administración de perfiles.

### Estado

✅ Implementado

---

## msviajeros

Responsable de la gestión de viajeros que ingresan o salen del país.

### Funcionalidades

* Registro de viajeros.
* Gestión documental.
* Registro de menores de edad.
* Consulta de información asociada.

### Estado

✅ Implementado

---

## msaduana

Responsable del control y administración de vehículos asociados a viajeros.

### Funcionalidades

* Registro de vehículos.
* Consulta de vehículos.
* Asociación de propietarios.
* Control de información vehicular.

### Estado

✅ Implementado

---

## mspdi

Responsable de realizar validaciones asociadas a antecedentes y controles migratorios.

### Funcionalidades

* Verificación de antecedentes.
* Validación de registros.
* Apoyo a fiscalizaciones.

### Estado

✅ Implementado

---

# Microservicios en Desarrollo

## msalertas

Responsable de la generación y administración de alertas operacionales.

### Funcionalidades Planificadas

* Alertas automáticas.
* Notificaciones.
* Gestión de incidencias.

### Estado

🚧 En desarrollo

---

## mspermisos

Responsable de administrar permisos especiales asociados a viajeros y operaciones aduaneras.

### Funcionalidades Planificadas

* Permisos especiales.
* Autorizaciones temporales.
* Validaciones administrativas.

### Estado

🚧 En desarrollo

---

## msreportes

Responsable de generar reportes operacionales y estadísticas del sistema.

### Funcionalidades Planificadas

* Reportes PDF.
* Indicadores de gestión.
* Estadísticas operacionales.

### Estado

🚧 En desarrollo

---

## mssag

Responsable de las validaciones relacionadas con controles sanitarios y fitosanitarios.

### Funcionalidades Planificadas

* Declaraciones SAG.
* Restricciones sanitarias.
* Control de productos agrícolas y pecuarios.

### Estado

🚧 En desarrollo

---

# Comunicación Entre Microservicios

El proyecto utiliza Spring Cloud OpenFeign para permitir la comunicación entre servicios.

## Relaciones Detectadas

### msviajeros → msauth

Objetivo:

* Validar usuarios autorizados.
* Consultar información asociada a autenticación.

---

### mspdi → msaduana

Objetivo:

* Consultar vehículos asociados a propietarios.
* Apoyar procesos de validación y fiscalización.

---

# Reglas de Negocio

## Gestión de Usuarios

* Solo usuarios autenticados pueden acceder al sistema.
* Cada usuario posee un rol determinado.
* Los permisos dependen del rol asignado.
* Toda acción relevante debe quedar registrada.

---

## Gestión de Viajeros

* Todo viajero debe contar con documentación válida.
* Debe existir trazabilidad de los registros realizados.
* Los datos deben mantenerse actualizados.

---

## Gestión de Vehículos

* Todo vehículo debe estar asociado a un propietario.
* La información debe ser validable desde otros organismos.
* Debe mantenerse historial de registros.

---

## Validaciones PDI

* Los viajeros pueden ser sometidos a validaciones de antecedentes.
* Los vehículos pueden ser objeto de verificaciones adicionales.
* Las observaciones deben quedar registradas.

---

## Controles Aduaneros

* Toda información ingresada debe ser validada.
* Debe evitarse la duplicidad de registros.
* Los procesos deben facilitar la interoperabilidad entre organismos.

---

## Controles SAG

* Determinados productos pueden requerir validaciones sanitarias.
* Las restricciones deben ser verificadas antes de autorizar el ingreso.

---

# Estructura del Proyecto

```text
aduana-backend/

├── api-gateway
├── eureka-server

├── msauth
├── msusuarios
├── msviajeros
├── msaduana
├── mspdi

├── msalertas
├── mspermisos
├── msreportes
├── mssag
```

---

# Ejecución del Proyecto

## Requisitos

* Java 21
* Maven
* MySQL
* XAMPP
* Git

## Pasos Generales

### 1. Iniciar Base de Datos

Levantar Apache y MySQL mediante XAMPP.

### 2. Ejecutar Eureka Server

```bash
mvn spring-boot:run
```

### 3. Ejecutar API Gateway

```bash
mvn spring-boot:run
```

### 4. Ejecutar Microservicios

```bash
mvn spring-boot:run
```

para cada microservicio.

### 5. Iniciar Cloudflare Tunnel

Configurar y ejecutar Cloudflare Tunnel para exponer los servicios localmente.

### 6. Ejecutar Frontend

```bash
npm install
npm run dev
```

---

# Repositorios

## Frontend

Repositorio:

https://github.com/JeannetteFigueroa/Aduana-Frontend

## Backend

Repositorio:

https://github.com/JeannetteFigueroa/aduana-backend

---

# Despliegue

## Frontend (Vercel)

URL:

https://aduana-frontend-wheat.vercel.app/

## Backend (Cloudflare Tunnel)

URL Base:

se debe usar el comando & "C:\Program Files (x86)\cloudflared\cloudflared.exe" tunnel --url http://localhost:8080 para acceder a la url

---

# Estado del Proyecto

Actualmente el sistema cuenta con:

* Arquitectura de microservicios implementada.
* API Gateway operativo.
* Eureka Server operativo.
* Comunicación entre servicios mediante OpenFeign.
* Frontend desplegado en Vercel.
* Backend ejecutado localmente.
* Base de datos MySQL mediante XAMPP.
* Exposición de servicios mediante Cloudflare Tunnel.

El proyecto continúa en desarrollo incorporando nuevos módulos y reglas de negocio asociadas al proceso aduanero.
