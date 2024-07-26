// ! NOT FINISHED YET
const getScrollDirection = createGetScrollDirection()

const app = () => {
  let isWaiting = false

  const slides = Array.from(document.getElementById('slides').children)

  const ids = slides.map(slide => slide.id)

  const handleScroll = event => {
    if (isWaiting === true) return

    const scrollDirection = getScrollDirection(event)

    console.log('scrollDirection: ', scrollDirection)

    const [currentHash, setCurrentHash] = useHash()

    const currentHashIdIdx = ids.findIndex(id => id === currentHash)

    console.log('currentHashIdIdx: ', currentHashIdIdx)

    if (scrollDirection === 'up' && currentHashIdIdx - 1 >= 0) {
      console.log('up')
      setCurrentHash(ids[currentHashIdIdx - 1])
    } else if (
      scrollDirection === 'down' &&
      currentHashIdIdx + 1 < ids.length
    ) {
      console.log('down')
      setCurrentHash(ids[currentHashIdIdx + 1])
    }

    isWaiting = true
    document.body.classList.add('overflow-hidden')
    setTimeout(() => {
      isWaiting = false
      document.body.classList.remove('overflow-hidden')
    }, 500)
  }

  addEventListener('scroll', handleScroll)
}

app()

function useHash() {
  const currentHash = location.hash.replace('#', '')

  const setHash = newSlide => {
    if (typeof newSlide !== 'string') {
      console.error('setHash: typeof newSlide must be a string')
      return
    }

    if (newSlide.length >= 300) {
      console.error(
        'setHash: length of newSlide must be less than or equal to 300 symbols',
      )
      return
    }

    if (newSlide.includes('#')) {
      console.error(
        "setHash: newSlide must not include `#` because it's handled within",
      )
      return
    }
    location.hash = `#${newSlide}`
  }

  return [currentHash, setHash]
}

function createGetScrollDirection() {
  let lastScrollTop = 0

  const getScrollDirection = event => {
    const { scrollTop } = document.documentElement

    const output = scrollTop > lastScrollTop ? 'down' : 'up'

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop

    return output
  }

  return getScrollDirection
}
