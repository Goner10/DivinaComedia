# La Divina Comedia — Sitio web 🍝🥩🥂

Proyecto web para el restaurante La Divina Comedia en la playa de la Malvarrosa (Valencia). Enfoque mobile-first con media queries para una experiencia responsive en tablets y escritorio.

## Caracteristicas 💡🧠

- Enfoque mobile-first.
- Responsive con breakpoints para tablet, desktop y pantallas grandes.
- Carrusel tactil con swipe nativo (iOS/Android), indicadores y auto-slide.
- Paginas: Inicio, Carta (ES/EN) y Reservas.
- Animaciones suaves y accesibilidad basica.
- Desplegado en Vercel.

## Tecnologias 🛠

- HTML5
- CSS3 (flex, media queries, scroll-snap)
- JavaScript (ES6) para interacciones y animaciones+

## Estructura del proyecto 📂

```
DivinaComedia/
  index.html         # Pagina de inicio
  carta.html         # Carta (ES)
  carta-en.html      # Carta (EN)
  reservas.html      # Reservas
  style.css          # Estilos globales
  scripts.js         # Logica UI (menu, carrusel, animaciones)
  img/               # Imagenes y assets estaticos
  favicon.ico        # Favicon
  CNAME              # Dominio personalizado (opcional para GitHub Pages)
```

## Imagenes 📷

### LAPTOP 💻
<img src="img/Captura de pantalla 2025-07-25 020618.png" alt="Home - Hero" width="800">



### TABLET ⌨
<img src="img/Captura de pantalla 2025-07-25 020316.png" alt="Galeria - Carrusel" width="600">


### MÓVIL 📲

<img src="img/inicio.png" alt="Galeria - Carrusel" width="600">
<img src="img/menuDesplegado.png" alt="Galeria - Carrusel" width="600">
<img src="img/gal.png" alt="Galeria - Carrusel" width="600">
<img src="img/inff.png" alt="Galeria - Carrusel" width="600">
<img src="img/mapi.png" alt="Galeria - Carrusel" width="600">
<img src="img/cartt.png" alt="Galeria - Carrusel" width="600">

## Uso en local

1. Descarga/clona el proyecto.
2. Abre `index.html` en el navegador.
3. Opcional (servidor estatico):
   - Node: `npx http-server .` o `npx serve .`
   - Python 3: `python -m http.server 8080`

## Despliegue 🚀

- GitHub Pages: publica el repo y configura Pages. Si usas dominio propio, ajusta `CNAME`.
- Alternativas: Netlify/Vercel/hosting estatico.

## Accesibilidad

- Etiquetas `alt` en imagenes.
- Contraste adecuado y tipografia legible.
- Controles con `aria-label` cuando aplica.

## Rendimiento

- Imagenes optimizadas.
- Animaciones con transformaciones/scroll-snap para mayor suavidad.
- Codigo ligero (sin frameworks pesados).

## SEO basico

- Titulos y meta etiquetas adecuadas.
- Uso de elementos semanticos.


## Licencia

Propiedad del restaurante La Divina Comedia. Uso sujeto a autorizacion.

## Capturas (placeholders)

Inserta tus imagenes en la carpeta `img/` y enlazalas asi:

```markdown
![Home - Hero](img/hero-restaurante.webp "Home - Hero")
![Galeria - Carrusel](img/terraza.webp "Galeria - Carrusel")
![Carta - Pizzas](img/pizza3.webp "Carta - Pizzas")
![Reservas](img/terraza_noche.webp "Reservas")
```

Si prefieres controlar el tamaño, puedes usar etiquetas HTML en el README:



Tambien puedes organizarlas en una cuadricula simple usando HTML:

```html
<p align="center">
  <img src="img/hero-restaurante.webp" alt="Home" width="420">
  <img src="img/terraza.webp" alt="Galeria" width="420">
</p>
<p align="center">
  <img src="img/pizza3.webp" alt="Carta" width="420">
  <img src="img/terraza_noche.webp" alt="Reservas" width="420">
</p>
```
