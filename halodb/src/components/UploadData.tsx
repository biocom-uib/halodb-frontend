import React, { useState } from 'react';
import axios from 'axios'

import { Form, message } from 'antd';
import { consoleLogger } from '../utils/logger';
import FirstModal from './UploadData/FirstModal';
import SecondModal from './UploadData/SecondModal';
import ThirdModal from './UploadData/ThirdModal';
import FourthModal from './UploadData/FourthModal';
import FifthModal from './UploadData/FifthModal';
import SixthModal from './UploadData/SixthModal';
import SeventhModal from './UploadData/SeventhModal';
import EighthModal from './UploadData/EighthModal';
import NinthModal from './UploadData/NinthModal';
import TenthModal from './UploadData/TenthModal';
import EleventhModal from './UploadData/EleventhModal';
import UploadFiles from './UploadData/UploadFiles';



const UploadData = ({firstModal, firstModalSeter, user}) => {
    const [Modal2, setModal2] = useState(false);
    const [Modal3, setModal3] = useState(false);
    const [Modal4, setModal4] = useState(false);
    const [Modal5, setModal5] = useState(false);
    const [Modal6, setModal6] = useState(false);
    const [Modal7, setModal7] = useState(false);
    const [Modal8, setModal8] = useState(false);
    const [Modal9, setModal9] = useState(false);
    const [Modal10, setModal10] = useState(false);
    const [Modal11, setModal11] = useState(false);
    const [pushedSample, setPushedSample] = useState('');
    const [ModalPushFiles, setModalPushFiles] = useState(false);
    const [form] = Form.useForm();
    const pushData = async() => {
        const values = await form.validateFields();
    
        await axios.post(
          'https://biocom.uib.es/halodb/upload/sample/',
          values,{
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': user ? "Bearer " + user.accessToken : null
          }})
        .then((response) => {
          consoleLogger('response', response);
          setModal11(false)
          setModalPushFiles(true)
          message.success('Data uploaded')
        })
        .catch((response) => {
          consoleLogger(response);
          setModal11(false)
          setModalPushFiles(true)
          message.error(response.message)
        })
      }


 return (
    <>
    <FirstModal opened={firstModal} actualSeter={firstModalSeter} nextSeter={setModal2} form={form} />
    <SecondModal opened={Modal2} previousSeter={firstModalSeter} actualSeter={setModal2} nextSeter={setModal3} form={form} />
    <ThirdModal opened={Modal3} previousSeter={setModal2} actualSeter={setModal3} nextSeter={setModal4} form={form} />
    <FourthModal opened={Modal4} previousSeter={setModal3} actualSeter={setModal4} nextSeter={setModal5} form={form} />
    <FifthModal opened={Modal5} previousSeter={setModal4} actualSeter={setModal5} nextSeter={setModal6} form={form} />
    <SixthModal opened={Modal6} previousSeter={setModal5} actualSeter={setModal6} nextSeter={setModal7} form={form} />
    <SeventhModal opened={Modal7} previousSeter={setModal6} actualSeter={setModal7} nextSeter={setModal8} form={form} />
    <EighthModal opened={Modal8} previousSeter={setModal7} actualSeter={setModal8} nextSeter={setModal9} form={form} />
    <NinthModal opened={Modal9} previousSeter={setModal8} actualSeter={setModal9} nextSeter={setModal10} form={form} />
    <TenthModal opened={Modal10} previousSeter={setModal9} actualSeter={setModal10} nextSeter={setModal11} form={form} />
    <EleventhModal opened={Modal11} previousSeter={setModal10} actualSeter={setModal11} submit={pushData} form={form} />
    <UploadFiles opened={ModalPushFiles} seter={setModalPushFiles} user={user} sampleId={pushedSample} sampleIdSeter={setPushedSample} />
    </>
 )
}
export default UploadData