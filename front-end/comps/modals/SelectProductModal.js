import { Modal, Row, Col, Avatar, Typography, Input } from 'antd';
import useTranslation from 'next-translate/useTranslation';
import MainAjaxTable from '@/comps/table/MainAjaxTable';

import axios from "@/plugins/axios.config";
import React, { useState, useImperativeHandle, useEffect } from 'react';

const { Search } = Input;
const { Text } = Typography;
const SelectProductModal = ({ visible, onClose, orderProducts, setProducts, calculatePrice }, ref) => {
    let { t } = useTranslation();
    const [productList, setProductList] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const DEFAULT_DATA = {
        pagination: {
            current: 1,
            pageSize: 4,
        }
    }
    const [tableProps, setTableProps] = useState({
        loading: false,
        pagination: {
            ...DEFAULT_DATA.pagination
        },
    });
    const [searchKey, setSearchKey] = useState(null);
    useEffect(() => {
        fetch({
            pagination: {
                ...DEFAULT_DATA.pagination
            },
        })
    }, [searchKey])

    const columns = [
        {
            title: 'รูป',
            dataIndex: 'image',
            align: 'center',
            key: 'image',
            render: function avatar(image) {
                return (<Avatar
                    size={64}
                    src={image}
                    alt=""
                />)
            }
        },
        {
            title: 'ชื่อสินค้า',
            dataIndex: 'product_name',
            key: 'product_name',
        },
        {
            title: 'รหัส SKU',
            dataIndex: 'sku',
            key: 'sku',
        },
        {
            title: 'ราคา/บาท',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'คงเหลือ',
            dataIndex: 'qty',
            key: 'qty',
            render: function amount(text) {
                let textColor = (parseInt(text) == 0) ? 'danger' : null;
                return (<Text type={textColor}>{text}</Text>)
            }
        },
    ]

    useImperativeHandle(ref, () => ({
        setSelectedProductKeys: setSelectedRowKeys
    }), [])

    const onSelectChange = selectedRowKeys => {
        setSelectedRowKeys(selectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
        onSelect: (record, selected) => {
            let newOrderProduct = (selected) ? [...orderProducts, { ...record, amount: 1 }] :
                orderProducts.filter(item => item._id != record._id);
            calculatePrice(newOrderProduct);
            setProducts(newOrderProduct);
            setSelectedRowKeys()
        },
        getCheckboxProps: (record) => ({
            disabled: record.qty == 0,
            // Column configuration not to be checked
            name: record.product_name,
        }),
        hideSelectAll: true
    };

    const fetch = async (params = {}) => {
        setTableProps({ ...tableProps, loading: true });
        return axios({
            method: 'get',
            url: `/api/product`,
            params: {
                ...params.pagination,
                q: searchKey,
            }
        }).then(({ data }) => {
            setProductList(data.products);
            setTableProps({
                ...tableProps,
                loading: false,
                pagination: {
                    ...data.pagination,
                    total: data.total,
                }
            });
        });
    }



    return (<Modal
        centered
        title={t('order:form.productList')}
        visible={visible}
        onCancel={onClose}
        width={860}
        forceRender
        footer={null}
    >
        <Row style={{ marginBottom: '1rem' }}>
            <Col span={24}>
                <Search
                    size="large"
                    placeholder={t('common:search_input', { text: t('product:title') })}
                    allowClear
                    onSearch={(value) => setSearchKey(value)}
                    style={{
                        width: 300,
                    }}
                />
            </Col>
        </Row>
        <Row gutter={16}>
            <Col span={24}>
                <MainAjaxTable
                    rowSelection={{
                        ...rowSelection,
                    }}
                    fetchData={fetch}
                    dataSource={productList}
                    columns={columns}
                    tablePagination={tableProps.pagination}
                    loading={tableProps.loading}
                />
            </Col>
        </Row>
    </Modal >);
}

export default React.forwardRef(SelectProductModal);