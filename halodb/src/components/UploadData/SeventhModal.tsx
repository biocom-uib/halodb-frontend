import React from 'react';

import { Button, Input, Modal, Form, Slider, DatePicker, TimePicker } from 'antd';

const FormModal = ({opened, previousSeter, actualSeter, nextSeter, form}) => {
  const nextPage = async () => {
      await form.validateFields();
      actualSeter(false);
      nextSeter(true)
  }
  return (
  <Modal
  title="Upload data (7/11)"
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
    <Button key="Back" type="primary" onClick={() => {actualSeter(false); previousSeter(true)}}>
    Back
</Button>,
    <Button key="Next" type="primary" htmlType='submit' onClick={async () => await nextPage()}>
     Next
    </Button>
  ]}
  >
       <h2> Metadata on the origin of the sample </h2>
       <Form
          form={form}
          name="Origin2"
          labelCol={{ span:8  }}
          wrapperCol={{ span: 16  }}
          initialValues={{ remember: true }}
          autoComplete="off"
      >
      <Form.Item
      name="dats"
      label="Sampling date"
      >
      <DatePicker />
      </Form.Item>
      <Form.Item
      name="hocs"
      label="Hour of collection of the sample"
      >
      <TimePicker />
      </Form.Item>
      <Form.Item
      name="dati"
      label="Date of isolation"
      >
      <DatePicker />
      </Form.Item>
      <Form.Item
      name="datu"
      label="Date of isolation if unknown"
      >
      <DatePicker />
      </Form.Item>
      <Form.Item
      name="tems"
      label="Temperature of the sample [in celsius degree]"
      >
      <Input />
      </Form.Item>
      <Form.Item
      name="phsa"
      label="pH of the sample"
      >
      <Input />
      </Form.Item>
      <Form.Item
      name="sals"
      label="Salinity of the sample"
      >
      <Slider />
      </Form.Item>
      </Form>

    </Modal>
    )    
}
    
    export default FormModal