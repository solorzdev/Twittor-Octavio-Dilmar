
function actualizaCacheDinamico(dynamicCache, req, res){
    //Si encontró el recurso
    if(res.ok){
        //Si encontró sobre el cache dynamicCache
        return caches.open(dynamicCache).then(cache=>{
            //Manda a la cache lo solicitado y lo respondido
            cache.put(req, res.clone());
            //y retorna la respuseta y la clona
            return res.clone();
        })
    }else{
        //Si no lo encobtró retorna la respuesta
        return res;
    }

}
