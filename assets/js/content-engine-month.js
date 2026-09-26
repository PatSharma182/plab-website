(function () {
  'use strict';

  var gallery = document.querySelector('[data-social-examples]');
  if (!gallery || !('MutationObserver' in window)) return;

  var posterByMediaFile = {
    '6a48ddfd81c60978b7c4be68.mp4': 'assets/images/content-engine-month/broll-social.jpg',
    '6a48de8381c60978b7c55fc6.mp4': 'assets/images/content-engine-month/lifestyle-clip.jpg',
    '67da1fa0652cf1e6ca869a85.mp4': 'assets/images/content-engine-month/educational-reel.jpg',
    '67da1fa0cfe91214a28c6f88.mp4': 'assets/images/content-engine-month/founder-insight.jpg',
    '67da1fa0652cf1b46c869a87.mp4': 'assets/images/content-engine-month/offer-reel.jpg',
    '67da200d53365777fae6ecab.mov': 'assets/images/content-engine-month/vertical-reel.jpg',
    '6819d19cc0547b606747c33a.mp4': 'assets/images/content-engine-month/founder-reel.jpg'
  };

  function addPoster(video) {
    if (!video.closest('.social-example-frame')) return;

    var source = video.currentSrc || video.getAttribute('src') || '';
    var mediaFile = source.split('/').pop().split('?')[0];
    var poster = posterByMediaFile[mediaFile];
    if (!poster) return;

    video.poster = poster;
    video.preload = 'none';
  }

  function addPosters(root) {
    if (root.nodeType !== 1) return;
    if (root.matches('video')) addPoster(root);
    Array.prototype.forEach.call(root.querySelectorAll('video'), addPoster);
  }

  addPosters(gallery);

  new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      Array.prototype.forEach.call(mutation.addedNodes, addPosters);
    });
  }).observe(gallery, { childList: true, subtree: true });
}());
