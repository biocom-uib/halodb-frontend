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
  title="Upload data (4/15)"
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
      name="gena"
      label="Genus name"
      >
      <Input />
      </Form.Item>
      <Form.Item
      name="gety"
      label="Genus etymology"
      >
      <Input />
      </Form.Item>
      <Form.Item
      name="gent"
      label="Type species of the genus"
      >
      <Input />
      </Form.Item>
      <Form.Item
      name="spep"
      label="Specific epithet"
      >
      <Input />
      </Form.Item>
      <Form.Item
      name="spna"
      label="Species name"
      >
      <Input />
      </Form.Item>
      
      <Form.Item
      name="spty"
      label="Species etymology"
      >
      <Input />
      </Form.Item>
      <Form.Item
      name="baso"
      label="Basonym"
      >
      <Input />
      </Form.Item>
      <Form.Item
      name="ssna"
      label="Subspecies name"
      >
      <Input />
      </Form.Item>
      <Form.Item
      name="ssty"
      label="Subspecies etymology"
      >
      <Input />
      </Form.Item>
      <Form.Item
      name="coth"
      label="Other"
      >
      <Input />
      </Form.Item>
      </Form>
    </Modal>
    )    
}
    
    export default FormModal