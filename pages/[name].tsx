import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import type { ParsedUrlQuery } from 'querystring'
import styles from '../styles/Home.module.css'

interface Props {
  date: string
  name: string
}

const DynamicPage: NextPage<Props> = (props: Props) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Dynamic Page</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Dynamic Page: {props.name}</h1>

        <p className={styles.description}>
          {new Date(props.date).toLocaleString()}
        </p>
      </main>
    </div>
  )
}

export default DynamicPage

interface Params extends ParsedUrlQuery {
  name: string
}

export const getStaticProps: GetStaticProps<Props, Params> = (context) => {
  // If the request was successful, return the date
  // and revalidate every 100 seconds.
  return {
    props: {
      date: new Date().toISOString(),
      name: context.params!.name,
    },
    revalidate: 100,
  }
}

export const getStaticPaths: GetStaticPaths = () => {
  // don't prerender any static pages
  // (faster builds, but slower initial page load)
  return {
    paths: [],
    fallback: 'blocking',
  }
}
