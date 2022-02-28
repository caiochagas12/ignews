import React, { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from "next";
import { RichText } from 'prismic-dom';
import { getPrismicClient } from '../../../services/prismic'

import styles from '../post.module.scss'
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';

interface PostPreviewProps{

 post:{
     slug:string;
     title:string;
     content:string;
     updatedAt:string;
    }
}

export default function PostPreview({post}:PostPreviewProps){

    const [session] = useSession()
    const router = useRouter()

    useEffect(() =>{
        if(session?.activeSubscription){
             router.push(`/post/${post.slug}`)
        }
     
    },[session])

    
    return(
        <>
                     <Head><title>{post.slug} | Ignews</title></Head>


       <main className={styles.container}>
           <article className={styles.post}>
               <h1>{post.title}</h1>
               <time>{post.updatedAt}</time>
               <div 
               className={`${styles.postContent} ${styles.previewContent}`}
               dangerouslySetInnerHTML={ { __html:post.content}} />
               <div className={styles.continueReading}>
                   Wanna continue reading ?
                   <Link href="/">
                   <a href="">Subscribe now 🤗</a>
                   </Link>
               </div>
           </article>
       </main>
        </>
    );
}

export const getStaticPaths {
  return {
    paths: [],
    fallback: 'true',
  }
}


export const getStaticProps:GetStaticProps = async({params}) =>{
    const {slug} = params;

    const prismic = getPrismicClient()

    const response = await prismic.getByUID('post',String(slug),{})

    const post = {
        slug,
            title:RichText.asText(response.data.title),
            content:RichText.asHtml(response.data.content.splice(0,3)),
            updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR',{
                day:'2-digit',
                month:'long',
                year:'numeric'
            })
        };

        return{
            props:{
                post
            }
        }
}
