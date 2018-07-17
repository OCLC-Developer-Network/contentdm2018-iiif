function ScriptLoader(url, callback){
    var script = document.createElement("script");
    script.type = "text/javascript";
    if (script.readyState){ //IE
        script.onreadystatechange = function() {
            if (script.readyState == "complete") {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else { //Others
        script.onload = function(){
            callback();
        };
    }
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}


document.addEventListener('cdm-collection-landing-page:ready', function(e){
    if (document.location.pathname.endsWith('p15717coll1')) {
        ScriptLoader('https://cdm15717.contentdm.oclc.org/customizations/global/pages/collection.js', function(){
            document.cdmTimeline.createCollectionManifest();
        });
    }
});

document.addEventListener('cdm-custom-page:ready', function(e) {
    if (document.location.pathname.endsWith('timeline')) {
        ScriptLoader('https://cdn.knightlab.com/libs/timeline3/latest/js/timeline.js', function(){
        });
    }
});