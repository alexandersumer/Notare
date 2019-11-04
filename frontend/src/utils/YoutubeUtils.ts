export const getThumbnail = (url: string) => {
    if (url === null) return '';

    const results = url.match('[\\?&]v=([^&#]*)');
    const video   = (results === null) ? url : results[1];
    
    return 'http://img.youtube.com/vi/' + video + '/0.jpg';
};