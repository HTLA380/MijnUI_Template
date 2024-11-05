import * as React from "react"

function isiOS() {
  return (
    [
      "iPad Simulator",
      "iPhone Simulator",
      "iPod Simulator",
      "iPad",
      "iPhone",
      "iPod",
    ].includes(navigator.userAgent) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  )
}

export const useScrollLock = () => {
  const scrollOffset = React.useRef(0)

  const lockScroll = React.useCallback(() => {
    document.body.dataset.scrollLock = "true"
    document.body.style.overflow = "hidden"
    document.body.style.paddingRight = "var(--scrollbar-compensation)"

    if (isiOS()) {
      scrollOffset.current = window.scrollY || window.pageYOffset
      document.body.style.position = "fixed"
      document.body.style.top = `-${scrollOffset.current}px`
      document.body.style.width = "100%"
    }
  }, [])

  const unlockScroll = React.useCallback(() => {
    document.body.style.overflow = ""
    document.body.style.paddingRight = ""

    if (isiOS()) {
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.width = ""
      window.scrollTo(0, scrollOffset.current)
    }

    delete document.body.dataset.scrollLock
  }, [])

  React.useEffect(() => {
    const scrollBarCompensation = window.innerWidth - document.body.offsetWidth
    document.body.style.setProperty(
      "--scrollbar-compensation",
      `${scrollBarCompensation}px`,
    )
  }, [])

  return {
    lockScroll,
    unlockScroll,
  }
}

export const useScrollLockEffect = (isOpen: boolean) => {
  const { lockScroll, unlockScroll } = useScrollLock()

  React.useEffect(() => {
    if (isOpen) {
      lockScroll()
    } else {
      unlockScroll()
    }

    return () => {
      unlockScroll()
    }
  }, [isOpen, lockScroll, unlockScroll])
}
