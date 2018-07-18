document.cdmTimeline = {};
(function (context) {
    context.initCollectionManifest = function(url) {
        context.collectionManifest = {
            '@context' : 'http://iiif.io/api/presentation/2/context.json',
            '@id' : 'https://cdm15717.contentdm.oclc.org/change/this/to/the/path/this/gets/saved.json',
            '@type' : 'sc:Collection',
            'label' : 'Timeline Demo',
            'description' : 'Collection from Timeline Demo',
            'attribution' : 'This collection of images may be printed or downloaded by individuals, schools or libraries for study, research or classroom teaching without permission. For other uses contact  visualcollections@indianahistory.org. Use must be accompanied with the attribution, "Indiana Historical Society".',
            'members' : []
        };
    
        return axios.get(url);
    }
})(document.cdmTimeline);