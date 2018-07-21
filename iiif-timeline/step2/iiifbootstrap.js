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

document.addEventListener('cdm-custom-page:ready', function(e) {
    if (document.location.pathname.endsWith('timeline')) {

        let createCollectionManifest = function() {
            return {
                '@context' : 'http://iiif.io/api/presentation/2/context.json',
                '@id' : 'https://cdm15717.contentdm.oclc.org/change/this/to/the/path/this/gets/saved.json',
                '@type' : 'sc:Collection',
                'label' : 'Timeline Demo',
                'description' : 'Collection from Timeline Demo',
                'attribution' : 'This collection of images may be printed or downloaded by individuals, schools or libraries for study, research or classroom teaching without permission. For other uses contact  visualcollections@indianahistory.org. Use must be accompanied with the attribution, "Indiana Historical Society".',
                'members' : []
            };
        }

        let createMember = function(record) {
            return {
                '@id' : 'https://cdm15717.contentdm.oclc.org/digital/iiif-info' + record.collection + '/' + record.pointer + '/manifest.json',
                '@type' : 'sc:Manifest',
                'label' : record.title
            };
        };

        ScriptLoader('https://cdnjs.cloudflare.com/ajax/libs/axios/0.18.0/axios.min.js', function() {
            axios.get('https://cdm15717.contentdm.oclc.org/digital/bl/dmwebservices/index.php?q=dmQuery/p15717coll1/0/title!demo!rights/demo/100/1/0/0/0/0/json')
            .then(function(response) {
                let collectionManifest = createCollectionManifest();
                response.data.records.forEach(function(record) {
                    collectionManifest.members.push(createMember(record));
                });
            });
        });
    }
});
