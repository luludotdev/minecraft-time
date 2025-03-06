import type { FC } from "react";

export const Fonts: FC<{ children?: never }> = () => (
  <style global jsx>{`
    @font-face {
      font-family: "Minecraft";
      src:
        url("/fonts/Minecraft-Regular.woff2") format("woff2"),
        url("/fonts/Minecraft-Regular.woff") format("woff");

      font-weight: normal;
      font-style: normal;
    }

    html {
      font-family: "Minecraft";
      font-size: 40px;
    }

    @media screen and (max-width: 600px) {
      html {
        font-size: 20px;
      }
    }
  `}</style>
);
