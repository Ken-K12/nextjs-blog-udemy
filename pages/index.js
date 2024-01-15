import Head from 'next/head';
import Image from 'next/image';
import styles from '@/styles/Home.module.css';

import Layout, { siteTitle } from '@/components/Layout';
import Link from "next/link";
import utilstyle from "../styles/utils.module.css";
import { getPostsData } from '@/lib/post';

// ssgの場合
export async function getStaticProps() {
  const allPostsData = getPostsData();

  return {
    props: {
      allPostsData: allPostsData.map(({ orig, ...rest }) => rest)
    }
  }
}

// // SSRの場合
// export async function getServerSideProps(context) {
//   return {
//     propd: {
//       // コンポーネントにわたすためのprops
//     }
//   }
// }

export default function Home( { allPostsData } ) {
  return (
      <Layout home>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        <section className={utilstyle.headingMd}>
          <p>
            てん 27歳｜事業会社でWebマーケティング🧑🏻‍💻
          </p>
        </section>
        <section>
          <h2>📝エンジニアのブログ</h2>
          <div className={styles.grid}>
              {allPostsData.map(({id, data}) => (
                <article key={id}>
                <Link href={`/posts/${id}`}>
                  <img src={`${data.thumbnail}`} 
                      className={styles.thumbnailImage} />
                </Link>
                <Link href={`/posts/${id}`} legacyBehavior>
                  <a className={utilstyle.boldText}>{data.title}</a>
                </Link>
                <br />
                <small className={utilstyle.lightText}>
                  {data.date}
                </small>
              </article>
              ))};
          </div>
        </section>
      </Layout>
  )
}
