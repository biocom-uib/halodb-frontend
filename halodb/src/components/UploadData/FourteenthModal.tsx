import React from 'react';

import { Button, Input, Modal, Form, Select, Slider } from 'antd';

const FormModal = ({opened, previousSeter, actualSeter, nextSeter, form}) => {
  const nextPage = async () => {
      await form.validateFields();
      actualSeter(false);
      nextSeter(true)
  }
  return (
  <Modal
  title="Upload data (14/15)"
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
      name="seqdepth"
      label="Sequencing depth"
      >
      <Input/>
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
      name="rreads"
      label="Raw reads"
      >
      <Input/>
      </Form.Item>
      <Form.Item
      name="rreadacc"
      label="Raw reads NCBI accesion code"
      >
      <Input/>
      </Form.Item>
      <Form.Item
      name="rrname"
      label="Name of the orginial file"
      >
      <Input/>
      </Form.Item>
      <Form.Item
      name="rreadsnum"
      label="Raw reads number."
      >
      <Input/>
      </Form.Item>
      <Form.Item
      name="treads"
      label="Trimmed reads"
      >
      <Input/>
      </Form.Item>
      <Form.Item
      name="trname"
      label="Name of the original file containing the trimmed reads."
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
      </Form>
    </Modal>
    )    
}
    
    export default FormModal