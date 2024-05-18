import React from 'react';

import { Button, Input, Modal, Form, Switch } from 'antd';
import { modalHeight, modalWidth } from '../../constants';

const FormModal = ({opened, previousSeter, actualSeter, nextSeter, form}) => {
  const nextPage = async () => {
      await form.validateFields();
      actualSeter(false);
      nextSeter(true)
  }
  return (
  <Modal
  title="Upload data (3/11)"
  centered
  open={opened}
  width={modalWidth}
  styles={{body: {height: modalHeight}}}
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
      name="cult"
      label="Cultered"
      >
      <Switch />
      </Form.Item>
      <Form.Item
      name="koma"
      label="Kind of material"
      >
      <Input />
      </Form.Item>
      <Form.Item
      name="typn"
      label="Designed type material for a new taxon?"
      >
      <Switch />
      </Form.Item>
      <Form.Item
      name="otyp"
      label="Type strain"
      >
      <Input />
      </Form.Item>
      <Form.Item
      name="txnr"
      label="Taxonumber of the type material"
      >
      <Input />
      </Form.Item>
      <Form.Item
      name="ccsu"
      label="Submitted to culture collection"
      >
      <Switch />
      </Form.Item>
      <Form.Item
      name="type"
      label="Designed type strain name"
      >
      <Input />
      </Form.Item>
      <Form.Item
      name="coln"
      label="Strain collection numbers"
      >
      <Input />
      </Form.Item>
      <Form.Item
      name="coth"
      label="Additional comments"
      >
      <Input />
      </Form.Item>
      </Form>
      
    </Modal>
    )    
}
    
    export default FormModal