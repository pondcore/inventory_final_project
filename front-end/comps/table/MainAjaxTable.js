import { Table } from 'antd';
import React, { useEffect } from 'react';

const MainAjaxTable = ({ fetchData, tablePagination, ...props }) => {
    const handleTableChange = (pagination) => {
        fetchData({ pagination });
    };

    useEffect(() => {
        fetchData({ pagination: tablePagination });
    }, []);

    return (
        <Table
            pagination={tablePagination}
            onChange={handleTableChange}
            tableLayout="auto"
            rowKey="_id"
            {...props}
        />
    )

}

export default MainAjaxTable;
