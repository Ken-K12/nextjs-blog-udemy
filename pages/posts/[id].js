import Layout, { siteTitle } from "@/components/Layout";
import { getAllPostIds, getPostData  } from "@/lib/post";
import utilStyles from "../..//styles/utils.module.css";
import Head from "next/head";

export async function getStaticPaths() {
    const paths = getAllPostIds();

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps( { params } ) {
    const postData = await getPostData(params.id);
    console.log(postData)

    return {
        props: {
            postData,
        },
    };

}

export default function Post( props ){
    console.log(`postData: ${props.postData.title}`);
    return (
        <>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <Layout>
                <article>
                    <h1 className={utilStyles.headingXl}>{props.postData.title} </h1>
                    <div className={utilStyles.lightText}>{ props.postData.date }</div>
                    <div dangerouslySetInnerHTML={{ __html: props.postData.blogContentHTML }}></div>
                </article>
            </Layout>        
        </>
        
    )
}