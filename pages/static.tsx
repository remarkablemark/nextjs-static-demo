import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

interface Props {
  date: string
}

const StaticPage: NextPage<Props> = (props: Props) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Static Page</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Static Page</h1>

        <p className={styles.description}>
          {new Date(props.date).toLocaleString()}
        </p>
      </main>
    </div>
  )
}

export default StaticPage

export const getStaticProps: GetStaticProps = () => {
  // If the request was successful, return the date
  // and revalidate every 100 seconds.
  return {
    props: {
      date: new Date().toISOString(),
    },
    revalidate: 100,
  }
}
