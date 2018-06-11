export default {
  filteredPlayListObject: function(data){ // 없어진 플레이리스트 필터링
    let arr = data.items.filter((x) => {
      let url = x.snippet.thumbnails.medium.url
      let validatedValue = url.search('no_thumbnail');
      return validatedValue == -1 ? true : false;
    }); // the end of filter
    console.log("arr: ",arr);

    let nToken = data.hasOwnProperty("nextPageToken") ? data.nextPageToken : 'NULL';
    return {items:arr,nextPageToken:nToken};
  },
  itemsTokenObject: function(data){
    let nToken = data.hasOwnProperty("nextPageToken") ? data.nextPageToken : 'NULL';

    return {items:data.items,nextToken:nToken};

  },
  checkRemovedVideo: function(data){
    let filteredArray = data.items.filter((x) => {
      return x.snippet.hasOwnProperty("thumbnails") ? true : false;
    });
    data.items=filteredArray;
    let nToken = data.hasOwnProperty("nextPageToken") ? data.nextPageToken : 'NULL';

    return {items:filteredArray,nextToken:nToken};
  },

}
