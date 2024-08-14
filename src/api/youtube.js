export default class Youtube {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  async search(keyword) {
    console.log('serarch by', keyword);
    // #:private function in js -> can be used inside class only
    return keyword ? this.#searchByKeyword(keyword) : this.#mostPopular();
  }

  async channelImageURL(id) {
    return this.apiClient
      .channels({ params: { part: 'snippet', id } })
      .then((res) => {
        console.log('url:', res.data.items[0].snippet.thumbnails.default.url);
        return res.data.items[0].snippet.thumbnails.default.url;
      });
  }

  async channelPlayListitems(id) {
    const uploadsPlaylistId = 'UU' + id.substring(2);
    return this.apiClient
      .playlistItems({
        params: {
          part: 'snippet,contentDetails',
          playlistId: uploadsPlaylistId,
          maxResults: 25,
        },
      })
      .then((res) => res.data.items)
      .then((items) =>
        items.map((item) => ({ ...item, id: item.contentDetails.videoId }))
      );
  }

  //https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=surfing&key=[YOUR_API_KEY]
  async #searchByKeyword(keyword) {
    return this.apiClient
      .search({
        params: {
          part: 'snippet',
          maxResults: 25,
          type: 'video',
          q: keyword,
        },
      })
      .then((res) => res.data.items)
      .then((items) => items.map((item) => ({ ...item, id: item.id.videoId })));
  }
  //https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=25&key=[YOUR_API_KEY]
  async #mostPopular() {
    return this.apiClient
      .videos({
        params: {
          part: 'snippet',
          maxResults: 25,
          chart: 'mostPopular',
        },
      })
      .then((res) => res.data.items);
  }
}
