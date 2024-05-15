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
  title="Upload data (13/15)"
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
       <h2> Sample information </h2>
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