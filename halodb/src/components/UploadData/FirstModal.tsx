import React from 'react';

import { Button, Input, Modal, Form, DatePicker } from 'antd';

const FormModal = ({opened, actualSeter, nextSeter, form}) => {
    const nextPage = async () => {
        await form.validateFields();
        actualSeter(false);
        nextSeter(true)
    }
    return (
    <Modal
    title="Upload data (1/15)"
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
      name="txnr"
      label="Taxonumber"
      >
      <Input />
      </Form.Item>
      <Form.Item
      name="version"
      label="Version"
      >
      <Input />
      </Form.Item>
      <Form.Item
      name="entrydate"
      label="Date of the entry"
      >
      <DatePicker />
      </Form.Item>
      <Form.Item
      name="firstdate"
      label="First submission date"
      >
      <DatePicker />
      </Form.Item>
      <Form.Item
      name="draftnumber"
      label="Draft number"
      >
      <DatePicker />
      </Form.Item>
      </Form>
      <h2> Information on the submitter </h2>
       <Form
          form={form}
          name="Gene"
          labelCol={{ span:8  }}
          wrapperCol={{ span: 16  }}
          initialValues={{ remember: true }}
          autoComplete="off"
      >
    
      <Form.Item
      name="subm"
      label="Submitter"
      >
      <Input />
      </Form.Item>
      <Form.Item
      name="emsu"
      label="Email of the submitter"
      >
      <Input />
      </Form.Item>
     </Form>
    </Modal>
    )    
}
    
    export default FormModal