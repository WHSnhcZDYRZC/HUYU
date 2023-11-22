const animation = (dom: HTMLElement, animationName: string, time = 1, callBack?: () => void) => new Promise((resolve) => {

    if (!dom) return;
    const defaultClassName = "animate__animated"

    dom.style.setProperty('--animate-duration', `${time}s`);

    dom.classList.add(defaultClassName, animationName);
    const handleAnimationEnd = (event: Event) => {
        event.stopPropagation();
        dom.classList.remove(defaultClassName, animationName);
        resolve(callBack && callBack())
    }
    dom.addEventListener('animationend', handleAnimationEnd, { once: true });
})

export default animation;