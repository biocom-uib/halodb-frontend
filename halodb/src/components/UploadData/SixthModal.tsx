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
  title="Upload data (6/15)"
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
       <h2> Gene and genome information </h2>
       <Form
          form={form}
          name="Gene"
          labelCol={{ span:8  }}
          wrapperCol={{ span: 16  }}
          initialValues={{ remember: true }}
          autoComplete="off"
      >
     <Form.Item
      name="sixteensr"
      label="16S rRNA gene accession number"
      >
      <Input />
      </Form.Item>
      <Form.Item
      name="hkgn"
      label="Alternative housekeeping genes"
      >
      <Input />
      </Form.Item>
      <Form.Item
      name="meca"
      label="Metagenome accession number"
      >
      <Input />
      </Form.Item>
      <Form.Item
      name="gare"
      label="genome/MAG/SAG accession number [RefSeq]"
      >
      <Input />
      </Form.Item>
      <Form.Item
      name="gaem"
      label="genome/MAG/SAG accession number [EMBL]"
      >
      <Input />
      </Form.Item>
      <Form.Item
      name="binn"
      label="genome/MAG/SAG accession number [other]"
      >
      <Input />
      </Form.Item>
      <Form.Item
      name="url"
      label="URL"
      >
      <Input />
      </Form.Item>
      <Form.Item
      name="gsta"
      label="Genome status"
      >
      <Select defaultValue="COMPLETE"  options={[
        { value: 'COMPLETE', label: 'COMPLETE' },
        { value: 'PARTIAL', label: 'PARTIAL' },
        { value: 'DRAFT', label: 'DRAFT' }]}/>
      </Form.Item>
      </Form>
    </Modal>
    )    
}
    
    export default FormModal