import React from 'react';

import { Button, Input, Modal, Form } from 'antd';

const FormModal = ({opened, previousSeter, actualSeter, submit, form}) => {

  return (
  <Modal
  title="Upload data (15/15)"
  centered
  open={opened}
  width={1000}
  styles={{body: {height: 630}}}
  onOk={async () => await submit()}
  onCancel={() => actualSeter(false)}
  footer={[
    <Button key="Cancel" onClick={() => actualSeter(false)}>
      Cancel
    </Button>,
    <Button key="Back" type="primary" onClick={() => {actualSeter(false); previousSeter(true)}}>
    Back
</Button>,
    <Button key="Next" type="primary" htmlType='submit' onClick={async () => await submit()}>
     Submit
    </Button>
  ]}
  >
       <h2> Sequencing Information </h2>
       <Form
          form={form}
          name="Sequencing"
          labelCol={{ span:8  }}
          wrapperCol={{ span: 16  }}
          initialValues={{ remember: true }}
          autoComplete="off"
      >

      <Form.Item
      name="assembled"
      label="Assembled file identifier"
      >
      <Input/>
      </Form.Item>
      <Form.Item
      name="assname"
      label="Assembled file name"
      >
      <Input/>
      </Form.Item>
      <Form.Item
      name="asize"
      label="Assembly size"
      >
      <Input/>
      </Form.Item>
      <Form.Item
      name="contignumber"
      label="Number of contigs"
      >
      <Input/>
      </Form.Item>
      <Form.Item
      name="pgenes"
      label="Predicted genes file identifier"
      >
      <Input/>
      </Form.Item>
      <Form.Item
      name="pgenesname"
      label="Predicted genes file name"
      >
      <Input/>
      </Form.Item>
      <Form.Item
      name="twentythreesr"
      label="235 rRNA gene accession number"
      >
      <Input/>
      </Form.Item>
      <Form.Item
      name="nagoya"
      label="Nagoya Protocol"
      >
      <Input/>
      </Form.Item>
      <Form.Item
      name="sequrl"
      label="Sequrl"
      >
      <Input/>
      </Form.Item>
      <Form.Item
      name="strccol"
      label="Strain collection number"
      >
      <Input/>
      </Form.Item>
      </Form>
    </Modal>
    )    
}
    
    export default FormModal