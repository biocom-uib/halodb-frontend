import React, { useState } from 'react';
import axios from 'axios'

import { Progress, Upload, Button, Input, Modal, message } from 'antd';
import type { UploadProps } from 'antd';

import { UploadOutlined } from '@ant-design/icons';
import { consoleLogger } from '../../utils/logger';
import { SERVER_HOST, modalHeight, modalWidth } from '../../constants';


const FormModal = ({opened, seter, user, sampleId, sampleIdSeter}) => {
  const [percentage, setPercentage] = useState({'rreads': 0, 'treads': 0, 'assembled': 0, 'pgenes': 0});
  const [percentage_1, setPercentage1] = useState(0);
  const [percentage_2, setPercentage2] = useState(0);
  const [percentage_3, setPercentage3] = useState(0);
  const [percentage_4, setPercentage4] = useState(0);
  const props: UploadProps = {
    name: 'file',
    action: SERVER_HOST + 'upload/sample/',
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
					"content-type": 'multipart/form-data; boundary=----WebKitFormBoundaryqTqJIxvkWFYqvP5s',
          'Authorization': user ? "Bearer " + user.accessToken : null
				},
        onUploadProgress: function(progressEvent) {
          var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
          percentage[options.data['input_type']] = percentCompleted
          setPercentage(percentage);
          consoleLogger('percentage', percentCompleted);
          consoleLogger(percentage);
          setPercentage1(percentage['rreads']);
          setPercentage2(percentage['treads']);
          setPercentage3(percentage['assembled']);
          setPercentage4(percentage['pgenes']);
        }
			}
      data.append('input_type', options.data['input_type'])
      data.append('sampleId', sampleId)
			axios.put(options.action + sampleId + '/' + options.data['input_type'], data, config).then((res: any) => {
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
    width={modalWidth}
    styles={{body: {height: modalHeight}}}
    onOk={() => {seter(false); sampleIdSeter(null);}}
    onCancel={() => {seter(false); sampleIdSeter(null);}}
    footer={[
      <Button key="Cancel" onClick={() => {seter(false); sampleIdSeter(null);}}>
        Close
      </Button>
    ]}
  >
    <h4> Sample Identifier 
    <Input defaultValue={sampleId} value={sampleId} onInput={(event) => {if (event.target  && event.target['value']) {consoleLogger(event.target['value']); sampleIdSeter(event.target['value'])}}}/>
    </h4>

   
   <h3> Raw Reads</h3>
  <Upload data={{'input_type': 'rreads'}} {...props}>
    <Button icon={<UploadOutlined />}>Select File</Button>
    <Progress type="circle" size={30} percent={percentage_1} style={{margin: 16}} />
  </Upload>
  
  
  <h3> Trimmed reads</h3>
  <Upload data={{'input_type': 'treads'}} {...props}>
    <Button icon={<UploadOutlined />}>Select File</Button>
    <Progress type="circle" size={30} percent={percentage_2} style={{margin: 16}} />
  </Upload>
  <h3> Assembled</h3>
  <Upload data={{'input_type': 'assembled'}} {...props}>
    <Button icon={<UploadOutlined />}>Select File</Button>
    <Progress type="circle" size={30} percent={percentage_3} style={{margin: 16}} />
  </Upload>
  <h3> Predicted genes</h3>
  <Upload data={{'input_type': 'pgenes'}} {...props}>
    <Button icon={<UploadOutlined />}>Select File</Button>
    <Progress type="circle" size={30} percent={percentage_4} style={{margin: 16}} />
  </Upload>
  </Modal>
    )    
}
    
    export default FormModal