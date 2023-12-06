const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';
const INMUTABLE_CACHE = 'inmutable-v1';

const APP_SHELL =[
    '/',
    'index.html',
    'css/style.css',
    'img/favicon.ico',
    'img/avatars/spiderman.jpg',
    'img/avatars/hulk.jpg',
    'img/ironman.jpg',
    'img/thor.jpg',
    'img/wolverine.jpg',
    'js/soro.js',

];


const APP_SHELL_INMUTABLE =[
    'https://fonts.googleapis.com/css?family=Quicksand:300,400',
    'https://fonts.googleapis.com/css?family=Lato:400,300',

    'css/animate.css',
    'js/lib/jquery.js',
    'css/all.css'

];


self.addEventListener('install', e =>{

    const cachesStatic = caches.open(STATIC_CACHE).then(cache=>{
        cache.addAll(APP_SHELL);
    });

    const cacheInmutable= cahces.open(INMUTABLE_CACHE).then(cache =>{
        cache.addAll(APP_SHELL_INMUTABLE);
    });

    e.waitUntil(Promise.all([cachesStatic, cacheInmutable]));

});


self.addEventListener('activate', e=>{

    const respuesta = caches.keys().then(keys=>{
        keys.forEach(key=>{
            if(key !== STATIC_CACHE && key.includes('static')){

            }
        });
    });

    e.waitUntil(respuesta);

});

self.addEventListener('fetch', e=>{
    //if(!e.request.url.includes('kaspersky')){
        const respuesta = caches.match(e.request).then(res=>{
             //Si existe la respuesta entonces devuelve
        if(res){
            return res;
        }else{
            return fetch(e.request).then(newRes=>{
                return actualizaCacheDinamico(DYNAMIC_CACHE, e.request, newRes);
            });
        }

        });

        e.respondWith(respuesta);

    //}
});
