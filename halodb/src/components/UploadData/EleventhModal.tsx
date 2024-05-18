import React from 'react';

import { Button, Input, Modal, Form, Select, Slider } from 'antd';
import { modalHeight, modalWidth } from '../../constants';

const FormModal = ({opened, previousSeter, actualSeter, submit, form}) => {

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
      <Select defaultValue="Genome"  options={[
        { value: 'Genome', label: 'Genome' },
        { value: 'MAG', label: 'MAG' },
        { value: 'SAG', label: 'SAG' },
        { value: 'Virus', label: 'Virus' },
        { value: 'Virome', label: 'Virome' },
        { value: 'Transcriptome', label: 'Transcriptome' },
        { value: 'Exome', label: 'Exome' },
        { value: 'Microbiome', label: 'Microbiome' },
        { value: 'Epigenome', label: 'Epigenome' },
        { value: 'Metabolome', label: 'Metabolome' },
        { value: 'Meta-epigenome', label: 'Meta-epigenome' },
        { value: 'Metagenome', label: 'Metagenome' },
        { value: 'Metaproteome', label: 'Metaproteome' },
        { value: 'Metavirome', label: 'Metavirome' },
        { value: 'Metatranscriptome', label: 'Metatranscriptome' },
        { value: 'Targeted Sequencing', label: 'Targeted Sequencing' },
        { value: 'Chromatin Conformation Capture', label: 'Chromatin Conformation Capture' },
        { value: 'Phageome', label: 'Phageome' },
        { value: 'Plasmids and Mobile Genetic Elements', label: 'Plasmids and Mobile Genetic Elements' },
        ]}/>
      </Form.Item>
      <Form.Item
      name="target"
      label="Target nucleic acids"
      >
      <Select defaultValue="gDNA"  options={[
        { value: 'gDNA', label: 'gDNA' },
        { value: 'Exome', label: 'Exome' },
        { value: 'mtDNA', label: 'mtDNA' },
        { value: 'cpDNA', label: 'cpDNA' },
        { value: 'mRNA', label: 'mRNA' },
        { value: 'tRNA', label: 'tRNA' },
        { value: 'ncRNA', label: 'ncRNA' },
        { value: 'RNA', label: 'RNA' },
      ]}/>
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