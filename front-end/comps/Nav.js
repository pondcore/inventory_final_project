import 'antd/dist/antd.css'
import Link from 'next/link'
import { Layout, Menu } from 'antd'
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import styles from '@/styles/Layout.module.css';
import NAVBAR_MENU from '@/constants/menu.js';

const { Header } = Layout;

export function getStaticProps({ locales }) {
    return {
        props: { locales }
    }
}

const Nav = (props) => {
    const router = useRouter()

    let { t } = useTranslation();

    return (
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <div className={styles.logo} />
            <div className={styles.locale}>
                {router.locales.map((locale, index) => (
                    <div key={locale} className={index == 0 ? styles['locale-first-link'] : styles['locale-link']}>
                        <Link href={router.asPath} locale={locale}>
                            <a className={router.locale == locale ? styles['locale-selected'] : ''}>{locale}</a>
                        </Link>
                    </div>
                ))}
            </div>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={router.route != '/' ? router.route.split("/")[1] : 'home'}>
                {NAVBAR_MENU.map(menu => (
                    <Menu.Item key={menu.key}>
                        <Link href={menu.link}>
                            <a>{t('common:' + menu.locale)}</a>
                        </Link>
                    </Menu.Item>
                ))}
            </Menu>

        </Header >
    );
}

export default Nav;
