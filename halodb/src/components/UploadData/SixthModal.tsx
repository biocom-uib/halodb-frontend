import React from 'react';

import { Button, Input, Modal, Form, Slider } from 'antd';
import { modalHeight, modalWidth } from '../../constants';

const FormModal = ({opened, previousSeter, actualSeter, nextSeter, form}) => {
  const nextPage = async () => {
      await form.validateFields();
      actualSeter(false);
      nextSeter(true)
  }
  return (
  <Modal
  title="Upload data (6/11)"
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
       <h2> Metadata on the origin of the sample </h2>
       <Form
          form={form}
          name="Origin"
          labelCol={{ span:8  }}
          wrapperCol={{ span: 16  }}
          initialValues={{ remember: true }}
          autoComplete="off"
      >
      <Form.Item
      name="coun"
      label="Country of origin"
      >
      <Input />
      </Form.Item>
      <Form.Item
      name="regi"
      label="Region of origin"
      >
      <Input />
      </Form.Item>
      <Form.Item
      name="geol"
      label="Geographic location"
      >
      <Input />
      </Form.Item>
      <Form.Item
      name="lati"
      label="Latitude"
      >
      <Input />
      </Form.Item>
      <Form.Item
      name="long"
      label="Longitude"
      >
      <Slider defaultValue={0} />
      </Form.Item>
      <Form.Item
      name="alti"
      label="Altitude"
      >
      <Input />
      </Form.Item>
      <Form.Item
      name="dept"
      label="Depth"
      >
      <Input />
      </Form.Item>
      <Form.Item
      name="sour"
      label="Source of sample"
      >
      <Input />
      </Form.Item>
      </Form>
    </Modal>
    )    
}
    
    export default FormModal