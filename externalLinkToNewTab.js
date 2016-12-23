/* eslint-disable */

(function (window, d) {
  var externalLinkToNewTab = function externalLinkToNewTab(config) {
    if (typeof config === 'undefined' || typeof config.renderExternalIcon === 'undefined') {
      config = { // eslint-disable-line
        renderExternalIcon: true
      };
    }
    [].forEach.call(d.querySelectorAll('a'), function (link) {
      if (link.hostname !== window.location.hostname) {
        link.setAttribute('target', '_blank');
        if (config.renderExternalIcon) {
          var external = document.createElement('i');
          external.classList.add('fa', 'fa-external-link');
          link.appendChild(external);
        }
      }
    });
  };
  window.externalLinkToNewTab = externalLinkToNewTab;
})(window, document);
