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
