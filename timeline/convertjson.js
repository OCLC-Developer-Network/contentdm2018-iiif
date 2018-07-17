document.convertJson = {};
(function (context) {
    let getMetadata = function(metadataArray, label) {
        metadataArray.forEach(function(metadataElement) {
            if (metadataElement.label === label) {
                return metadataElement.value;
            }
        })
    };

    let convertToEvent = function(itemManifest) {
        return {
            'media' : {
                'url' : itemManifest.sequences[0].canvases[0].images[0].resource['@id'],
                'credit' : itemManifest.attribution['@value']
            },
            'start_date' : {
                'year' : getMetadata(itemManifest.metadata, 'Date')
            },
            'text' : {
                'headline' : getMetadata(itemManifest.metadata, 'Title'),
                'text' : getMetadata(itemManifest.metadata, "Description")
            }
        }
    };

    context.convert = function(collectionManifest) {
        let timelineJson = {
            'title' : {},
            'events' : [
            ]
        }
        return new Promise(function(resolve, reject) {
            collectionManifest.members.forEach(function(element) {
                fetch(element['@id'])
                .then((resp) => resp.json())
                .then(function(data) {
                    timelineJson.events.push(convertToEvent(data))
                });
            });
            resolve(timelineJson);
        });

    };
})(document.convertJson);