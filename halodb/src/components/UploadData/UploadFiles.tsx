import React, { useState } from 'react';
import axios from 'axios'

import { Progress, Upload, Button, Input, Modal, message } from 'antd';
import type { UploadProps } from 'antd';

import { UploadOutlined } from '@ant-design/icons';
import { consoleLogger } from '../../utils/logger';


const FormModal = ({opened, seter, user, sampleId, sampleIdSeter}) => {
  const [percentage, setPercentage] = useState({'file_1': 0, 'file_2': 0, 'file_3': 0});
  const [percentage_1, setPercentage1] = useState(0);
  const [percentage_2, setPercentage2] = useState(0);
  const [percentage_3, setPercentage3] = useState(0);
  const props: UploadProps = {
    name: 'file',
    action: 'https://biocom.uib.es/halodb/upload/test/',
    headers: {
      "Content-Type": "multipart/form-data",
      'Authorization': user ? "Bearer " + user.accessToken : null
    },
    customRequest: (options: any) => {
      consoleLogger('options', options)
			const data= new FormData()
			data.append('file', options.file)
			var config= {
				"headers": {
					"content-type": 'multipart/form-data; boundary=----WebKitFormBoundaryqTqJIxvkWFYqvP5s'
				},
        onUploadProgress: function(progressEvent) {
          var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
          percentage[options.data['input_type']] = percentCompleted
          setPercentage(percentage);
          consoleLogger('percentage', percentCompleted);
          consoleLogger(percentage);
          setPercentage1(percentage['file_1']);
          setPercentage2(percentage['file_2']);
          setPercentage3(percentage['file_3']);
        }
			}
      data.append('input_type', options.data['input_type'])
      data.append('sampleId', sampleId)
			axios.post(options.action, data, config).then((res: any) => {
				options.onSuccess(res.data, options.file)
			}).catch((err: Error) => {
				console.log(err)
			})
			
		},
    onChange(info) {
      consoleLogger('info', info)
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <Modal
    title="Upload files"
    centered
    open={opened}
    width={1000}
    styles={{body: {height: 630}}}
    onOk={() => seter(false)}
    onCancel={() => seter(false)}
    footer={[
      <Button key="Cancel" onClick={() => seter(false)}>
        Close
      </Button>
    ]}
  >
    <h4> Sample Identifier 
    <Input defaultValue={sampleId} onInput={(event) => {if (event.target  && event.target['value']) {consoleLogger(event.target['value']); sampleIdSeter(event.target['value'])}}}/>
    </h4>
   
   <h3> File 1</h3>
  <Upload data={{'input_type': 'file_1'}} {...props}>
    <Button icon={<UploadOutlined />}>Select File</Button>
    <Progress type="circle" size={30} percent={percentage_1} style={{margin: 16}} />
  </Upload>
  
  
  <h3> File 2</h3>
  <Upload data={{'input_type': 'file_2'}} {...props}>
    <Button icon={<UploadOutlined />}>Select File</Button>
    <Progress type="circle" size={30} percent={percentage_2} style={{margin: 16}} />
  </Upload>
  <h3> File 3</h3>
  <Upload data={{'input_type': 'file_3'}} {...props}>
    <Button icon={<UploadOutlined />}>Select File</Button>
    <Progress type="circle" size={30} percent={percentage_3} style={{margin: 16}} />
  </Upload>
  
  </Modal>
    )    
}
    
    export default FormModal