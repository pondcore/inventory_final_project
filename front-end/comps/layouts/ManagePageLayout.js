import { Typography, Button, Space } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router'
import Head from 'next/head'

const { Title } = Typography;


const ManagePageLayout = ({ title = "Create", backRoute = '/', children }) => {
    const router = useRouter()
    return (<>
        <Head>
            <title>{title}</title>
        </Head>
        <Space size="middle" style={{ marginBottom: '1rem' }}>
            <Button shape="circle" icon={<ArrowLeftOutlined />} onClick={() => router.push(backRoute)} className="color-primary" />
            <Title level={2} className="color-primary" style={{ marginBottom: 0 }}>{title}</Title>
        </Space>
        {children}
    </>)
}

export default ManagePageLayout;
