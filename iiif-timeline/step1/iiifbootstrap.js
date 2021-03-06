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

document.addEventListener('cdm-custom-page:ready', function(event) {
    if (event.detail.filename.endsWith('timeline')) {
        ScriptLoader('https://cdnjs.cloudflare.com/ajax/libs/axios/0.18.0/axios.min.js', function() {
            document.getElementById('timeline-embed').innerHTML = "<h1>Hello World!</h1>"
        });
    }
});
