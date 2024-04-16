import Link, { LinkProps } from "next/link";
import { useState, useRef, useEffect, useMemo } from "react";

type PopoverLinkProps = {
  children: React.ReactNode | React.ReactNode[] | string;
  className: string;
  image?: string;
  // all props from LinkProps
} & LinkProps;

export const PopoverLink: React.FC<PopoverLinkProps> = ({
  children,
  image,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [mouseX, setMouseX] = useState<number>(0);

  const linkRef = useRef<HTMLAnchorElement>(null);
  const [mouseXVelocity, setMouseXVelocity] = useState<number>(0);

  useEffect(() => {
    setMouseX(linkRef.current?.offsetLeft ?? 0);
  }, []);

  const callback = useMemo(() => {
    return (e: MouseEvent) => {
      setMouseX(e.clientX);

      setMouseXVelocity((last) => (last + e.movementX * 3) / 2);
    };
  }, []);

  const startTracking = () => {
    console.log("start tracking");
    setIsHovered(true);
    setMouseXVelocity(0);
    document.body.addEventListener("mousemove", callback);
  };

  const stopTracking = () => {
    setIsHovered(false);
    document.body.removeEventListener("mousemove", callback);
  };

  return (
    <>
      <Link
        {...props}
        ref={linkRef}
        onMouseOver={startTracking}
        onMouseLeave={stopTracking}
        className={props.className + " group"}
      >
        {children}
      </Link>
      {
        // <div
        //   style={{
        //     position: "absolute",
        //     zIndex: 1000,
        //     top: linkRef.current?.offsetTop,
        //     left: mouseX,
        //     transformOrigin: "bottom center",
        //     transform: `translateY(-100%) translateX(-50%) rotate(${mouseXVelocity}deg) scale(${
        //       1 // isHovered ? 1 : 0.25
        //     })`,
        //     clipPath: isHovered
        //       ? "circle(100% at 50% 75%)"
        //       : "circle(0% at 50% 75%)",
        //     transition: "all 0.25s",
        //   }}
        //   className="rounded-lg border border-neutral-300 bg-white p-1 dark:border-neutral-700 dark:bg-neutral-900  "
        // >
        //   <img className="w-64 rounded-md" src={image ?? "/og.jpg"} />
        // </div>
      }
    </>
  );
};
