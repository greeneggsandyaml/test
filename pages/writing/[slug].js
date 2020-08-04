import React from 'react';
import Layout from 'components/Layout'

// For loading files and converting markdown to HTML
import fs from 'fs';
import path from 'path'
import * as matter from 'gray-matter';
import ReactMarkdown from 'react-markdown'

const PostPage = ({ content, title, date, description }) => {
    return (
        <Layout title={title} description={description}>
            <article>
                <h1>{title}</h1>
                <p className='post-date'>{date}</p>
                <ReactMarkdown source={content} renderers={{
                    link: (props) => (
                        <a href={props.href} rel='noopener'>
                            {props.children}
                        </a>
                    ),
                }} />
            </article>
        </Layout>
    );
};

const processPostFile = (postFile) => {

    console.log(postFile)

    // Extract title, description, and date
    const { content, data: frontMatter } = matter(postFile)

    console.log(frontMatter)

    // Parse date
    const date = new Intl.DateTimeFormat('un-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    }).format(new Date(frontMatter.date))

    // Format slug
    const slug = frontMatter.slug
    // frontMatter.title.toLowerCase().replace(/\s/g, '-');

    return {
        title: frontMatter.title,
        description: frontMatter.description,
        content,
        slug,
        date
    }
}

export async function getStaticPaths() {

    const getAllPosts = () => {

        // Get all posts from filesystem
        const cwd = process.cwd()
        const posts = fs
            .readdirSync(path.join(cwd, 'posts'))
            .map((fileName) => fs.readFileSync(
                path.join(cwd, 'posts', fileName),
                { encoding: 'utf8' }))
            .map((postFile) => processPostFile(postFile))

        // Sort posts
        posts.sort((a, b) => new Date(b.date) - new Date(a.date))
        return posts
    }

    const paths = getAllPosts().map((post) => {
        return `/writing/${post.slug}`
    })

    return {
        'paths': paths,
        'fallback': false
    }
}

export async function getStaticProps({ params }) {

    // Get single post from filesystem
    const cwd = process.cwd()
    const postFile = fs.readFileSync(
        path.join(cwd, 'posts', params.slug + '.md'),
        { encoding: 'utf8' })
    const post = processPostFile(postFile)

    return {
        props: { ...post }
    }
}

export default PostPage;