import React from 'react';

import { Button, Input, Modal, Form, Select } from 'antd';
import { modalHeight, modalWidth } from '../../constants';

const FormModal = ({opened, previousSeter, actualSeter, nextSeter, form}) => {
  const nextPage = async () => {
      await form.validateFields();
      actualSeter(false);
      nextSeter(true)
  }
  return (
  <Modal
  title="Upload data (8/11)"
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
       <h2> Basic metabolic traits determined under culture conditions </h2>
       <Form
          form={form}
          name="Culture"
          labelCol={{ span:8  }}
          wrapperCol={{ span: 16  }}
          initialValues={{ remember: true }}
          autoComplete="off"
      >
      <Form.Item
      name="emet"
      label="Energy metabolism"
      >
      <Input />
      </Form.Item>
      <Form.Item
      name="orel"
      label="Relationship to O_2"
      >
      <Input />
      </Form.Item>
      <Form.Item
      name="elac"
      label="Terminal electron acceptor"
      >
      <Input />
      </Form.Item>
      <Form.Item
      name="temo"
      label="Temperature optimum"
      >
      <Input />
      </Form.Item>
      <Form.Item
      name="teml"
      label="Lowest temperature for growth"
      >
      <Input />
      </Form.Item>
      <Form.Item
      name="temh"
      label="Highest temperature for growth"
      >
      <Input />
      </Form.Item>
      <Form.Item
      name="temc"
      label="Temperature category"
      >
      <Select defaultValue="Pshychrophyles"  options={[
        { value: 'Pshychrophyles', label: 'Pshychrophyles' },
        { value: 'Mesophiles', label: 'Mesophiles' },
        { value: 'Moderate thermophiles', label: 'Moderate thermophiles' },
        { value: 'Thermophiles', label: 'Thermophiles' },
        { value: 'Hyperthermophiles', label: 'Hyperthermophiles' },
        ]}/>
      </Form.Item>
      <Form.Item
      name="phop"
      label="pH optimum"
      >
      <Input />
      </Form.Item>
      <Form.Item
      name="phlo"
      label="Lowest pH for growth"
      >
      <Input />
      </Form.Item>
      <Form.Item
      name="phhi"
      label="Highest pH for growth"
      >
      <Input />
      </Form.Item>
      </Form>
    </Modal>
    )    
}
    
    export default FormModal