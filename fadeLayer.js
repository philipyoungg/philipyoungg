var installFadeLayer = function() {
  function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this,
        args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  var createFadeComp = function(direction){
    var fadeLayer = document.createElement('div');
    var fadeLayerProps = {
      position: 'fixed',
      width: '100%',
      height: '8rem',
      'z-index': '1000000',
      'pointer-events': 'none',
      background: direction === 'bottom' ? 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0.1), rgba(255,255,255, 0.3), rgba(255,255,255, 0.6), white)' : 'linear-gradient(to top, rgba(255,255,255,0), rgba(255,255,255,0.1), rgba(255,255,255, 0.3), rgba(255,255,255, 0.6), white)',
      [direction]: '0',
      opacity: direction === 'top' ? 0 : 1,
      transition: '0.1s ease-in-out'
    }
    for (key in fadeLayerProps) {
      fadeLayer.style[key] = fadeLayerProps[key]
    }
    return fadeLayer
  }
  var topFadeLayer = createFadeComp('top')
  var bottomFadeLayer = createFadeComp('bottom')
  var hideFadeLayer = debounce(function(e) {
    // top
    if (window.pageYOffset <= 30) {
      topFadeLayer.style.opacity = '0'
    } else {
      topFadeLayer.style.opacity = '1'
    }
    // bottom
    if ((window.pageYOffset + window.innerHeight + 30) >= document.body.offsetHeight) {
      bottomFadeLayer.style.opacity = '0'
    } else {
      bottomFadeLayer.style.opacity = '1'
    }
  })

  document.body.appendChild(topFadeLayer)
  document.body.appendChild(bottomFadeLayer)
  document.addEventListener('scroll', hideFadeLayer)
}
