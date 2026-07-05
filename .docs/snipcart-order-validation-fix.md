# Snipcart Order Validation Fix

## Diagnóstico

**Error**: "URL of some products could not be reached" durante el checkout.

**Causa raíz**: Snipcart valida cada producto haciendo un HTTP GET al `data-item-url` antes de procesar la orden. Como el sitio es un **SPA React**, el servidor de Vercel siempre devuelve `index.html` (shell vacío, sin JS ejecutado). El crawler de Snipcart **no ejecuta JavaScript** — solo parsea el HTML estático — así que no encuentra los elementos `snipcart-add-item` con los `data-item-*` esperados.

**Referencia**: [Snipcart Order Validation docs](https://docs.snipcart.com/v3/setup/order-validation)

> "For users with a single-page website, the data-item-url field should only be filled with your root domain name, such as www.example.com, or with a simple slash bar `/`."

Pero incluso con `/`, el problema del shell vacío persiste. La solución correcta para SPAs es usar el **JSON crawler** de Snipcart.

---

## Plan Frontend

**Archivo**: `src/commons/AddCartButton.jsx`

### Cambio único

Cambiar `data-item-url` para que apunte al backend en vez del frontend SPA:

```diff
- data-item-url={`https://www.minc-cg.com/market/${product.id}`}
+ data-item-url={`${import.meta.env.VITE_API_URL}/products/${product.id}`}
```

Esto hace que Snipcart pegue a `https://minc-cg-back.onrender.com/products/:id`, que devuelve `Content-Type: application/json` — activando automáticamente el JSON crawler.

### Archivos afectados

| Archivo | Rol |
|---------|-----|
| `src/commons/AddCartButton.jsx:15` | Único archivo a modificar |
| `src/commons/ItemCard.jsx:23` | Usa `AddCartButton` en listado de market |
| `src/commons/ProductPage.jsx:114,130` | Usa `AddCartButton` en página de detalle |

### Nota

El componente `ProductPage.jsx` ya usa `import.meta.env.VITE_API_URL` (línea 13), así que este cambio es consistente con el resto del código. `Market.jsx:18` hardcodea la URL — está fuera del scope de este fix pero debería unificarse eventualmente.

---

## Plan Backend

**Repositorio**: `minc-cg-back` (https://minc-cg-back.onrender.com)

### Objetivo

Asegurar que `GET /products/:id` devuelva una respuesta compatible con el [Snipcart JSON crawler](https://docs.snipcart.com/v3/setup/order-validation#json-crawler).

### Schema requerido por Snipcart

```json
{
  "id": "string (requerido, debe coincidir con data-item-id)",
  "price": "number (requerido, debe coincidir con data-item-price)",
  "url": "string (requerido, URL canónica del producto)",
  "customFields": "array (requerido, puede ser vacío)"
}
```

### Respuesta esperada (ejemplo)

```json
{
  "id": "123",
  "title": "Silver Ring",
  "price": 59.99,
  "image": "https://res.cloudinary.com/daynclfo8/image/upload/...",
  "size": "Medium",
  "sku": "RNG-001",
  "available": true,
  "url": "https://www.minc-cg.com/market/123",
  "customFields": []
}
```

### Cambios necesarios

1. **Agregar campo `url`** a la respuesta del endpoint `GET /products/:id`:
   ```
   url: "https://www.minc-cg.com/market/${product.id}"
   ```

2. **Agregar campo `customFields`** (array vacío si no hay variantes):
   ```
   customFields: []
   ```

3. **Verificar tipos**:
   - `id` debe ser string (no number)
   - `price` debe ser number (no string)
   - `Content-Type` del response debe ser `application/json`

### Con variantes (opcional)

Si el producto tiene talles u opciones, popular `customFields`:

```json
"customFields": [
  {
    "name": "Size",
    "options": "Small|Medium|Large",
    "type": "dropdown"
  }
]
```

### Endpoints existentes (referencia)

| Método | Ruta | Uso en frontend |
|--------|------|-----------------|
| GET | `/products` | `Market.jsx` (listado) |
| GET | `/products/:id` | `ProductPage.jsx` (detalle) |
| GET | `/products/images/:id` | `ProductPage.jsx` (galería) |

---

## Verificación

1. Descomentar/asegurar `data-item-url` en `AddCartButton.jsx`
2. Verificar que el backend devuelva `url` y `customFields` en `GET /products/:id`
3. Configurar dominios en [Snipcart Dashboard → Domains & URLs](https://app.snipcart.com/dashboard/account/domains):
   - Default domain: `minc-cg.com`
   - Subdomains: `www.minc-cg.com`, `minc-cg-back.onrender.com`
4. Probar checkout en modo test
5. Revisar developer console por errores del crawler (usará el header `X-Snipcart-Purpose: Crawling`)
