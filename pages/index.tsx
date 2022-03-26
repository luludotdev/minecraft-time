import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { useRef } from 'react'
import { Fonts } from '~components/Fonts'
import { Time } from '~components/Time'
import { getTime } from '~lib/hooks/useTicks'
import { useTooltip } from '~lib/hooks/useTooltip'

interface Props {
  now: string
}

const Home: NextPage<Props> = ({ now }) => {
  const timeRef = useRef<HTMLParagraphElement>(null)
  const timeTooltip = useTooltip('Copy to Clipboard', timeRef)

  const linkRef = useRef<HTMLAnchorElement>(null)
  const linkTooltip = useTooltip('lolPants/minecraft-time', linkRef)

  return (
    <>
      <Fonts />

      <style jsx global>{`
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
          color: inherit;
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

      <p>The time is currently</p>
      <p ref={timeRef} className='time'>
        <Time initial={now} />
      </p>
      <p>in Minecraft ticks.</p>

      <div className='source'>
        View on{' '}
        <a
          ref={linkRef}
          href='https://github.com/lolPants/minecraft-time'
          target='_blank'
          rel='noopener noreferrer'
        >
          GitHub
        </a>
      </div>

      {timeTooltip}
      {linkTooltip}
    </>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  return {
    props: { now: getTime() },
  }
}

export default Home
