document.cdmTimeline = {};
(function (context) {
    context.createCollectionManifest = function() {
        let collectionManifest = {
            '@context' : 'http://iiif.io/api/presentation/2/context.json',
            '@id' : 'https://cdm15717.contentdm.oclc.org/change/this/to/the/path/this/gets/saved.json',
            '@type' : 'sc:Collection',
            'label' : 'Timeline Demo',
            'description' : 'Collection from Timeline Demo',
            'attribution' : 'This collection of images may be printed or downloaded by individuals, schools or libraries for study, research or classroom teaching without permission. For other uses contact  visualcollections@indianahistory.org. Use must be accompanied with the attribution, "Indiana Historical Society".',
            'members' : []
        };
    
        fetch('https://cdm15717.contentdm.oclc.org/digital/bl/dmwebservices/index.php?q=dmQuery/p15717coll1/rights^Indiana^all^and/title!demo!rights/demo/100/1/0/0/0/0/json')
        .then((resp) => resp.json())
        .then(function(data) {
            data.records.forEach(function(record) {
                const member = {
                    '@id' : 'https://cdm15717.contentdm.oclc.org/digital/iiif-info' + record.collection + '/' + record.pointer + '/manifest.json',
                    '@type' : 'sc:Manifest',
                    'label' : record.title
                };
                collectionManifest.members.push(member)
            });
            document.querySelector('div[data-id="collectionPageText"]').innerHTML = '<pre>'+JSON.stringify(collectionManifest, null, 2) + '</pre>';
        }).catch(function(error) {
            console.log(error);
        }); 
    }
})(document.cdmTimeline);