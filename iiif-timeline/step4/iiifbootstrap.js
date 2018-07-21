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

        /*
        * Helper functions
        */
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

        // Create a IIIF Collection Manifest member from a CONTENTdm dmQuery API item record
        let createMember = function(record) {
            return {
                '@id' : 'https://cdm15717.contentdm.oclc.org/digital/iiif-info' + record.collection + '/' + record.pointer + '/manifest.json',
                '@type' : 'sc:Manifest',
                'label' : record.title
            };
        };

        // Loop through IIIF item manifest metadata and return the value for the requested element label
        let getMetadata = function(metadataArray, label) {
            let elementValue = '';
            metadataArray.forEach(function(metadataElement) {
                if (metadataElement.label === label) {
                    elementValue = metadataElement.value;
                }
            })
            return elementValue;
        };

        // Convert a IIIF Item manifest to a TimelineJS event
        let convertToEvent = function(itemManifest) {
            return {
                'media' : {
                    'url' : updateIIIFImageUrl(itemManifest.sequences[0].canvases[0].images[0].resource['@id'], 'size', '725,'),
                    'credit' : itemManifest.attribution['@value']
                },
                'start_date' : {
                    'year' : new Date(getMetadata(itemManifest.metadata, 'Date')).getFullYear()
                },
                'text' : {
                    'headline' : getMetadata(itemManifest.metadata, 'Title'),
                    'text' : getMetadata(itemManifest.metadata, "Description")
                }
            }
        };

        let updateIIIFImageUrl = function(iiifUrl, part, newValue) {
            let url = new URL(iiifUrl);
            let urlParts = url.pathname.split('/');
            if (part === 'region') {
                urlParts[urlParts.length - 4] = newValue;
            } else if (part === 'size') {
                urlParts[urlParts.length - 3] = newValue;
            } else if (part === 'rotation') {
                urlParts[urlParts.length - 2] = newValue;
            } else if (part === 'filename') {
                urlParts[urlParts.length - 1] = newValue;
            }
            url.pathname = urlParts.join('/');
            return url.href;
        }

        /*
        * Main execution
        */
        ScriptLoader('https://cdnjs.cloudflare.com/ajax/libs/axios/0.18.0/axios.min.js', function() {
            ScriptLoader('https://cdn.knightlab.com/libs/timeline3/latest/js/timeline.js', function(){
                let cssFileRef = document.createElement("link");
                cssFileRef.rel = "stylesheet";
                cssFileRef.type = "text/css";
                cssFileRef.href = "https://cdn.knightlab.com/libs/timeline3/latest/css/timeline.css";
                document.getElementsByTagName("head")[0].appendChild(cssFileRef)
                
                axios.get('https://cdm15717.contentdm.oclc.org/digital/bl/dmwebservices/index.php?q=dmQuery/p15717coll1/0/title!demo!rights/demo/100/1/0/0/0/0/json')
                .then(function(response) {
                    let collectionManifest = createCollectionManifest();
                    response.data.records.forEach(function(record) {
                        collectionManifest.members.push(createMember(record));
                    });

                    let promises = [];
                    collectionManifest.members.forEach(function(collectionManifestMember) {
                        promises.push(axios.get(collectionManifestMember['@id']));
                    });

                    axios.all(promises).then(function(results){
                        let timelineJson = {
                            'title' : {'text': 'CONTENTdm IIIF Timeline Demo'},
                            'events' : []
                        };

                        results.forEach(function(response){
                            let eventData = convertToEvent(response.data);
                            timelineJson.events.push(eventData);
                        });
                        window.timeline = new TL.Timeline('timeline-embed', timelineJson);
                    });
                }).catch(function(error) {
                    console.log(error);
                });
            });
        });
    }
});
