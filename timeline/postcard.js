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
            ScriptLoader('https://cdnjs.cloudflare.com/ajax/libs/axios/0.18.0/axios.min.js', function() {
                ScriptLoader('https://cdm15717.contentdm.oclc.org/customizations/global/pages/collectionmanifest.js', function() {
                    ScriptLoader('https://cdm15717.contentdm.oclc.org/customizations/global/pages/convertjson.js', function() {
                        document.cdmTimeline.initCollectionManifest('https://cdm15717.contentdm.oclc.org/digital/bl/dmwebservices/index.php?q=dmQuery/p15717coll1/0/title!demo!rights/demo/100/1/0/0/0/0/json')
                        .then(function(response) {
                            response.data.records.forEach(function(record) {
                                const member = {
                                    '@id' : 'https://cdm15717.contentdm.oclc.org/digital/iiif-info' + record.collection + '/' + record.pointer + '/manifest.json',
                                    '@type' : 'sc:Manifest',
                                    'label' : record.title
                                };
                                document.cdmTimeline.collectionManifest.members.push(member)
                            });
                            let collectionManifestObject = document.cdmTimeline.collectionManifest;
    
                            let promises = [];
                            collectionManifestObject.members.forEach(function(element) {
                                promises.push(document.convertJson.convert(element));
                            });
    
                            axios.all(promises).then(function(results){
                                results.forEach(function(response){
                                    let eventData = document.convertJson.convertToEvent(response.data);
                                    document.convertJson.timelineJson.events.push(eventData);
                                });
                                let fileref = document.createElement("link");
                                fileref.rel = "stylesheet";
                                fileref.type = "text/css";
                                fileref.href = "https://cdn.knightlab.com/libs/timeline3/latest/css/timeline.css";
                                document.getElementsByTagName("head")[0].appendChild(fileref)
                                window.timeline = new TL.Timeline('timeline-embed', document.convertJson.timelineJson);
                            });
                        }).catch(function(error) {
                            console.log(error);
                        });
    
                    });
                });
            })
        });
    }
});