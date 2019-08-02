/* global Barba anime hljs location _gauges */
// ============================================================
// Gauges
// ============================================================

var _gauges = _gauges || [];
(function () {
  var t = document.createElement('script')
  t.type = 'text/javascript'
  t.async = true
  t.id = 'gauges-tracker'
  t.setAttribute('data-site-id', '568ec5c0c88d9035ab000d0c')
  t.setAttribute('data-track-path', 'https://track.gaug.es/track.gif')
  t.src = 'https://d36ee2fcip1434.cloudfront.net/track.js'
  var s = document.getElementsByTagName('script')[0]
  s.parentNode.insertBefore(t, s)
})();

// ============================================================
// Google Analytics
// ============================================================

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-55019624-1', 'auto')
ga('send', 'pageview')

function gaTrack(path, title) {
  ga('set', { page: path, title: title })
  ga('send', 'pageview')
}

// ============================================================
// Barba
// ============================================================

// ------------------------------------------------------------
// Fade Left
// ------------------------------------------------------------
const FadeLeftTransition = Barba.BaseTransition.extend({
  start: function () {
    Promise
      .all([this.newContainerLoading, this.fadeOut()])
      .then(this.fadeIn.bind(this))
  },
  fadeOut: function () {
    const oldContainer = this.oldContainer
    return new Promise(function (resolve) {
      anime({
        targets: oldContainer,
        opacity: 0,
        translateX: -500,
        easing: 'easeInQuart',
        duration: 400,
        complete: function () {
          resolve()
        }
      })
    })
  },
  fadeIn: function () {
    const _this = this
    const oldContainer = this.oldContainer
    const newContainer = this.newContainer
    window.scrollTo(0, 0)
    oldContainer.style.display = 'none'
    newContainer.style.visibility = 'visible'
    newContainer.style.opacity = 0
    newContainer.style.transform = 'translateX(100px)'
    anime({
      targets: newContainer,
      opacity: 1,
      translateX: 0,
      easing: 'easeOutQuart',
      duration: 1000,
      complete: function () {
        _this.done()
      }
    })
  }
})

// ------------------------------------------------------------
// Fade Right
// ------------------------------------------------------------
const FadeRightTransition = Barba.BaseTransition.extend({
  start: function () {
    Promise
      .all([this.newContainerLoading, this.fadeOut()])
      .then(this.fadeIn.bind(this))
  },
  fadeOut: function () {
    const oldContainer = this.oldContainer
    return new Promise(function (resolve) {
      anime({
        targets: oldContainer,
        opacity: 0,
        translateX: 500,
        easing: 'easeInQuart',
        duration: 400,
        complete: function () {
          resolve()
        }
      })
    })
  },
  fadeIn: function () {
    const _this = this
    const oldContainer = this.oldContainer
    const newContainer = this.newContainer
    window.scrollTo(0, 0)
    oldContainer.style.display = 'none'
    newContainer.style.visibility = 'visible'
    newContainer.style.opacity = 0
    newContainer.style.transform = 'translateX(-100px)'
    anime({
      targets: newContainer,
      opacity: 1,
      translateX: 0,
      easing: 'easeOutQuart',
      duration: 1000,
      complete: function () {
        _this.done()
      }
    })
  }
})

Barba.Pjax.getTransition = function () {
  if (location.pathname === '/' || location.search.includes('next')) {
    return FadeRightTransition
  }
  return FadeLeftTransition
}

const Home = Barba.BaseView.extend({
  namespace: 'home',
  menu: document.querySelector('.menu'),
  header: document.querySelector('.header'),
  onEnter: function () {
    this.menu.classList.remove('open')
    this.header.classList.remove('menu-active')
  },
  onEnterCompleted: function () {},
  onLeave: function () {
    this.header.classList.add('menu-active')
    this.menu.classList.add('open')
  },
  onLeaveCompleted: function () {}
})

// Don't forget to init the view!
Home.init()

// ============================================================
// Document Ready
// ============================================================
document.addEventListener('DOMContentLoaded', function (e) {
  Barba.Pjax.start()
  hljs.initHighlightingOnLoad()
})

// ============================================================
// On Page Transition
// ============================================================
Barba.Dispatcher.on('transitionCompleted', function (currentStatus, oldStatus, container) {
  // Reinitialize code highlights
  hljs.initHighlighting.called = false
  hljs.initHighlighting()
  console.log('Hi')

  // Analytics
  gaTrack(location.pathname, document.title)
  _gauges.push(['track'])
})
