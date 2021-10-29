import { Row, Col, Form, Card, Typography, Button, message } from 'antd';
import ManagePageLayout from '@/comps/layouts/ManagePageLayout';
import useTranslation from 'next-translate/useTranslation';
import SelectCustomer from '@/comps/forms/SelectCustomer';
import OrderDetailForm from '@/comps/forms/OrderDetailForm'

import React, { useState, useEffect, useRef } from 'react';
import axios from '@/plugins/axios.config';
import router from 'next/router';

const { Title } = Typography;

function EditOrder({ setBreadcrumb }) {
    let { t } = useTranslation();
    const [form] = Form.useForm();
    const orderRef = useRef(null);
    const customerRef = useRef(null);

    useEffect(() => {
        setBreadcrumb([{
            path: '/orders',
            name: t('order:title')
        }, {
            path: '#',
            name: t('common:editTitle', { text: t('order:title') })
        }])
        fetch()
    }, [])

    const fetch = async () => {
        axios.get(`/api/order/${router.query.orderId}`).then(({ data }) => {
            let customer = data.customer_id;
            let prodCost = data.products.reduce((acc, cur) => {
                return acc + (cur.amount * cur.id.price);
            }, 0)
            console.log('data prod', data.products);
            form.setFieldsValue({
                customerName: {
                    value: customer._id,
                    label: `${customer.firstname} ${customer.lastname}`,
                    key: customer._id
                },
                customerId: customer._id,
                phone: customer.phone,
                addrId: customer.addr[0]._id,
                address: customer.addr[0].description,
                ...customer.addr[0],
                discount: prodCost - (data.total_price - data.shipping_cost),
                shippingCost: data.shipping_cost,
                isPaid: data.payment_status === 'paid' ? '1' : '2'
            })
            customerRef.current.setLoading(false);
            orderRef.current.setProduct(data.products.map(item => {
                return { ...item.id, amount: item.amount }
            }));
            orderRef.current.setSelectedProductKeys(data.products.map(item => {
                return item.id._id
            }));

            orderRef.current.setProductCost(prodCost);
            orderRef.current.setOrderShippingCost(data.shipping_cost);
            orderRef.current.setOrderDiscount(prodCost - (data.total_price - data.shipping_cost));
        })
    }

    const onSubmitOrder = (productList, productCost, orderShippingCost, orderDiscount) => {
        orderRef.current.setSubmit(true);
        form.validateFields().then(async (values) => {
            let formData = values;
            console.log(formData);
            formData['totalCost'] = productList.reduce((acc, cur) => { return acc + (parseFloat(cur.cost) * parseInt(cur.amount)) }, 0);
            formData['totalWeight'] = productList.reduce((acc, cur) => { return acc + (parseFloat(cur.weight) * parseInt(cur.amount)) }, 0);
            formData['totalPrice'] = productCost + orderShippingCost - orderDiscount;
            formData['products'] = productList.map(prod => {
                return { id: prod._id, amount: prod.amount }
            })
            axios({
                method: 'put',
                url: `/api/order/${router.query.orderId}`,
                data: formData,
            }).then(({ data }) => {
                if (data.success) {
                    router.push('/orders')
                }
                orderRef.current.setSubmit(false);
            }).catch(err => {
                let errorMessage = typeof err.response !== "undefined" ? err.response.data.message : err.message;
                message.error(errorMessage);
                orderRef.current.setSubmit(false);
            });
        }).catch(errorInfo => {
            message.error("กรุณาตรวจสอบข้อมูลที่กรอก");
            if (productList.length < 1) {
                setTimeout(() => {
                    message.error("กรุณาเลือกสินค้าอย่างน้อย 1 ชิ้น");
                }, 300);
            }
            orderRef.current.setSubmit(false);
        });
    }

    return (
        <ManagePageLayout title={t('common:editTitle', { text: t('order:title') })} backRoute="/orders">
            <Card>
                <Form
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    layout="vertical"
                    form={form}
                >
                    <Title level={3}>{t('order:form.customerInfo')}</Title>
                    <div style={{ marginLeft: '2rem' }}>
                        <SelectCustomer ref={customerRef} form={form} defaultLoading={true} />
                    </div>
                    <Row style={{ marginTop: '2rem' }} justify="space-between">
                        <Col xs={12} md={16}>
                            <Title level={3}>{t('order:form.productList')}</Title>
                        </Col>
                        <Col xs={12} md={8} style={{ textAlign: 'right' }}>
                            <Button type="primary" size="large" onClick={() => orderRef.current.showModal(true)} >{t('order:form.selectProduct')}</Button>
                        </Col>
                    </Row>
                    <div style={{ marginLeft: '2rem' }}>
                        <OrderDetailForm
                            ref={orderRef}
                            onSubmit={onSubmitOrder}
                        />
                    </div>
                </Form>
            </Card>
        </ManagePageLayout>
    )
}

export default EditOrder