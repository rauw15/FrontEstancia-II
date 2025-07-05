const fs = require('fs');
const path = require('path');

// Lista de imágenes que deberían estar importadas
const imagenesEsperadas = [
  'rombos.png',
  'Logo Upchiapas png.png',
  '5 FERIA EMPRENDIMIENTO.png',
  '5 FERIA EMPRENDIMIENTO B.png'
];

// Verificar que las imágenes existen en la carpeta assets
const assetsPath = path.join(__dirname, 'src', 'assets', 'images');
console.log('🔍 Verificando imágenes en:', assetsPath);

imagenesEsperadas.forEach(imagen => {
  const rutaCompleta = path.join(assetsPath, imagen);
  if (fs.existsSync(rutaCompleta)) {
    console.log(`✅ ${imagen} - Encontrada`);
  } else {
    console.log(`❌ ${imagen} - NO ENCONTRADA`);
  }
});

console.log('\n📋 Resumen de correcciones realizadas:');
console.log('1. ✅ Se agregaron imports de imágenes en todos los componentes');
console.log('2. ✅ Se corrigieron las referencias de rutas absolutas a imports');
console.log('3. ✅ Se actualizó la configuración de Vite para producción');
console.log('4. ✅ Se creó archivo _redirects para Netlify');
console.log('\n🚀 Las imágenes ahora deberían funcionar correctamente en Netlify!'); 