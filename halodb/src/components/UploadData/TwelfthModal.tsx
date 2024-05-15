import React from 'react';

import { Button, Input, Modal, Form, Select } from 'antd';

const FormModal = ({opened, previousSeter, actualSeter, nextSeter, form}) => {
  const nextPage = async () => {
      await form.validateFields();
      actualSeter(false);
      nextSeter(true)
  }
  return (
  <Modal
  title="Upload data (12/15)"
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
       <h2> Other information details on the organism </h2>
       <Form
          form={form}
          name="Other"
          labelCol={{ span:8  }}
          wrapperCol={{ span: 16  }}
          initialValues={{ remember: true }}
          autoComplete="off"
      >

      <Form.Item
      name="bios"
      label="Biosafety level"
      >
      <Select defaultValue="BSL-1"  options={[
        { value: 'BSL-1', label: 'BSL-1' },
        { value: 'BSL-2', label: 'BSL-2' },
        { value: 'BSL-3', label: 'BSL-3' },
        { value: 'BSL-4', label: 'BSL-4' },
        ]}/>
      </Form.Item>
      <Form.Item
      name="habt"
      label="Habitat"
      >
      <Input/>
      </Form.Item>
      <Form.Item
      name="bior"
      label="Biotic relationship"
      >
      <Input/>
      </Form.Item>
      <Form.Item
      name="host"
      label="Symbiosis with the host"
      >
      <Input/>
      </Form.Item>
      <Form.Item
      name="path"
      label="Known pathogenicity"
      >
      <Input/>
      </Form.Item>
      <Form.Item
      name="extr"
      label="Miscellaneous"
      >
      <Input/>
      </Form.Item>
      </Form>
    </Modal>
    )    
}
    
    export default FormModal