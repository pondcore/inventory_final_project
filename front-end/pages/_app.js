import '../styles/globals.css'
import 'antd/dist/antd.css'
import MainLayout from '../comps/layouts/MainLayout'
import React, { useState, useEffect } from 'react';

function useIsClient() {
  const [isClient, setIsClient] = useState(false);
  // The following effect will be ignored on server, 
  // but run on the browser to set the flag true
  useEffect(() => setIsClient(true), []);
  return isClient
}

function MyApp({ Component, pageProps }) {
  const [breadcrumb, setBreadcrumb] = useState([]);
  const isClient = useIsClient();
  return (
    <>{isClient &&
      <MainLayout breadcrumb={breadcrumb}>
        <Component {...pageProps} setBreadcrumb={setBreadcrumb} />
      </MainLayout>
    }</>
  )
}

export default MyApp;
