import animation from "@/utils/animation";
import { memo, useEffect, useMemo, useRef } from "react";

interface AnimationPropsInf {
    children: React.ReactElement,
    className: string,
    animationName: string,
}

const Animation = memo((props: AnimationPropsInf) => {
    const { className, animationName, children } = props;
    const animationRef = useRef<HTMLDivElement | any>(null);

    useEffect(() => {
        animation(animationRef.current, animationName)
    }, [])

    return (
        <div ref={animationRef} className={className}>
            {children}
        </div>
    )
})

export default Animation;