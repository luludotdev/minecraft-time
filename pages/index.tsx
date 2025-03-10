import copy from "copy-to-clipboard";
import type { GetServerSideProps } from "next";
import Head from "next/head";
import { useCallback, useRef, useState } from "react";
import { Background } from "~/components/Background";
import { Fonts } from "~/components/Fonts";
import { LocationPrompt } from "~/components/LocationPrompt";
import { Time } from "~/components/Time";
import { useLocation } from "~/lib/hooks/useLocation";
import { getTime } from "~/lib/hooks/useTicks";
import { useTooltip } from "~/lib/hooks/useTooltip";

type Props = {
  readonly now: string;
};

const Home = ({ now }: Props) => {
  const copyTextCopy = "Copy to Clipboard";
  const copyTextCopied = "Copied!";

  const [copyText, setCopyText] = useState(copyTextCopy);
  const timeRef = useRef<HTMLParagraphElement>(null);
  const timeTooltip = useTooltip(copyText, timeRef);

  const linkRef = useRef<HTMLAnchorElement>(null);
  const linkTooltip = useTooltip("luludotdev/minecraft-time", linkRef);

  const handleClick = useCallback(() => {
    const now = getTime();
    copy(now);

    setCopyText(copyTextCopied);
    setTimeout(() => {
      setCopyText(copyTextCopy);
    }, 750);
  }, []);

  const { enabled, sky, toggleEnabled } = useLocation();

  return (
    <>
      <Fonts />

      <style global jsx>{`
        html,
        body {
          width: 100%;
          height: 100%;

          margin: 0;
          padding: 0;
        }

        #__next {
          height: 50vh;

          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      `}</style>

      <style jsx>{`
        p {
          margin: 0;
        }

        p.time {
          font-size: 2em;
          cursor: pointer;
        }

        a {
          color: var(--text-colour);
        }

        div.source {
          position: fixed;
          bottom: 0;
          margin-bottom: 10px;
          font-size: 20px;
        }
      `}</style>

      <Head>
        <title>Time in Minecraft Ticks</title>
      </Head>

      <LocationPrompt isEnabled={enabled} onClick={toggleEnabled} />
      <Background sky={sky} />

      <p>The time is currently</p>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
      <p className="time" onClick={handleClick} ref={timeRef}>
        <Time initial={now} />
      </p>
      <p>in Minecraft ticks.</p>

      <div className="source">
        View on{" "}
        <a
          href="https://github.com/luludotdev/minecraft-time"
          ref={linkRef}
          rel="noopener noreferrer"
          target="_blank"
        >
          GitHub
        </a>
      </div>

      {timeTooltip}
      {linkTooltip}
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => ({
  props: { now: getTime() },
});

export default Home;
