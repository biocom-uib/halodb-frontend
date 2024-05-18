import React from 'react';

import { Button, Input, Modal, Form, Slider, Select } from 'antd';
import { modalHeight, modalWidth } from '../../constants';


const FormModal = ({opened, previousSeter, actualSeter, nextSeter, form}) => {
  const nextPage = async () => {
      await form.validateFields();
      actualSeter(false);
      nextSeter(true)
  }
  return (
  <Modal
  title="Upload data (9/11)"
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
          name="Culture3"
          labelCol={{ span:8  }}
          wrapperCol={{ span: 16  }}
          initialValues={{ remember: true }}
          autoComplete="off"
      >
      <Form.Item
      name="salo"
      label="Salinity optimum"
      >
      <Slider />
      </Form.Item>
      <Form.Item
      name="sall"
      label="Lowest NaCl concentration for growth"
      >
      <Input />
      </Form.Item>
      <Form.Item
      name="salh"
      label="Highest NaCl concentration for growth"
      >
      <Input />
      </Form.Item>
      <Form.Item
      name="salw"
      label="Other salts besides NaCl to be reported"
      >
      <Input />
      </Form.Item>
      <Form.Item
      name="salc"
      label="Salinity category"
      >
      <Select defaultValue="Halotolerants"  options={[
        { value: 'Halotolerants', label: 'Halotolerants' },
        { value: 'Slight halophiles', label: 'Slight halophiles' },
        { value: 'Moderate halophiles', label: 'Moderate halophiles' },
        { value: 'Extreme halophiles', label: 'Extreme halophiles' },
        { value: 'Oligohaline', label: 'Oligohaline' },
        { value: 'Mesohaline', label: 'Mesohaline' },
        { value: 'Polihaline', label: 'Polihaline' },
        { value: 'Euhaline', label: 'Euhaline' },
        { value: 'Hyperhaline', label: 'Hyperhaline' },
        { value: 'Fresh water', label: 'Fresh water' },
        { value: 'Brackish water', label: 'Brackish water' },
        { value: 'Saline water', label: 'Saline water' },
        { value: 'Brine', label: 'Brine' },
        ]}/>
      </Form.Item>
      </Form>
    </Modal>
    )    
}
    
    export default FormModal