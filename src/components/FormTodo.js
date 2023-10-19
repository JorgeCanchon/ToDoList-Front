import React, { Fragment } from 'react';
import { Form, Input, Button, Switch, Select, DatePicker } from 'antd';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

export const FormTodo = ({ onFinish, checked, onChange, categorias }) => {
    const [form] = Form.useForm();
    const onReset = () => {
        form.resetFields();
    };

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    const onChangeDate = (date, dateString) => {
        console.log(date, dateString);
      };

    return (
        <Fragment>
            <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
                <Form.Item name="titulo" label="Titulo:" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="descripcion" label="Descripcion:" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="fecha" label="Fecha limite:" rules={[{ required: true }]}>
                    <DatePicker onChange={onChangeDate} className="ant-form-item-control" />
                </Form.Item>
                <Form.Item name="categoriaId" label="Categoria:" rules={[{ required: true }]}>
                    <Select
                        onChange={handleChange}
                        options={[
                            {
                                value: '0',
                                label: 'Seleccione...',
                            },
                            ...categorias.map(x => ({
                                value: x.id,
                                label: x.nombre,
                            }))
                        ]}
                    />
                </Form.Item>
                <Form.Item label="Completada">
                    <Switch checked={checked} onChange={onChange} />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" style={{ margin: '25px' }}>
                        Enviar
                    </Button>
                    <Button htmlType="button" onClick={onReset}>
                        Limpiar
                    </Button>
                </Form.Item>
            </Form>
        </Fragment>
    );
}

export default FormTodo;