import React, { useState } from 'react';

import axios from 'axios'

import { Button, Input, Modal, FloatButton, Form, message } from 'antd';

import { PlainOptions } from '../data/data2';
import type { FormProps } from 'antd';

import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, auth } from '../services/firebase'

import { consoleLogger } from '../utils/logger'
import { User } from 'firebase/auth'
import Group  from '../components/Groups'
import UploadData from '../components/UploadData';
import ColumnsSelector from '../components/ColumnsSelector';
import DataTable from '../components/DataTable';
import { SERVER_HOST } from '../constants';


type LoginFieldType = {
  email?: string;
  password?: string;
  name?: string;
  surname?: string;
};
interface HaloDbUser extends User {
  name? : string;
  surname? : string;
  accessToken?: string;
}

export interface LoginData {
  user?: HaloDbUser
  message: any
  code: any
}
const Home = () => {
  const [checkedListSubmission, setCheckedListSubmission] = useState([])
  const [checkedListAuthorship, setCheckedListAuthorship] = useState([])
  const [checkedListMaterial, setCheckedListMaterial] = useState([])
  const [checkedListGene, setCheckedListGene] = useState([])
  const [checkedListOrigin, setCheckedListOrigin] = useState([])
  const [checkedListMetabolic, setCheckedListMetabolic] = useState([])
  const [checkedListOrganism, setCheckedListOrganism] = useState([])
  const [checkedListSample, setCheckedListSample] = useState(PlainOptions['Sample'])
  const [checkedListSequencing, setCheckedListSequencing] = useState([])
  const [checkedListFiles, setCheckedListFiles] = useState(PlainOptions['Files'])
  const [data, setData] = useState([]);

  const handleData = (data) => {
    consoleLogger(data);
    

    data.forEach(element => {
      element['action'] = element['access_mode'] === 'readwrite'? 'publish': '';
    });
    setData(data);
  }
  const getData = async() => {
    const config = {
      method: 'GET',
      headers: {'Authorization': user ? "Bearer " + user.accessToken : null}
    }
    await axios(SERVER_HOST + '/user/list/samples/', config)
    .then((response) => { handleData(response.data);})
    .catch((response) => {
      consoleLogger(response);
      message.error(response.message)
    })
  }


  
  const [modal, setModal] = useState(false);

  const [modalData, setModalData] = useState(false);
  const [ModalPushFiles, setModalPushFiles] = useState(false);
  const [modalLogin, setModalLogin] = useState(false);
  const [modalSignup, setModalSignup] = useState(false);
  const [user, setUser] = useState<HaloDbUser>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [modalHandleGroups, setModalHandleGroups] = useState(false);
  
  
  const onFinish: FormProps<LoginFieldType>['onFinish'] = async (values) => {
    console.log('Success:', values);
    
    const firebaseSignedIn = await signInWithEmailAndPassword(auth, values.email, values.password)
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code
        var errorMessage = error.message
        console.log('error:', errorMessage )
        return { message: errorMessage, code: errorCode}
      })
    consoleLogger(firebaseSignedIn)
    const signedIn = firebaseSignedIn as LoginData
    if (signedIn.code) {
      message.error('Invalid credentials')
      return signedIn
    }

    setUser(signedIn.user)
    setLoggedIn(true)
    setModalLogin(false)
  };
  const createUserDB = async(name, surname, email, uid) => {
    consoleLogger('createDBuser', user)
    const values = {
      email: email,
      name: name,
      surname: surname,
      uid: uid,
    }
    await axios.post(
      SERVER_HOST + 'user/',
      values,{
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': user ? "Bearer " + user.accessToken : null
      }})
    .then((response) => {
      consoleLogger('UserCreated', response);
    })
    .catch((response) => {
      consoleLogger(response);
    })
  }

  const onFinishsignup: FormProps<LoginFieldType>['onFinish'] = async (values) => {
    console.log('Success:', values);
    
    await createUserWithEmailAndPassword(auth, values.email, values.password).then(
      async(firebaseSignedIn) => {
        consoleLogger(firebaseSignedIn)
        const signedIn = firebaseSignedIn as unknown as LoginData
        if (signedIn.code) {
          message.error(signedIn.message)
          return signedIn
        }
      const newUser = signedIn.user as HaloDbUser
      newUser.name = values.name
      newUser.surname = values.surname
      setUser(newUser)
      consoleLogger('user', user)
      await createUserDB(newUser.name, newUser.surname, newUser.email, newUser.uid).then(() => {
        setLoggedIn(true)
        setModalSignup(false)
  
      })
      }
    )
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code
        var errorMessage = error.message
        console.log('error:', errorMessage )
        return { message: errorMessage, code: errorCode}
      })

    
  };

  const onFinishFailed: FormProps<LoginFieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const openUploadData = () => {
    consoleLogger(loggedIn)
    if (loggedIn) {
      setModalData(true) 
    }
    else {
      message.error("Only logged users can upload data")
    }
  }
  const openUploadPushFiles = () => {
    if (loggedIn) {
      setModalPushFiles(true) 
    }
    else {
      message.error("Only logged users can upload data")
    }
  }
  const openHandleGroups = () => {
    consoleLogger(loggedIn)
    if (loggedIn) {
      setModalHandleGroups(true) 
    }
    else {
      message.error("Only logged users have access to groups")
    }
  }
  

  return (
    <section>
      <Button type="primary" style={{margin: 10}} onClick={async () => await getData()}>
        Refresh Data
      </Button>
      <Button onClick={() => setModal(true)} type="primary" style={{margin: 10}}>
        Select Columns
      </Button>
      <Button onClick={() => openUploadData()}  type="primary" style={{margin: 10}}>
        Upload Data
      </Button>
      <Button onClick={() => openUploadPushFiles()}  type="primary" style={{margin: 10}}>
        Upload Files
      </Button>
      {/* <Button onClick={() => openHandleGroups()}  type="primary" style={{margin: 10}}>
        Groups
      </Button> */}
      
      <ColumnsSelector opened={modal} setModal={setModal} 
          checkedListSubmission={checkedListSubmission} setCheckedListSubmission={setCheckedListSubmission}
          checkedListAuthorship={checkedListAuthorship} setCheckedListAuthorship={setCheckedListAuthorship}
          checkedListMaterial={checkedListMaterial} setCheckedListMaterial={setCheckedListMaterial}
          checkedListGene={checkedListGene} setCheckedListGene={setCheckedListGene}
          checkedListOrigin={checkedListOrigin} setCheckedListOrigin={setCheckedListOrigin}
          checkedListMetabolic={checkedListMetabolic} setCheckedListMetabolic={setCheckedListMetabolic}
          checkedListOrganism={checkedListOrganism} setCheckedListOrganism={setCheckedListOrganism}
          checkedListSample={checkedListSample} setCheckedListSample={setCheckedListSample}
          checkedListSequencing={checkedListSequencing} setCheckedListSequencing={setCheckedListSequencing}
          checkedListFiles={checkedListFiles} setCheckedListFiles={setCheckedListFiles} />
      <UploadData firstModal={modalData} firstModalSeter={(value) => setModalData(value)} user={user} ModalPushFiles={ModalPushFiles} setModalPushFiles={setModalPushFiles}/>




      <Group opened={modalHandleGroups} onClose={() => setModalHandleGroups(false)}/>

      <DataTable data={data} user={user} checkedListSubmission={checkedListSubmission}
                checkedListAuthorship={checkedListAuthorship}
                checkedListMaterial={checkedListMaterial}
                checkedListGene={checkedListGene}
                checkedListOrigin={checkedListOrigin}
                checkedListMetabolic={checkedListMetabolic}
                checkedListOrganism={checkedListOrganism}
                checkedListSample={checkedListSample}
                checkedListSequencing={checkedListSequencing}
                checkedListFiles={checkedListFiles}/>
      <Modal
        title="Login"
        centered
        open={modalLogin}
        // width={1000}
        // styles={{body: {height: 630}}}
        onOk={() => setModalLogin(false)}
        onCancel={() => setModalLogin(false)}
        footer={[]}
      >``
      <Form
    name="Login"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item<LoginFieldType>
      label="email"
      name="email"
      rules={[{ required: true, message: 'Please input your email!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<LoginFieldType>
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
      </Modal>
      <Modal
        title="Signup"
        centered
        open={modalSignup}
        // width={1000}
        // styles={{body: {height: 630}}}
        onOk={() => setModalSignup(false)}
        onCancel={() => setModalSignup(false)}
        footer={[]}
      >
      <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinishsignup}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item<LoginFieldType>
      label="email"
      name="email"
      rules={[{ required: true, message: 'Please input your email!' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item<LoginFieldType>
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
    </Form.Item>
    <Form.Item<LoginFieldType>
      label="Name"
      name="name"
      rules={[{ required: true, message: 'Please input your name!' }]}
    >
      <Input />
    </Form.Item>
    
    <Form.Item<LoginFieldType>
      label="Surname"
      name="surname"
      rules={[{ required: true, message: 'Please input your surname!' }]}
    >
      <Input />
    </Form.Item>
   

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
      </Modal>
    <FloatButton onClick={() => setModalLogin(true)} type="primary" description="Login" shape="square"  style={{ right: 200, margin: 10, width:90}} />
    <FloatButton onClick={() => {
      signOut(auth).then(() => {
      setUser(null);
      setLoggedIn(false);
      consoleLogger(user);
      message.success("Logout");
      }).catch((error) => {message.error('Is not possible to logout ' + error)})
      }} type="primary" description="Logout" shape="square" style={{ right: 100, margin: 10 , width:90}} />
    <FloatButton  onClick={() => setModalSignup(true)} type="primary" description="Signup" shape="square" style={{ right: 0 , margin: 10, width:90}} />
    
    </section>
  )
}
 
export default Home