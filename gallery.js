(() => {
  'use strict';
  // Cada ficha comparte estructura y comportamiento. Las propuestas no son un menú disponible.
  const works = [
    { id:'materia', number:'01', title:'Materia', category:'ESTUDIO DE COLOR', caption:'Capas, pigmentos y una nueva forma de mirar lo cotidiano.', lead:'El color no solo se mira. También despierta el apetito.', story:'Un estudio sobre las capas: láminas vegetales que recuerdan pétalos, trazos de color profundo y una superficie clara como fondo. La composición explora cómo un gesto sencillo puede convertirse en el centro de la mesa.', language:'Capas orgánicas · Rojo profundo · Transparencias', ingredients:'Exploración conceptual con betabeles y una base cremosa.', alt:'Platillo conceptual de láminas rojas y doradas de betabel sobre un plato de cerámica clara.' },
    { id:'contraste', number:'02', title:'Contraste', category:'ESTUDIO DE LUZ', caption:'Lo suave y lo crujiente. La sombra y un destello dorado.', lead:'A veces, una idea se entiende mejor por sus contrastes.', story:'Un volumen dorado, una curva ligera y un trazo verde. Esta composición imagina un diálogo entre texturas y entre la calidez del plato y la profundidad de su entorno. Como la luz de una sala, cada elemento dirige la mirada.', language:'Claroscuro · Formas curvas · Tonos ámbar', ingredients:'Exploración conceptual con calabaza asada, hierbas y un elemento crujiente.', alt:'Platillo conceptual de calabaza dorada con una pieza crujiente curva y pequeños trazos verdes.' },
    { id:'memoria', number:'03', title:'Memoria', category:'ESTUDIO DE LA FORMA', caption:'Un último gesto de cacao. Una conversación que se queda.', lead:'El final de la cena puede ser el principio de un recuerdo.', story:'Cintas de chocolate que se elevan como una pequeña escultura, una nota de fruta y un contrapunto claro. Este estudio imagina la sobremesa como el último acto de la experiencia: algo para saborear despacio y seguir conversando.', language:'Volumen escultórico · Curvas · Profundidad', ingredients:'Exploración conceptual con cacao, frutos rojos y crema.', alt:'Postre conceptual con cintas escultóricas de chocolate, frutos rojos y una porción de crema.' }
  ];
  const gallery = document.getElementById('dish-gallery');
  const template = document.getElementById('dish-card-template');
  const fragment = document.createDocumentFragment();
  works.forEach(work => {
    const card = template.content.cloneNode(true);
    card.querySelector('.dish-index').textContent = `N.º ${work.number}`;
    card.querySelector('.dish-category').textContent = work.category;
    card.querySelector('h3').textContent = work.title;
    card.querySelector('.dish-caption').textContent = work.caption;
    const img = card.querySelector('img'); img.src = `assets/${work.id}.webp`; img.alt = work.alt;
    const button = card.querySelector('button'); button.setAttribute('aria-label',`Descubrir ${work.title}, platillo conceptual`);
    button.addEventListener('click', () => {
      const image = document.getElementById('dish-detail-image'); image.src = img.src; image.alt = work.alt;
      document.getElementById('dish-title').textContent = work.title;
      document.getElementById('dish-detail-category').textContent = `ESTUDIO ${work.number} / ${work.category}`;
      document.getElementById('dish-detail-lead').textContent = work.lead;
      document.getElementById('dish-detail-story').textContent = work.story;
      document.getElementById('dish-detail-language').textContent = work.language;
      document.getElementById('dish-detail-ingredients').textContent = work.ingredients;
    });
    fragment.append(card);
  });
  gallery.append(fragment);
})();
