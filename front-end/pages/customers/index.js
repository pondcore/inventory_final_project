import { Avatar, Button, Space, Form, message } from 'antd';
import IndexPageLayout from '@/comps/layouts/IndexPageLayout';
import useTranslation from 'next-translate/useTranslation';
import CustomerModal from '@/comps/modals/CustomerModal';
import DeleteModal from '@/comps/modals/DeleteModal';
import MainAjaxTable from '@/comps/table/MainAjaxTable';
import DEFAULT_DATA from '@/constants/dataTable';

import axios from '@/plugins/axios.config';
import React, { useState, useEffect } from 'react';

const Customer = ({ setBreadcrumb }) => {
    let { t } = useTranslation();
    const [isCreateVisible, setIsCreateVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [loadingModal, setLoadingModal] = useState(false);
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState();
    const [modalType, setModalType] = useState('create');
    const [customers, setCustomers] = useState([]);
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
            }
        })
    }, [searchKey])


    const fetch = (params = {}) => {
        setTableProps({ ...tableProps, loading: true });
        axios({
            method: 'get',
            url: '/api/customer',
            params: {
                ...params.pagination,
                q: searchKey,
            }
        }).then(({ data }) => {
            let customerList = [];
            data.customers.forEach((cus, index) => {
                cus.addr.forEach((addr) => {
                    customerList.push({
                        fullname: `${cus.prefix} ${cus.firstname} ${cus.lastname}`,
                        image: cus.image,
                        id: cus._id,
                        key: addr._id,
                        ...addr
                    })
                })
            });
            setCustomers(customerList);
            setTableProps({
                ...tableProps,
                loading: false,
                pagination: {
                    ...tableProps.pagination,
                    total: data.total,
                }
            });
        });
    }

    useEffect(() => {
        setBreadcrumb([{
            path: '/customers',
            name: t('customer:title')
        }])
    }, [])

    const manageColumns = (text, record) => (
        <Space size="middle">
            <Button onClick={() => { showEditModal(record.id, record.key) }}>{t('common:editButton')}</Button>
            <DeleteModal
                deleteUrlId={`/api/customer/${record.key}`}
                buttonText={t('common:deleteButton')}
                handleConfirm={fetch}
                title={t('common:deleteTitle', { text: t('customer:title') })}
                content={t('common:deleteDescription', { text: t('customer:title') })}
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
            title: 'ชื่อ-สกุล',
            dataIndex: 'fullname',
            key: 'fullname',
        },
        {
            title: 'ที่อยู่',
            dataIndex: 'description',
            key: 'description',
            width: 'max-content',
        },
        {
            title: 'ตำบล/แขวง',
            dataIndex: 'tambon_name',
            key: 'tambon_name',
        },
        {
            title: 'อำเภอ/เขต',
            dataIndex: 'amphur_name',
            key: 'amphur_name',
        },
        {
            title: 'จังหวัด',
            dataIndex: 'province_name',
            key: 'province_name',
        },
        {
            title: 'รหัสไปรษณีย์',
            dataIndex: 'post_code',
            key: 'post_code',
        },
        {
            title: 'จัดการ',
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
        let url = formType == 'create' ? '/api/customer' : `/api/customer/${formData.addrId}`;
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

    const showEditModal = (dataId, addrKey) => {
        setModalType('update');
        setLoadingModal(true);
        axios.get(`/api/customer/${dataId}`).then(({ data }) => {
            console.log(data);
            const addrData = data.addr.find(item => item._id === addrKey)
            form.setFieldsValue({
                id: dataId,
                addrId: addrKey,
                prefix: data.prefix,
                firstname: data.firstname,
                lastname: data.lastname,
                phone: data.phone,
                province: addrData.province_name,
                district: addrData.amphur_name,
                subdistrict: addrData.tambon_name,
                postcode: addrData.post_code,
                address: addrData.description
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
            title={t('customer:title')}
            onSearch={(value) => setSearchKey(value)}
            onCreate={showCreateModal}
            setSearchKey={setSearchKey}
        >
            <MainAjaxTable
                fetchData={fetch}
                dataSource={customers}
                columns={columns}
                tablePagination={tableProps.pagination}
                loading={tableProps.loading}
            />
            <CustomerModal
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

export default Customer