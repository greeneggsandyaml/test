import React from 'react';
import Head from 'next/head';
import styles from 'styles/Layout.module.css'

const Layout = ({ children, title = 'Title', description }) => {

    // // Google Analytics
    // const script = {
    //     __html: "window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'UA-58212740-2');"
    // }

    return (
        <>
            <Head>
                {/* Google Tag Manager */}
                {/* <script async src="https://www.googletagmanager.com/gtag/js?id=UA-58212740-2"></script> */}
                {/* Google Analytics */}
                {/* <script dangerouslySetInnerHTML={script}></script> */}
                <title>{title}</title>
                <meta charSet='utf-8' />
                <meta name='viewport' content='initial-scale=1.0, width=device-width' />
                <link rel='shortcut icon' type='image/x-icon' href='/favicon.png' />
                <meta name='Description' content={description} />
            </Head>
            {/* </ Header>  */}

            <div className={styles.content}>{children}</div>

            {/* </Footer> */}

        </>
    );
};

export default Layout;