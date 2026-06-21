# Cambios realizados y pruebas

## Cambios principales

- Corregido el bucle de redirección entre `/` y `/viajero`:
  - `src/lib/auth-context.tsx` ahora hidrata la sesión desde `localStorage` y expone `isLoading`.
  - `src/components/protected-route.tsx` muestra carga mientras se verifica la sesión y redirige solo cuando corresponde.
  - `src/routes/admin.tsx` y `src/routes/viajero.tsx` usan `ProtectedRoute` por rol.

- Corregido el login de viajero/admin:
  - `src/routes/index.tsx` almacena la sesión en el contexto antes de redirigir.
  - Si se intenta entrar como operador con una cuenta que no es `ADMIN`, se limpia la sesión y se muestra error.

- Corregido el registro de viajero:
  - `src/routes/registro.tsx` envía `nombres` y `password`, como espera `msauth`.
  - `src/lib/auth.ts` soporta compatibilidad con `nombre`/`clave` y los envía al backend como `nombres`/`password`.

- Corregido el RUT del viajero:
  - `msauth` ahora incluye `rut` en `GET /api/auth/me` desde `bd_auth.usuarios`.
  - `src/lib/auth.ts` conserva el RUT desde `/api/auth/me`, respuesta de login/registro o sesión previa.
  - `src/routes/viajero.tsx` muestra el RUT en la tarjeta de cuenta.

- Corregido el guardado de datos del viajero:
  - `src/routes/viajero.tsx` usa `GET /api/viajeros/rut/{rut}`.
  - Si el viajero existe, ejecuta `PUT /api/viajeros/{id}`.
  - Si no existe, ejecuta `POST /api/viajeros`.

- Corregida la dirección del cruce:
  - La ruta principal ahora muestra `Santiago, CL → Mendoza, AR`.

- Corregido el cambio de contraseña:
  - `src/lib/auth.ts` agrega `changePassword(oldPassword, newPassword)`.
  - `src/routes/viajero.tsx` y `src/routes/admin.configuracion.tsx` llaman a `POST /api/auth/change-password` con `{ oldPassword, newPassword }`.
  - El frontend mantiene la confirmación de nueva contraseña, pero solo envía una vez la nueva contraseña al backend.

- Modo oscuro:
  - `src/lib/theme-context.tsx` y `src/components/theme-toggle.tsx` permiten alternar modo claro/oscuro.
  - La preferencia se guarda en `localStorage` y se aplica antes de pintar la UI.

- API base:
  - `src/lib/api.ts` recorta espacios en `VITE_API_URL` y en los paths para evitar URLs mal formadas.

- Dependencias:
  - `package-lock.json` actualizado para incluir `jsqr`, requerido por `src/routes/admin.scan.tsx`.

## Pruebas recomendadas

### 1. Registro de viajero

1. Abrir `/registro`.
2. Crear una cuenta con:
   - RUT válido.
   - Nombres y apellidos.
   - Email válido.
   - Contraseña de al menos 8 caracteres.
3. Confirmar que no aparece error `400`.
4. Confirmar que redirige a `/viajero`.
5. Confirmar que en cuenta se muestra el RUT.

### 2. Login de viajero

1. Abrir `/`.
2. Seleccionar `Viajero`.
3. Ingresar email y contraseña de una cuenta `VIAJERO`.
4. Confirmar redirección a `/viajero`.
5. Confirmar que no hay bucle entre `/` y `/viajero`.
6. Ir a `Cuenta` y confirmar que aparece RUT, email y menú de perfil/seguridad.

### 3. Cambio de contraseña de viajero

1. En `/viajero`, ir a `Cuenta` → `Seguridad`.
2. Ingresar contraseña actual.
3. Ingresar nueva contraseña y repetirla.
4. Guardar.
5. Confirmar que el frontend llama a `POST /api/auth/change-password`.
6. Confirmar que el payload enviado es:
   ```json
   {
     "oldPassword": "...",
     "newPassword": "..."
   }
   ```
7. Volver a login y confirmar que la nueva contraseña funciona.

### 4. Login de administrador

1. Abrir `/`.
2. Seleccionar `Operador`.
3. Ingresar un correo `@aduana.cl` con rol `ADMIN` en el backend.
4. Confirmar redirección a `/admin`.
5. Confirmar que el dashboard de administrador carga sin redirigir a `/viajero`.
6. Confirmar que una cuenta `VIAJERO` no puede entrar a `/admin`.

### 5. Cambio de contraseña de administrador

1. En `/admin/configuracion`, ir a `Seguridad`.
2. Ingresar contraseña actual.
3. Ingresar nueva contraseña y repetirla.
4. Guardar.
5. Confirmar que el frontend llama a `POST /api/auth/change-password`.
6. Volver a login como operador y confirmar que la nueva contraseña funciona.

### 6. Guardado de datos del viajero

1. En `/viajero`, ir a `Datos personales`.
2. Completar RUT, nombres, apellidos y datos obligatorios.
3. Guardar.
4. Confirmar que primero se consulta `GET /api/viajeros/rut/{rut}`.
5. Si no existe, confirmar `POST /api/viajeros`.
6. Si ya existe, confirmar `PUT /api/viajeros/{id}`.
7. Recargar y confirmar que los datos persisten.

### 7. Modo oscuro

1. Alternar el botón de modo oscuro en login, admin y viajero.
2. Recargar la página.
3. Confirmar que la preferencia se mantiene.

### 8. Build y lint

Ejecutar:

```bash
npm run lint
npm run build
```

Resultado esperado:
- `lint`: 0 errores.
- `build`: finaliza correctamente.
