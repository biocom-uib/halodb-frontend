import React from 'react';

import { Button, Input, Modal, Form } from 'antd';

const FormModal = ({opened, previousSeter, actualSeter, nextSeter, form}) => {
  const nextPage = async () => {
      await form.validateFields();
      actualSeter(false);
      nextSeter(true)
  }
  return (
  <Modal
  title="Upload data (3/15)"
  centered
  open={opened}
  width={1000}
  styles={{body: {height: 630}}}
  onOk={async () => await nextPage()}
  onCancel={() => actualSeter(false)}
  footer={[
    <Button key="Cancel" onClick={() => actualSeter(false)}>
      Cancel
    </Button>,
    <Button key="Back" type="primary" onClick={() => {actualSeter(false); previousSeter(true)}}>
    Back
</Button>,
    <Button key="Next" type="primary" htmlType='submit' onClick={async () => await nextPage()}>
     Next
    </Button>
  ]}
  >
               <h2> Information on the kind of material used for the description </h2>
       <Form
          form={form}
          name="Gene"
          labelCol={{ span:8  }}
          wrapperCol={{ span: 16  }}
          initialValues={{ remember: true }}
          autoComplete="off"
      >
      <Form.Item
      name="domain"
      label="Domain name"
      >
      <Input />
      </Form.Item>
      <Form.Item
      name="kingdom"
      label="Kingdom name"
      >
      <Input />
      </Form.Item>
      <Form.Item
      name="phylum"
      label="Phylum name"
      >
      <Input />
      </Form.Item>
      <Form.Item
      name="phylumety"
      label="Phylumety"
      >
      <Input />
      </Form.Item>
      <Form.Item
      name="class"
      label="Class name"
      >
      <Input />
      </Form.Item>
      <Form.Item
      name="classety"
      label="Class etymology"
      >
      <Input />
      </Form.Item>
      <Form.Item
      name="order"
      label="Order name"
      >
      <Input />
      </Form.Item>
      <Form.Item
      name="orderety"
      label="Order etymology"
      >
      <Input />
      </Form.Item>
      <Form.Item
      name="family"
      label="Family name"
      >
      <Input />
      </Form.Item>
      <Form.Item
      name="familyety"
      label="Family etymology"
      >
      <Input />
      </Form.Item>
      </Form>
    </Modal>
    )    
}
    
    export default FormModal