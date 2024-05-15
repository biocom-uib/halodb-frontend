import React from 'react';

import { Button, Input, Modal, Form} from 'antd';

const FifthModal = ({opened, previousSeter, actualSeter, nextSeter, form}) => {
  const nextPage = async () => {
      await form.validateFields();
      actualSeter(false);
      nextSeter(true)
  }
  return (
  <Modal
  title="Upload data (5/15)"
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
       <h2> Information on the autorship and publications </h2>
       <Form
          form={form}
          name="Autorship"
          labelCol={{ span:8  }}
          wrapperCol={{ span: 16  }}
          initialValues={{ remember: true }}
          autoComplete="off"
      >
     <Form.Item
      name="auth"
      label="Authors"
      >
      <Input />
      </Form.Item>
      <Form.Item
      name="titl"
      label="Title"
      >
      <Input />
      </Form.Item>
      <Form.Item
      name="jour"
      label="Journal"
      >
      <Input />
      </Form.Item>
      <Form.Item
      name="volume"
      label="Volume"
      >
      <Input />
      </Form.Item>
      <Form.Item
      name="pages"
      label="Pages"
      >
      <Input />
      </Form.Item>
      <Form.Item
      name="doi"
      label="DOI"
      >
      <Input />
      </Form.Item>
      <Form.Item
      name="coau"
      label="Corresponding author"
      >
      <Input />
      </Form.Item>
      <Form.Item
      name="emau"
      label="Email of the corresponding author"
      >
      <Input />
      </Form.Item>
      </Form>
    </Modal>
    )    
}
    
    export default FifthModal