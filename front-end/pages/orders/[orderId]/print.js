import router from 'next/router'
import useTranslation from 'next-translate/useTranslation';
import ReactToPrint from 'react-to-print';
import OrderCover from "@/comps/printTemplate/OrderCover";
import React, { useEffect, useRef } from 'react';
import ManagePageLayout from '@/comps/layouts/ManagePageLayout';
import { Card, Button } from 'antd';

import axios from '@/plugins/axios.config';

export async function getServerSideProps(context) {
    const data = await axios.get(`/api/order/${context.params.orderId}`);
    return {
        props: { order: data.data },
    }
}


function Print({ order }) {
    let { t } = useTranslation();
    const printRef = useRef(null);

    return (
        <ManagePageLayout title={t('common:printTitle', { text: t('order:title') })} backRoute="/orders">
            <Card>
                <ReactToPrint
                    trigger={() => <Button type="primary">{t('order:table.printButton')}</Button>}
                    content={() => printRef.current}
                />
                <OrderCover ref={printRef} order={order} />
            </Card>
        </ManagePageLayout>
    )
}

export default Print
