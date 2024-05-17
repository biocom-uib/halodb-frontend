import React from 'react';

import { Button, Input, Modal, Form } from 'antd';

const FormModal = ({opened, actualSeter, nextSeter, form}) => {
    const nextPage = async () => {
        await form.validateFields();
        actualSeter(false);
        nextSeter(true)
    }
    return (
    <Modal
    title="Upload data (1/11)"
    centered
    open={opened}
    width={1200}
    styles={{body: {height: 700}}}
    onOk={async () => await nextPage()}
    onCancel={() => actualSeter(false)}
    footer={[
      <Button key="Cancel" onClick={() => actualSeter(false)}>
        Cancel
      </Button>,
      <Button key="Next" type="primary" htmlType='submit' onClick={async () => await nextPage()}>
       Next
      </Button>
    ]}
    >

      <h2> Sample Information </h2>
      <Form
          form={form}
          name="Sample"
          labelCol={{ span:8  }}
          wrapperCol={{ span: 16  }}
          initialValues={{ remember: true }}
          autoComplete="off"
      >

      <Form.Item
      name="name"
      label="Sample name"
      >
      <Input/>
      </Form.Item>
      <Form.Item
      name="stype"
      label="Sample type"
      >
      <Input/>
      </Form.Item>
      <Form.Item
      name="ssize"
      label="Sample size"
      >
      <Input/>
      </Form.Item>
      <Form.Item
      name="ssizeunit"
      label="Sample size unity "
      >
      <Input/>
      </Form.Item>
      <Form.Item
      name="keywords"
      label="Keywords"
      >
      <Input/>
      </Form.Item>
      </Form>
    </Modal>
    )    
}
    
    export default FormModal