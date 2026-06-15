# Integración realizada

Este proyecto usa `therapy-connect-sessions-sidebar` como base.

Se integraron los bounded contexts:

- `src/app/emergency-management`
- `src/app/session-coordination-and-scheduling`
- ajustes compartidos del sidebar y navegación en `src/app/shared`

`daos-learning-center-v2520` se usó solo como referencia de estilo y estructura. No se agregaron librerías nuevas ni dependencias nuevas.

Rutas principales:

- `/app/scheduling/eventos`
- `/app/scheduling/recordatorios`
- `/app/emergency/emergencies`

Comandos:

```bash
npm install
npm run api
npm start
```

# Cambio aplicado: Session & Live Interaction

Este ZIP mantiene el menú inicial y el menú lateral del proyecto `frontend-open` con la misma estructura visual del proyecto base.

Cambios principales:
- Se agregó un nuevo botón **Sesiones** en el menú lateral para los perfiles principales.
- Las pantallas agregadas ahora se abren desde `/app/sessions`.
- Cuando el usuario está en historial, detalle, sesiones para padres o sesión en vivo, el botón **Sesiones** queda marcado como seleccionado.
- La sesión en vivo ahora se abre dentro del layout principal en `/app/sessions/live`, por eso mantiene el menú izquierdo visible.
- Las vistas Dashboard/Inicio vuelven a conservar la pantalla simple del proyecto base para no mezclar el contenido de sesiones con el dashboard.
- Se conservaron las vistas agregadas: historial de sesiones, detalle de sesión, sesión en vivo y pantalla de sesiones asignadas para padres.
- Se mantienen los datos simples en `server/db.json` y `server/routes.json` para `therapySessions` y `sessionChecklist`.

