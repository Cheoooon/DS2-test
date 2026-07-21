# Reglas de Estilo y Arquitectura

## Reglas de Estilo Obligatorias

- **Tipado Estricto**: Prohibido el uso de `any`. Todo debe estar explícitamente tipado.
- **Convenciones de Nombres**:
  - Variables/Funciones: `camelCase`.
  - Clases/Modelos/Controladores: `PascalCase`.
  - Campos Base de Datos (SQLite): `snake_case`.

## Reglas Arquitectónicas (MVC)

- **Modelos**: Encargados exclusivamente de ejecutar queries SQL. No contienen lógica de negocio compleja.
- **Controladores**: Manejan la lógica de negocio, procesan la entrada del usuario y deciden la respuesta de Express.
- **Vistas**: Exclusivamente para renderizado de plantillas (HBS).

## Comandos Frecuentes

- Desarrollo: `pnpm run dev`
- Compilación: `pnpm run build`
- Producción: `pnpm start`
