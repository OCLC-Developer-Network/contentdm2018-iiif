document.convertJson = {};
(function (context) {
    context.getMetadata = function(metadataArray, label) {
        let elementValue = '';
        metadataArray.forEach(function(metadataElement) {
            if (metadataElement.label === label) {
                elementValue = metadataElement.value;
            }
        })
        return elementValue;
    };

    context.convertToEvent = function(itemManifest) {
        return {
            'media' : {
                'url' : itemManifest.sequences[0].canvases[0].images[0].resource['@id'],
                'credit' : itemManifest.attribution['@value']
            },
            'start_date' : {
                'year' : new Date(context.getMetadata(itemManifest.metadata, 'Date')).getFullYear()
            },
            'text' : {
                'headline' : context.getMetadata(itemManifest.metadata, 'Title'),
                'text' : context.getMetadata(itemManifest.metadata, "Description")
            }
        }
    };

    context.timelineJson = {
        'title' : {},
        'events' : []
    }

    context.convert = function(collectionManifestMember) {
        return axios.get(collectionManifestMember['@id']);
    };
})(document.convertJson);