(function(anime, History, $){
  var updateScript = function() {
    // externalLinkToNewTab()
    var urlArray = window.location.href.split('/')
    if (urlArray[3] === 'thoughts' && urlArray[4]) {
      if (window.DISQUS) {
        DISQUS.reset({
          reload: true,
          config: function() {
            this.page.identifier = window.location.href
            this.page.url = window.location.href
          }
        })
      } else {
        var disqus_config = function () {
          this.page.url = window.location.href
          this.page.identifier = window.location.href
        };
        (function() { // DON'T EDIT BELOW THIS LINE
          var d = document, s = d.createElement('script');
          s.src = 'https://philipyoungg.disqus.com/embed.js';
          s.setAttribute('data-timestamp', +new Date());
          (d.head || d.body).appendChild(s);
        })();
      }
    }
  }

  var splitWord = function(selector) {
    var title = document.querySelector(selector);
    title.style['whiteSpace'] = 'pre-wrap';
    title.style['opacity'] = 0;
    var words = title.textContent.split(' ')
    title.textContent = ''
    title.style['opacity'] = 1
    words.forEach(function(word){
      var span = document.createElement('span')
      var space = document.createElement('span')
      span.style['display'] = 'inline-block'
      span.style['opacity'] = 0
      span.textContent = word
      space.textContent = ' '
      title.appendChild(span)
      title.appendChild(space)
    })
  }

  var loadingIn = anime.timeline({
    autoplay: false
  })
    .add({
      targets: '#loading',
      easing: 'easeInOutQuad',
      opacity: [0, 1],
      duration: 200,
    })

  var loadingOut = anime.timeline({
    autoplay: false
  })
    .add({
      targets: '#loading',
      easing: 'easeInOutQuad',
      opacity: [1, 0],
      duration: 200,
    })

  function playAnimation() {
    splitWord('h1')
    var transitionIn = anime.timeline({
      autoplay: false
    })
      .add({
        targets: '#app',
        easing: 'easeInOutQuad',
        opacity: [0, 1],
        translateX: [-10, 0],
        duration: 300,
      });

    var title = {
      targets: 'h1 span',
      easing: 'easeInOutQuad',
      opacity: [0, 1],
      translateY: [2, 0],
      duration: 500,
      delay: function(t, i) {
        return i * 50
      }
    }

    var article = {
      targets: 'article',
      easing: 'easeInOutQuad',
      opacity: [0, 1],
      translateX: [-10, 0],
      duration: 500,
      offset: 0
    }

    var books = {
      targets: '.book',
      easing: 'easeInOutQuad',
      opacity: [0, 1],
      translateX: [-10, 0],
      duration: 500,
      delay: function(t, i) {
        return i * 50
      },
      offset: 0
    }

    var thoughts = {
      targets: '.thoughts',
      easing: 'easeInOutQuad',
      opacity: [0, 1],
      translateX: [-10, 0],
      duration: 500,
      delay: function(t, i) {
        return i * 50
      },
      offset: 0
    }

    var intro = {
      targets: '.intro',
      easing: 'easeInOutQuad',
      opacity: [0, 1],
      translateX: [-10, 0],
      duration: function(t, i) {
        return 500
      },
      delay: function(t, i) {
        return i * 50
      },
      offset: 0
    }

    var inquiry = {
      targets: '.inquiry',
      easing: 'easeInOutQuad',
      opacity: [0, 1],
      translateX: [-10, 0],
      duration: 500,
      offset: 0
    }

    var disclaimer = {
      targets: '.disclaimer',
      easing: 'easeInOutQuad',
      opacity: [0, 0.7],
      translateY: [5, 0],
      duration: 300,
      offset: 300
    }

    var label = {
      targets: 'label',
      easing: 'easeInOutQuad',
      opacity: [0, 1],
      translateX: [-10, 0],
      duration: 500,
      delay: function(t, i) {
        return i * 50
      },
      offset: 10
    }

    var input = {
      targets: '.input-reset',
      easing: 'easeInOutQuad',
      opacity: [0, 1],
      translateX: [-10, 0],
      duration: 500,
      delay: function(t, i) {
        return i * 50
      },
      offset: 0
    }

    var page = anime.timeline({
      autoplay: false,
    })
      .add(title)
      .add(books)
      .add(intro)
      .add(thoughts)
      .add(article)
      .add(input)
      .add(label)
      .add(inquiry)
      .add(disclaimer)

    setTimeout(function(){
      transitionIn.play()
      page.play()
    }, 1)
  }

  var cacheCurrentPage = function() {
    var newContent = $('#app').html()
    pageCache[window.location.href] = {}
    pageCache[window.location.href].html = newContent
    pageCache[window.location.href].title = document.title
  }

  var pageCache = {}
  cacheCurrentPage()

  var updateView = function(state) {
    window.scrollTo(0, 0)
    document.title = pageCache[state.url].title
    $('#app')
      .html(pageCache[state.url].html)
      .promise()
      .done(function(res){
        $('.disclaimer').css({
          opacity: 0
        })
        $('.book').css({
          opacity: 0
        })
        $('.disclaimer').css({
          opacity: 0
        })
        $('.intro').css({
          opacity: 0
        })
        $('.thoughts').css({
          opacity: 0
        })
        $('article').css({
          opacity: 0
        })
        $('.inquiry').css({
          opacity: 0
        })
        $('.disclaimer').css({
          opacity: 0
        })
        playAnimation()
        updateScript()
        ga('set', {
          page: window.location.pathname,
          title: pageCache[state.url].title,
        })
        ga('send', 'pageview')
      })
    ///////////
  }

  $('#app').on('click', 'a', function(e){
    if (this.hostname !== window.location.hostname) {
      return
    }
    e.preventDefault()
    if (window.location.href === this.href) {
      return
    }
    if (this.href) {
      var transitionOut = anime.timeline({
        autoplay: false
      })
        .add({
          targets: '#app',
          easing: 'easeInOutQuad',
          opacity: [1, 0],
          translateX: [0, 10],
          duration: 200,
        })
      transitionOut.play()
      History.pushState( null, 'loading...', this.href )
    }
  })

  History.Adapter.bind(window, 'statechange', function(){
    var state = History.getState()
    if (!pageCache[state.url]) {
      loadingIn.reset()
      loadingIn.play()
      $.get(state.url, function(res){
        var newContent = $(res).find('#app').html()
        var newTitle = $(res).filter('title').text()
        pageCache[state.url] = {}
        pageCache[state.url].html = newContent
        pageCache[state.url].title = newTitle
      })
      .promise()
      .done(function(res){
        loadingOut.reset()
        loadingOut.play()
        loadingOut.finished.then(function(){
          updateView(state)
        })
      })
      .fail(function(res){
        window.location.href = '/404'
      })
    } else {
      setTimeout(function(){
        updateView(state) // super animation hack
      }, 200)
    }
  })

  setTimeout(playAnimation, 400)
  updateScript()

})(anime, History, $)
