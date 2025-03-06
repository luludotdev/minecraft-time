import type { FC } from "react";
import { useCallback, useEffect, useRef } from "react";

const randRange = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export type Sky = "dawn" | "day" | "dusk" | "night";
interface Props {
  readonly sky?: Sky;
  readonly children?: never;
}

export const Background: FC<Props> = ({ sky }) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const render = useCallback(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const size = 4;
    const halfSize = size / 2;
    const gradientSize = size * 3.8;
    const halfGradSize = gradientSize / 2;

    const drawRect = (x: number, y: number) => {
      const cx = x + 0.5 * size;
      const cy = y + 0.5 * size;
      ctx.translate(cx, cy);

      const rotation = randRange(0, 90);
      ctx.rotate((Math.PI / 180) * rotation);
      ctx.translate(-cx, -cy);

      const gradient = ctx.createRadialGradient(
        x,
        y,
        0,
        x,
        y,
        gradientSize * 0.5,
      );

      gradient.addColorStop(0, "rgba(220, 220, 220, 0.8)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(
        x - halfGradSize,
        y - halfGradSize,
        gradientSize,
        gradientSize,
      );

      ctx.fillStyle = "white";
      ctx.fillRect(x - halfSize, y - halfSize, size, size);

      ctx.setTransform(1, 0, 0, 1, 0, 0);
    };

    const offset = 100;
    for (let i = 0; i < randRange(50, 100); i++) {
      const x = randRange(-1 * offset, canvas.width + offset);
      const y = randRange(-1 * offset, canvas.height * 0.6 + offset);

      drawRect(x, y);
    }
  }, []);

  useEffect(() => {
    render();

    window.addEventListener("resize", render);
    if (sky) document.body.classList.add(sky);

    return () => {
      window.removeEventListener("resize", render);
      if (sky) document.body.classList.remove(sky);
    };
  }, [sky, render]);

  return (
    <>
      <style global jsx>{`
        body {
          --text-light: white;
          --text-dark: black;
          --text-accent: #ffe;

          --day-top: #7eabff;
          --day-bottom: #c0d8ff;
          --day-text: var(--text-dark);
          --day-stars: 0;
          --day: linear-gradient(
            var(--day-top) 10%,
            var(--day-bottom) 20%,
            var(--day-bottom) 100%
          );

          --night-top: #010103;
          --night-bottom: #0c0d17;
          --night-text: var(--text-light);
          --night-stars: 0.9;
          --night: linear-gradient(
            var(--night-top) 10%,
            var(--night-bottom) 40%,
            var(--night-bottom) 100%
          );

          --dusk-top: #38415e;
          --dusk-bottom: #cf5335;
          --dusk-text: var(--text-accent);
          --dusk-stars: 0.7;
          --dusk: linear-gradient(
            var(--dusk-top) 10%,
            var(--dusk-bottom) 50%,
            var(--dusk-bottom) 100%
          );

          --dawn-top: #586fa1;
          --dawn-bottom: #db753a;
          --dawn-text: var(--text-accent);
          --dawn-stars: 0.6;
          --dawn: linear-gradient(
            var(--dawn-top) 10%,
            var(--dawn-bottom) 50%,
            var(--dawn-bottom) 100%
          );
        }

        body.day {
          --text-colour: var(--day-text);
          --stars: var(--day-stars);

          background-image: var(--day);
        }

        body.night {
          --text-colour: var(--night-text);
          --stars: var(--night-stars);

          background-image: var(--night);
        }

        body.dusk {
          --text-colour: var(--dusk-text);
          --stars: var(--dusk-stars);

          background-image: var(--dusk);
        }

        body.dawn {
          --text-colour: var(--dawn-text);
          --stars: var(--dawn-stars);

          background-image: var(--dawn);
        }

        body {
          color: var(--text-colour, black);
        }

        [data-theme="dark"] body {
          color: var(--text-colour, white);
        }
      `}</style>

      <style jsx>{`
        canvas {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;

          opacity: var(--stars, 0);
          pointer-events: none;
          z-index: -10;
        }
      `}</style>

      <canvas ref={ref} />
    </>
  );
};
