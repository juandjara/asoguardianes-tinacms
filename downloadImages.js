import { download } from "https://deno.land/x/download/mod.ts"

const base = 'https://asoguardianes.com/images/upload'
const images = [
  '12_pencils.png',
  '2555359346910591628.jpg',
  'anna-samoylova-w55spmmopge-unsplash.jpg',
  'captura-de-pantalla-2021-05-22-a-las-16-58-00.png',
  'captura-de-pantalla-2021-05-22-a-las-17-22-18.png',
  'captura-de-pantalla-2021-05-22-a-las-17-35-16.png',
  'captura-de-pantalla-2021-06-14-a-las-16-13-45.png',
  'captura-de-pantalla-2021-06-14-a-las-16-21-56.png',
  'captura-de-pantalla-2021-06-14-a-las-16-22-18.png',
  'captura-de-pantalla-2021-06-14-a-las-17-00-47.png',
  'emmanuel-nklivbi2mvs-unsplash.jpg',
  'jo-szczepanska-9okgevjitkk-unsplash.jpg',
  'mark-autumns-qpq5x8bd0aw-unsplash.jpg',
  'rol-ian-gonzalez-ovxmtsmejqo-unsplash.jpg',
  'ryan-wallace-0dwcufqqoku-unsplash.jpg',
  'screenshot_2021-05-22-guardianes-del-rol-1.png',
  'screenshot_2021-05-22-guardianes-del-rol-2.png',
  'screenshot_2021-05-22-guardianes-del-rol-3.png',
  'screenshot_2021-05-22-guardianes-del-rol-4.png',
  'screenshot_2021-05-22-guardianes-del-rol-5.png',
  'screenshot_2021-05-22-guardianes-del-rol.png ',
]

for (const img of images) {
  const f = await download(`${base}/${img}`, {
    file: img,
    dir: './download'
  })
  console.log(f)
}