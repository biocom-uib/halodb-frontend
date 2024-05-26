import React, { useEffect, useState } from 'react';

import { Button, Input, Modal, Form, Select, Slider } from 'antd';
import { modalHeight, modalWidth } from '../../constants';
import { get_table } from '../../utils/get_tables';
import { consoleLogger } from '../../utils/logger';


const FormModal = ({opened, previousSeter, actualSeter, submit, form}) => {
  const [optionsFraction, setOptionsFraction] = useState([])
  const [optionsTarget, setOptionsTarget] = useState([])
  useEffect(() => {
    async function getOptions() {
        const optionsF = await get_table('fraction');
        setOptionsFraction(optionsF);
        const optionsT = await get_table('target');
        setOptionsTarget(optionsT)
    }
    getOptions();
 }, [])
 consoleLogger('options 11Modal', optionsFraction, optionsTarget);

  return (
  <Modal
  title="Upload data (11/11)"
  centered
  open={opened}
  width={modalWidth}
  styles={{body: {height: modalHeight}}}
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
      name="sfrac"
      label="Sequenced fraction"
      >
      <Select defaultValue=""  options={optionsFraction}/>
      </Form.Item>
      <Form.Item
      name="target"
      label="Target nucleic acids"
      >
      <Select defaultValue=""  options={optionsTarget}/>
      </Form.Item>


      <Form.Item
      name="rreadsnum"
      label="Raw reads number."
      >
      <Input/>
      </Form.Item>
      <Form.Item
      name="treadsnum"
      label="Trimmed reads number."
      >
      <Input/>
      </Form.Item>
      <Form.Item
      name="coverage"
      label="Coverage"
      >
      <Slider/>
      </Form.Item>
      <Form.Item
      name="asize"
      label="Assembly size in base pairs."
      >
      <Input/>
      </Form.Item>
      <Form.Item
      name="contignumber"
      label="Number of contigs."
      >
      <Input/>
      </Form.Item>
      <Form.Item
      name="nagoya"
      label="Information related to the Nagoya Protocol."
      >
      <Input/>
      </Form.Item>
      <Form.Item
      name="sequrl"
      label="Sequrl."
      >
      <Input/>
      </Form.Item>
      <Form.Item
      name="strccol"
      label="Strain Collection number."
      >
      <Input/>
      </Form.Item>
      </Form>
    </Modal>
    )    
}
    
    export default FormModal