import { Modal, Row, Col, Form, Input, Select, Spin, InputNumber } from 'antd';
import UploadBlock from '@/comps/forms/UploadBlock';
import useTranslation from 'next-translate/useTranslation';

import React, { useState } from 'react';

const ProductModal = ({ form, visible, onSubmit, onClose, confirmLoading, imageUrl = "", setImageUrl, loadingModal = false, modalType = 'create' }) => {
    let { t } = useTranslation();

    return (<Modal
        centered
        title={modalType == 'create' ? t('common:createTitle', { text: t('product:title') }) : t('common:editTitle', { text: t('product:title') })}
        visible={visible}
        onOk={() => onSubmit(modalType)}
        okText={t('common:form.submit')}
        onCancel={onClose}
        cancelText={t('common:form.cancel')}
        confirmLoading={confirmLoading}
        width={860}
        forceRender
    >
        <Spin tip="Loading..." spinning={loadingModal}>
            <Row gutter={16}>
                <Col xs={24} sm={24} md={10}>
                    <div style={{ marginBottom: "6px" }}>
                        {t('product:form.image')}
                    </div>
                    <div style={{ width: "100%", textAlign: "center" }}>
                        <UploadBlock imageUrl={imageUrl} setImageUrl={setImageUrl} button={t('product:form.image_upload_button')} />
                    </div>
                </Col>
                <Col xs={24} sm={24} md={14}>
                    <Form
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        layout="vertical"
                        size="small"
                        form={form}
                    >
                        <Form.Item
                            name="productId"
                            noStyle
                        >
                            <Input type="hidden" />
                        </Form.Item>
                        <Row gutter={16}>
                            <Col span="12">
                                <Form.Item
                                    name="product_name"
                                    label={t('product:form.name')}
                                    rules={[
                                        {
                                            required: true,
                                            message: t('validate:required', { text: t('product:form.name') })
                                        }
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span="12">
                                <Form.Item
                                    name="qty"
                                    label={t('product:form.qty')}
                                    rules={[
                                        {
                                            required: true,
                                            message: t('validate:required', { text: t('product:form.qty') })
                                        }
                                    ]}
                                >
                                    <InputNumber style={{ width: "100%" }} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span="12">
                                <Form.Item
                                    name="price"
                                    label={t('product:form.price')}
                                    rules={[
                                        {
                                            required: true,
                                            message: t('validate:required', { text: t('product:form.price') })
                                        }
                                    ]}
                                >
                                    <InputNumber style={{ width: "100%" }} />
                                </Form.Item>
                            </Col>
                            <Col span="12">
                                <Form.Item
                                    name="weight"
                                    label={t('product:form.weight')}
                                    rules={[
                                        {
                                            required: true,
                                            message: t('validate:required', { text: t('product:form.weight') })
                                        }
                                    ]}
                                >
                                    <InputNumber style={{ width: "100%" }} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span="12">
                                <Form.Item
                                    name="sku"
                                    label={t('product:form.sku')}
                                    rules={[
                                        {
                                            required: true,
                                            message: t('validate:required', { text: t('product:form.sku') })
                                        }
                                    ]}
                                >
                                    <InputNumber style={{ width: "100%" }} />
                                </Form.Item>
                            </Col>
                            <Col span="12">
                                <Form.Item
                                    name="cost"
                                    label={t('product:form.cost')}
                                    rules={[
                                        {
                                            required: true,
                                            message: t('validate:required', { text: t('product:form.cost') })
                                        }
                                    ]}
                                >
                                    <InputNumber style={{ width: "100%" }} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span="12">
                                <Form.Item
                                    name="vat"
                                    label={t('product:form.vat')}
                                    rules={[
                                        {
                                            required: true,
                                            message: t('validate:required', { text: t('product:form.vat') })
                                        }
                                    ]}
                                >
                                    <InputNumber style={{ width: "100%" }} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Spin>
    </Modal >);
}

export default ProductModal;