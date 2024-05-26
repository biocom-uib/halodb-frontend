import React, {useState, useEffect} from 'react';

import { Button, Input, Modal, Form, Slider, Select} from 'antd';
import { modalHeight, modalWidth } from '../../constants';
import { get_table } from '../../utils/get_tables';
import { consoleLogger } from '../../utils/logger';

const FifthModal = ({opened, previousSeter, actualSeter, nextSeter, form}) => {
  const [options, setOptions] = useState([])
  const nextPage = async () => {
      await form.validateFields();
      actualSeter(false);
      nextSeter(true)
  }
  useEffect(() => {
    async function getOptions() {
        const options = await get_table('method');
        setOptions(options);
    }
    getOptions();
 }, [])

  consoleLogger('options 5Modal', options);
  return (
  <Modal
  title="Upload data (5/15)"
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
      name="completeness"
      label="Completeness"
      >
      <Slider defaultValue={0} />
      </Form.Item>
      <Form.Item
      name="contamination"
      label="Level of contamination"
      >
      <Slider defaultValue={0} />
      </Form.Item>
      <Form.Item
      name="method"
      label="Method used to estimate completeness and contamination"
      >
      <Select defaultValue=""  options={options}/>
      </Form.Item>
      <Form.Item
      name="gsiz"
      label="Genome size (estimated or actual)"
      >
      <Input />
      </Form.Item>
      <Form.Item
      name="ggcm"
      label="GC mol %"
      >
      <Slider defaultValue={0} />
      </Form.Item>
      <Form.Item
      name="dnae"
      label="DNA extraction method"
      >
      <Input />
      </Form.Item>
      <Form.Item
      name="asem"
      label="Assembly"
      >
      <Input />
      </Form.Item>
      <Form.Item
      name="asft"
      label="Assembly software used and parameters"
      >
      <Input />
      </Form.Item>

      <Form.Item
      name="seqt"
      label="Sequencing Technology"
      >
      <Input />
      </Form.Item>
      <Form.Item
      name="bins"
      label="Binning software used"
      >
      <Input />
      </Form.Item>
      <Form.Item
      name="binsparams"
      label="Parameters used with bins"
      >
      <Input />
      </Form.Item>
      </Form>
    </Modal>
    )    
}
    
    export default FifthModal