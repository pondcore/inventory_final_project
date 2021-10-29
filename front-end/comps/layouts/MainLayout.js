import styles from '@/styles/Layout.module.css'
import Nav from '../Nav'
import MyFooter from '../MyFooter'
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link'

import { Layout, Breadcrumb } from 'antd'

const { Content } = Layout;

const MainLayout = ({ children, breadcrumb = [] }) => {
    let { t } = useTranslation();
    return (
        <Layout className="layout">
            <Nav />
            <Content className={"site-layout " + styles['content-layout']} style={{ marginTop: 64 }}>
                <Breadcrumb separator=">" style={{ margin: '16px 0' }}>
                    {breadcrumb.map((bread, index) => (<Breadcrumb.Item key={index}>
                        <Link href={bread.path}>
                            <a>{bread.name}</a>
                        </Link>
                    </Breadcrumb.Item>))}
                </Breadcrumb>
                <div className={styles['site-layout-background']}>
                    {children}
                </div>
            </Content>
            <MyFooter />
        </Layout>
    );
}

export default MainLayout;