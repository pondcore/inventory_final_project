import { Avatar, Button, Space, Form, message } from 'antd';
import IndexPageLayout from '@/comps/layouts/IndexPageLayout';
import useTranslation from 'next-translate/useTranslation';
import ProductModal from '@/comps/modals/ProductModal';
import DeleteModal from '@/comps/modals/DeleteModal';
import MainAjaxTable from '@/comps/table/MainAjaxTable';
import DEFAULT_DATA from '@/constants/dataTable';

import axios from "@/plugins/axios.config";
import React, { useState, useEffect } from 'react';

const Product = ({ setBreadcrumb }) => {
    let { t } = useTranslation();
    const [isCreateVisible, setIsCreateVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [loadingModal, setLoadingModal] = useState(false);
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState();
    const [modalType, setModalType] = useState('create');
    const [products, setProducts] = useState([]);
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

    const fetch = async (params = {}) => {
        setTableProps({ ...tableProps, loading: true });
        return axios({
            method: 'get',
            url: '/api/product',
            params: {
                ...params.pagination,
                q: searchKey,
            }
        }).then(({ data }) => {
            setProducts(data.products);
            setTableProps({
                ...tableProps,
                loading: false,
                pagination: {
                    ...data.pagination,
                    total: data.total,
                }
            });
        });
    };

    useEffect(() => {
        setBreadcrumb([{
            path: '/product',
            name: t('product:title')
        }])
    }, []);

    const manageColumns = (text, record) => (
        <Space size="middle" >
            <Button onClick={() => { showEditModal(record._id) }}>{t('common:editButton')}</Button>
            <DeleteModal
                deleteUrlId={`/api/product/${record._id}`}
                buttonText={t('common:deleteButton')}
                handleConfirm={fetch}
                title={t('common:deleteTitle', { text: t('product:title') })}
                content={t('common:deleteDescription', { text: t('product:title') })}
            />
        </Space>
    );

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
            title: 'น้ำหนัก',
            dataIndex: 'weight',
            key: 'weight',
        },
        {
            title: 'สินค้าในคลัง',
            dataIndex: 'qty',
            key: 'qty',
        },
        {
            title: 'จัดการ',
            width: '10%',
            key: 'action',
            align: 'center',
            render: manageColumns
        },
    ];

    const showCreateModal = async () => {
        setModalType('create');
        setIsCreateVisible(true);
    };

    const handleSubmit = (formType) => {
        setConfirmLoading(true);
        setLoadingModal(true)
        let formData = {
            ...form.getFieldsValue(),
            image: imageUrl,
        }
        let url = formType == 'create' ? '/api/product' : `/api/product/${formData.productId}`;
        axios({
            method: formType == 'create' ? 'POST' : 'PUT',
            url,
            data: formData
        }).then((response) => {
            setIsCreateVisible(false);
            setConfirmLoading(false);
            setLoadingModal(false);
            form.resetFields();
            setImageUrl(null);
            fetch({
                pagination: {
                    ...DEFAULT_DATA.pagination
                }
            });
        }).catch(err => {
            let errorMessage = typeof err.response !== "undefined" ? err.response.data.message : err.message;
            setConfirmLoading(false);
            setLoadingModal(false);
            message.error(errorMessage);
        })
    };

    const handleClose = () => {
        setIsCreateVisible(false);
        setConfirmLoading(false);
        setLoadingModal(false);
        form.resetFields();
        setImageUrl(null);
    };

    const showEditModal = (dataId) => {
        setModalType('update');
        setLoadingModal(true);
        axios.get(`/api/product/${dataId}`).then(({ data }) => {
            form.setFieldsValue({
                productId: dataId,
                product_name: data.product_name,
                price: data.price,
                qty: data.qty,
                weight: data.weight,
                sku: data.sku,
                cost: data.cost,
                vat: data.vat,
            });
            setImageUrl(data.image);
            setLoadingModal(false);
        }).catch(err => {
            let errorMessage = typeof err.response !== "undefined" ? err.response.data.message : err.message;
            setConfirmLoading(false);
            message.error(errorMessage);
        })

        setIsCreateVisible(true);
    }
    return (
        <IndexPageLayout
            title={t('product:title')}
            onSearch={(value) => setSearchKey(value)}
            onCreate={showCreateModal}
        >
            <MainAjaxTable
                fetchData={fetch}
                dataSource={products}
                columns={columns}
                tablePagination={tableProps.pagination}
                loading={tableProps.loading}
            />
            <ProductModal
                form={form}
                modalType={modalType}
                visible={isCreateVisible}
                onSubmit={handleSubmit}
                onClose={handleClose}
                loadingModal={loadingModal}
                confirmLoading={confirmLoading}
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
            />
        </IndexPageLayout >
    )
}

export default Product