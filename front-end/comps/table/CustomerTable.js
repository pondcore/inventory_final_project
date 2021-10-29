import { Avatar, Button, Table, Space } from 'antd';
import DeleteModal from '@/comps/modals/DeleteModal';
import useTranslation from 'next-translate/useTranslation';

import axios from '@/plugins/axios.config';
import React, { useState, useEffect, useImperativeHandle } from 'react';

const CustomerTable = ({ onEdit }, ref) => {
    let { t } = useTranslation();




    useImperativeHandle(ref, () => ({
        fetch() {
            fetch({ pagination: tableProps.pagination })
        }
    }));

    useEffect(() => fetch({ pagination: tableProps.pagination }), []);





    return (
        <Table
            dataSource={customers}
            columns={columns}
            tableLayout="auto"
            pagination={tableProps.pagination}
            loading={tableProps.loading}
        />
    );
}

export default React.forwardRef(CustomerTable);
