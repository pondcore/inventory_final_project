import React, { useState, useImperativeHandle } from 'react';
import { Row, Col, Form, Input, Spin, Button } from 'antd';
import AutocompleteInput from './AutocompleteInput';
import useTranslation from 'next-translate/useTranslation';
import axios from '@/plugins/axios.config';

const { TextArea } = Input;

function SelectCustomer({ form, defaultLoading = false }, ref) {
    let { t } = useTranslation();
    const [customer, setCustomer] = useState([]);
    const [loadCustomerInfo, setLoadCustomerInfo] = useState(defaultLoading);
    const fetchCustomerList = async (name) => {
        return axios({
            method: 'get',
            url: `/api/customer`,
            params: {
                q: name,
                field: 'prefix firstname lastname',
                limit: 5
            }
        }).then(({ data }) =>
            data.customers.map((cus) => ({
                label: `${cus.firstname} ${cus.lastname}`,
                value: cus._id,
            })),
        );
    }

    useImperativeHandle(ref, () => ({
        setCustomer: setCustomer,
        setLoading: setLoadCustomerInfo,
    }), [])

    const onSelectCustomer = async (newCustomer) => {
        console.log(newCustomer);
        setLoadCustomerInfo(true);
        setCustomer(newCustomer);
        axios({
            url: `/api/customer/${newCustomer.value}`,
            method: 'get',
            type: 'json',
        }).then(({ data }) => {
            form.setFieldsValue({
                customerId: data._id,
                phone: data.phone,
                addrId: data.addr[0]._id,
                address: data.addr[0].description,
                ...data.addr[0]
            })
            setLoadCustomerInfo(false);
        });
    }

    return (<>
        <Spin tip="Loading..." spinning={loadCustomerInfo}>
            <Row gutter={16}>
                <Col xs={24} md={16}>
                    <Form.Item
                        name="customerName"
                        label={t('order:form.customerName')}
                        rules={[
                            {
                                required: true,
                                message: t('validate:required', { text: t('order:form.customerName') })
                            }
                        ]}
                    >
                        <AutocompleteInput
                            value={customer}
                            onChange={onSelectCustomer}
                            fetchOptions={fetchCustomerList}
                            placeholder="ชื่อ สกุล"
                        />
                    </Form.Item>
                    <Form.Item name="customerId" noStyle>
                        <Input type="hidden" />
                    </Form.Item>
                    <Form.Item name="addrId" noStyle>
                        <Input type="hidden" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item
                        name="phone"
                        label={t('order:form.customerPhone')}
                        rules={[
                            {
                                required: true,
                                message: t('validate:required', { text: t('order:form.customerPhone') })
                            },
                            {
                                pattern: new RegExp(/^[0-9]*$/g),
                                message: t('validate:number', { text: t('order:form.customerPhone') })

                            }
                        ]}
                    >
                        <Input maxLength={10} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16} style={{ marginBottom: '1rem', display: 'none' }}>
                <Col xs={6} md={4} lg={2}>
                    <Button type="primary" disabled>แก้ไขที่อยู่</Button>
                </Col>
                <Col xs={6} md={4} lg={2}>
                    <Button type="primary" disabled>กรอกที่อยู่ใหม่</Button>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Form.Item
                        name="address"
                        label={t('customer:form.address')}
                    >
                        <TextArea
                            disabled
                            autoSize={{ minRows: 3, maxRows: 6 }}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col xs={24} md={12} xl={6}>
                    <Form.Item
                        name="province_name"
                        label={t('order:form.customerProvince')}
                        rules={[
                            {
                                required: true,
                                message: t('validate:required', { text: t('order:form.customerProvince') })
                            }
                        ]}
                    >
                        <Input disabled />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12} xl={6}>
                    <Form.Item
                        name="amphur_name"
                        label={t('order:form.customerDistrict')}
                        rules={[
                            {
                                required: true,
                                message: t('validate:required', { text: t('order:form.customerDistrict') })
                            }
                        ]}
                    >
                        <Input disabled />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12} xl={6}>
                    <Form.Item
                        name="tambon_name"
                        label={t('order:form.customerSubdistrict')}
                        rules={[
                            {
                                required: true,
                                message: t('validate:required', { text: t('order:form.customerSubdistrict') })
                            }
                        ]}
                    >
                        <Input disabled />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12} xl={6}>
                    <Form.Item
                        name="post_code"
                        label={t('order:form.customerZipCode')}
                        rules={[
                            {
                                required: true,
                                message: t('validate:required', { text: t('order:form.customerZipCode') })
                            },
                            {
                                pattern: new RegExp(/^[0-9]*$/g),
                                message: t('validate:number', { text: t('order:form.customerZipCode') })

                            }
                        ]}
                    >
                        <Input disabled maxLength={5} />
                    </Form.Item>
                </Col>
            </Row>
        </Spin>
    </>)
}

export default React.forwardRef(SelectCustomer)
