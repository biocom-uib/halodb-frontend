import React from 'react';

import { Button, Input, Modal, Form, DatePicker } from 'antd';
import { modalHeight, modalWidth } from '../../constants';


const FormModal = ({opened, previousSeter, actualSeter, nextSeter, form}) => {
    const nextPage = async () => {
        await form.validateFields();
        actualSeter(false);
        nextSeter(true)
    }
    return (
    <Modal
    title="Upload data (2/11)"
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
    <h2> Information on the submission </h2>
       <Form
          form={form}
          name="Submission"
          labelCol={{ span:8  }}
          wrapperCol={{ span: 16  }}
          initialValues={{ remember: true }}
          autoComplete="off"
      >
      <Form.Item
      name="created"
      label="Submission creation date"
      >
      <DatePicker />
      </Form.Item>
      <Form.Item
      name="updated"
      label="Submission updated date"
      >
      <DatePicker />
      </Form.Item>
      </Form>
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

      </Form>

    </Modal>
    )    
}
    
    export default FormModal