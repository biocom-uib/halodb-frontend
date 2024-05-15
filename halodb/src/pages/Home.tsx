import React, { useState, useRef } from 'react';

import axios from 'axios'
import { SearchOutlined } from '@ant-design/icons';

import { Space, Button, Table, Input, Modal, Checkbox, FloatButton, Form, message } from 'antd';

import { columns, OptionsDBSample, OptionsSubmission, OptionsSubmitter, OptionsAuthorship, OptionsMaterial,
  OptionsGene, OptionsOrigin, OptionsMetabolic, OptionsOrganism, OptionsSample, OptionsSequencing, PlainOptionsDBSample,
  PlainOptionsSubmission, PlainOptionsSubmitter, PlainOptionsAuthorship, PlainOptionsMaterial, PlainOptionsGene, PlainOptionsOrigin,
  PlainOptionsMetabolic, PlainOptionsOrganism, PlainOptionsSample, PlainOptionsSequencing } from '../data/data2';
import type { GetRef, TableColumnType, FormProps } from 'antd';
import type { GetProp, UploadProps } from 'antd';

import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, auth } from '../services/firebase'
import type { FilterDropdownProps } from 'antd/es/table/interface';
import type { DataType, DataIndex } from '../data/data2';
import Highlighter from 'react-highlight-words';
import { consoleLogger } from '../utils/logger'
import { User } from 'firebase/auth'
import Group  from '../components/Groups'
import UploadData from '../components/UploadData';
type InputRef = GetRef<typeof Input>;

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

const { Column, ColumnGroup } = Table;
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const Home = () => {
  const [checkedListDBSample, setCheckedListDBSample] = useState(PlainOptionsDBSample)
  const [checkedListSubmission, setCheckedListSubmission] = useState([])
  const [checkedListSubmitter, setCheckedListSubmitter] = useState([])
  const [checkedListAuthorship, setCheckedListAuthorship] = useState([])
  const [checkedListMaterial, setCheckedListMaterial] = useState([])
  const [checkedListGene, setCheckedListGene] = useState([])
  const [checkedListOrigin, setCheckedListOrigin] = useState([])
  const [checkedListMetabolic, setCheckedListMetabolic] = useState([])
  const [checkedListOrganism, setCheckedListOrganism] = useState([])
  const [checkedListSample, setCheckedListSample] = useState(PlainOptionsSample)
  const [checkedListSequencing, setCheckedListSequencing] = useState([])
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [data, setData] = useState([]);
  const searchInput = useRef<InputRef>(null);
  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps['confirm'],
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      // if (visible) {
      //     setTimeout(() => searchInput.current!.select(), 100);
      // }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const options = columns.map(({ key, title }, i) => ({
    label: title + i,
    value: key,
  }));
  const [modal, setModal] = useState(false);

  const [modalData, setModalData] = useState(false);
  const [modalLogin, setModalLogin] = useState(false);
  const [modalSignup, setModalSignup] = useState(false);
  const [user, setUser] = useState<HaloDbUser>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [modalHandleGroups, setModalHandleGroups] = useState(false);
  
  const [messageApi, contextHolder] = message.useMessage();
 
  const getData = async() => {
    const config = {
      method: 'GET',
      headers: {'Authorization': user ? "Bearer " + user.accessToken : null}
    }
    
    await axios('https://biocom.uib.es/halodb/query/sample_list/', config)
    .then((response) => {consoleLogger(response); setData(response.data);})
  }
  const checkedNum = checkedListDBSample.length + checkedListSubmission.length +  checkedListSubmitter.length + checkedListAuthorship.length + checkedListMaterial.length + checkedListGene.length + checkedListOrigin.length + checkedListMetabolic.length + checkedListOrganism.length + checkedListSample.length + checkedListSequencing.length;
  const checkAll = options.length === checkedNum ;
  const indeterminate = checkedNum > 0 && checkedNum < options.length;
  const onCheckAllChange = (e) => {
    setCheckedListDBSample(e.target.checked ? PlainOptionsDBSample : []);
    setCheckedListSubmission(e.target.checked ? PlainOptionsSubmission: []);
    setCheckedListSubmitter(e.target.checked ? PlainOptionsSubmitter: []);
    setCheckedListAuthorship(e.target.checked ? PlainOptionsAuthorship: []);
    setCheckedListMaterial(e.target.checked ? PlainOptionsMaterial: []);
    setCheckedListGene(e.target.checked ? PlainOptionsGene: []);
    setCheckedListOrigin(e.target.checked ? PlainOptionsOrigin: []);
    setCheckedListMetabolic(e.target.checked ? PlainOptionsMetabolic: []);
    setCheckedListOrganism(e.target.checked ? PlainOptionsOrganism: []);
    setCheckedListSample(e.target.checked ? PlainOptionsSample: []);
    setCheckedListSequencing(e.target.checked ? PlainOptionsSequencing: []);
  };
  const checkDBSample = checkedListDBSample.length === OptionsDBSample.length;
  const hiddenDBSample = checkedListDBSample.length === 0
  const indeterminateDBSample = !checkDBSample && !hiddenDBSample
  const onCheckDBSample = (e) => {
    setCheckedListDBSample(e.target.checked ? PlainOptionsDBSample : []);
  };
  const checkSubmission = checkedListSubmission.length === OptionsSubmission.length;
  const hiddenSubmission = checkedListSubmission.length === 0
  const indeterminateSubmission = !checkSubmission && !hiddenSubmission
  const onCheckSubmission = (e) => {
    setCheckedListSubmission(e.target.checked ? PlainOptionsSubmission : []);
  };
  const checkSubmitter = checkedListSubmitter.length === OptionsSubmitter.length;
  const hiddenSubmitter = checkedListSubmitter.length === 0
  const indeterminateSubmitter = !checkSubmitter && !hiddenSubmitter
  const onCheckSubmitter = (e) => {
    setCheckedListSubmitter(e.target.checked ? PlainOptionsSubmitter : []);
  };
  const checkAuthorship = checkedListAuthorship.length === OptionsAuthorship.length;
  const hiddenAuthorship = checkedListAuthorship.length === 0
  const indeterminateAuthorship = !checkAuthorship && !hiddenAuthorship
  const onCheckAuthorship = (e) => {
    setCheckedListAuthorship(e.target.checked ? PlainOptionsAuthorship : []);
  };
  const checkMaterial = checkedListMaterial.length === OptionsMaterial.length;
  const hiddenMaterial = checkedListMaterial.length === 0
  const indeterminateMaterial = !checkMaterial && !hiddenMaterial
  const onCheckMaterial = (e) => {
    setCheckedListMaterial(e.target.checked ? PlainOptionsMaterial : []);
  };
  const checkGene = checkedListGene.length === OptionsGene.length;
  const hiddenGene = checkedListGene.length === 0
  const indeterminateGene = !checkGene && !hiddenGene
  const onCheckGene = (e) => {
    setCheckedListGene(e.target.checked ? PlainOptionsGene : []);
  };
  const checkOrigin = checkedListOrigin.length === OptionsOrigin.length;
  const hiddenOrigin = checkedListOrigin.length === 0
  const indeterminateOrigin = !checkOrigin && !hiddenOrigin
  const onCheckOrigin = (e) => {
    setCheckedListOrigin(e.target.checked ? PlainOptionsOrigin : []);
  };
  const checkMetabolic = checkedListMetabolic.length === OptionsMetabolic.length;
  const hiddenMetabolic = checkedListMetabolic.length === 0
  const indeterminateMetabolic = !checkMetabolic && !hiddenMetabolic
  const onCheckMetabolic = (e) => {
    setCheckedListMetabolic(e.target.checked ? PlainOptionsMetabolic : []);
  };
  const checkOrganism = checkedListOrganism.length === OptionsOrganism.length;
  const hiddenOrganism = checkedListOrganism.length === 0
  const indeterminateOrganism = !checkOrganism && !hiddenOrganism
  const onCheckOrganism = (e) => {
    setCheckedListOrganism(e.target.checked ? PlainOptionsOrganism : []);
  };
  const checkSample = checkedListSample.length === OptionsSample.length;
  const hiddenSample = checkedListSample.length === 0
  const indeterminateSample = !checkSample && !hiddenSample
  const onCheckSample = (e) => {
    setCheckedListSample(e.target.checked ? PlainOptionsSample : []);
  };
  const checkSequencing = checkedListSequencing.length === OptionsSequencing.length;
  const hiddenSequencing = checkedListSequencing.length === 0
  const indeterminateSequencing = !checkSequencing && !hiddenSequencing
  const onCheckSequencing = (e) => {
    setCheckedListSequencing(e.target.checked ? PlainOptionsSequencing : []);
  };
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
      'https://biocom.uib.es/halodb/user/',
      values,{
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': user ? "Bearer " + user.accessToken : null
      }})
    .then((response) => {{
      consoleLogger('UserCreated', response);
    }})
    .catch((response) => {{
      consoleLogger(response);
    }})
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
      <Button onClick={() => openHandleGroups()}  type="primary" style={{margin: 10}}>
        Groups
      </Button>
      <Modal
        title="Select columns to display"
        centered
        open={modal}
        onOk={() => setModal(false)}
        onCancel={() => setModal(false)}
      >
        <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
          <h4>Select All </h4></Checkbox>
      <p></p>
      <Checkbox indeterminate={indeterminateDBSample} onChange={onCheckDBSample} checked={checkDBSample}>
        <h4>Sample Information </h4></Checkbox>
        <p></p>
        <Checkbox.Group options={OptionsDBSample} value={checkedListDBSample} onChange={setCheckedListDBSample} />
        <Checkbox indeterminate={indeterminateSubmission} onChange={onCheckSubmission} checked={checkSubmission}>
          <h4>Information on the submission </h4></Checkbox>
        <p></p>
        <Checkbox.Group options={OptionsSubmission} value={checkedListSubmission} onChange={setCheckedListSubmission} />
        <Checkbox indeterminate={indeterminateSubmitter} onChange={onCheckSubmitter} checked={checkSubmitter}>
          <h4>Information on the submitter </h4></Checkbox>
        <p></p>
        <Checkbox.Group options={OptionsSubmitter} value={checkedListSubmitter} onChange={setCheckedListSubmitter} />
        <p></p>
        <Checkbox indeterminate={indeterminateAuthorship} onChange={onCheckAuthorship} checked={checkAuthorship}>
          <h4>Information on the authorship and publications </h4></Checkbox>
        <p></p>
        <Checkbox.Group options={OptionsAuthorship} value={checkedListAuthorship} onChange={setCheckedListAuthorship} />
        <Checkbox indeterminate={indeterminateMaterial} onChange={onCheckMaterial} checked={checkMaterial}>
          <h4>Kind of material </h4></Checkbox>
        <p></p>
        <Checkbox.Group options={OptionsMaterial} value={checkedListMaterial} onChange={setCheckedListMaterial} />
        <Checkbox indeterminate={indeterminateGene} onChange={onCheckGene} checked={checkGene}>
          <h4>Gene and genome information </h4></Checkbox>
        <p></p>
        <Checkbox.Group options={OptionsGene} value={checkedListGene} onChange={setCheckedListGene} />
        <Checkbox indeterminate={indeterminateOrigin} onChange={onCheckOrigin} checked={checkOrigin}>
          <h4>Metadata on the origin of the sample </h4></Checkbox>
        <p></p>
        <Checkbox.Group options={OptionsOrigin} value={checkedListOrigin} onChange={setCheckedListOrigin} />
        <Checkbox indeterminate={indeterminateMetabolic} onChange={onCheckMetabolic} checked={checkMetabolic}>
          <h4>Basic metabolic traits determined nder culture conditions </h4></Checkbox>
        <p></p>
        <Checkbox.Group options={OptionsMetabolic} value={checkedListMetabolic} onChange={setCheckedListMetabolic} />
        <Checkbox indeterminate={indeterminateOrganism} onChange={onCheckOrganism} checked={checkOrganism}>
          <h4>Other information details on the organism </h4></Checkbox>
        <p></p>
        <Checkbox.Group options={OptionsOrganism} value={checkedListOrganism} onChange={setCheckedListOrganism} />
        <Checkbox indeterminate={indeterminateSample} onChange={onCheckSample} checked={checkSample}>
          <h4>Sample information </h4></Checkbox>
        <p></p>
        <Checkbox.Group options={OptionsSample} value={checkedListSample} onChange={setCheckedListSample} />
        <Checkbox indeterminate={indeterminateSequencing} onChange={onCheckSequencing} checked={checkSequencing}>
          <h4>Sequencing information </h4></Checkbox>
        <p></p>
        <Checkbox.Group options={OptionsSequencing} value={checkedListSequencing} onChange={setCheckedListSequencing} />
      
      </Modal>
      
      <UploadData firstModal={modalData} firstModalSeter={(value) => setModalData(value)} user={user}/>





      <Group opened={modalHandleGroups} onClose={() => setModalHandleGroups(false)}/>
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
     <Table
        scroll={{ x: 1300}}
        pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '30']}}
        bordered
        dataSource={data}>
     <ColumnGroup title="Sample information" hidden={hiddenDBSample} >
      <Column title="id" dataIndex="id" key="id" width="2000" hidden={!checkedListDBSample.includes("id")} {...getColumnSearchProps("id")} />
      <Column title="created" dataIndex="created" key="created" hidden={!checkedListDBSample.includes("created")} {...getColumnSearchProps("created")}/>
      <Column title="updated" dataIndex="updated" key="updated" hidden={!checkedListDBSample.includes("updated")} {...getColumnSearchProps("updated")}/>
      <Column title="user" dataIndex="user_id" key="user_id" hidden={!checkedListDBSample.includes("user_id")} {...getColumnSearchProps("user_id")}/>
      </ColumnGroup>
      <ColumnGroup title="Information on the submission" hidden={hiddenSubmission}>
      <Column title="Taxonumber" dataIndex="txnr" key="txnr" hidden={!checkedListSubmission.includes("txnr")} {...getColumnSearchProps("txnr")}/>
      <Column title="Version" dataIndex="version" key="version" hidden={!checkedListSubmission.includes("version")} {...getColumnSearchProps("version")}/>
      <Column title="Date of the entry" dataIndex="entrydate" key="entrydate" hidden={!checkedListSubmission.includes("entrydate")} {...getColumnSearchProps("entrydate")}/>
      <Column title="First submission date" dataIndex="firstdate" key="firstdate" hidden={!checkedListSubmission.includes("firstdate")} {...getColumnSearchProps("firstdate")}/>
      <Column title="Draft number" dataIndex="draftnumber" key="draftnumber" hidden={!checkedListSubmission.includes("draftnumber")} {...getColumnSearchProps("draftnumber")}/>
      </ColumnGroup>
      <ColumnGroup title="Information on the submitter" hidden={hiddenSubmitter}>
      <Column title="Submitter" dataIndex="subm" key="subm" hidden={!checkedListSubmitter.includes("subm")} {...getColumnSearchProps("subm")}/>
      <Column title="Email of the submitter" dataIndex="emsu" key="emsu" hidden={!checkedListSubmitter.includes("emsu")} {...getColumnSearchProps("emsu")}/>
      </ColumnGroup>
      <ColumnGroup title="Information on the authorship and publications" hidden={hiddenAuthorship}>
      <Column title="Authors" dataIndex="auth" key="auth" hidden={!checkedListAuthorship.includes("auth")} {...getColumnSearchProps("auth")}/>
      <Column title="Title" dataIndex="titl" key="titl" width={2000} hidden={!checkedListAuthorship.includes("titl")} {...getColumnSearchProps("titl")}/>
      <Column title="Journal" dataIndex="jour" key="jour" hidden={!checkedListAuthorship.includes("jour")} {...getColumnSearchProps("jour")}/>
      <Column title="Volume" dataIndex="volume" key="volume" hidden={!checkedListAuthorship.includes("volume")} {...getColumnSearchProps("volume")}/>
      <Column title="Pages" dataIndex="pages" key="pages" hidden={!checkedListAuthorship.includes("pages")} {...getColumnSearchProps("pages")}/>
      <Column title="DOI" dataIndex="doi" key="doi" hidden={!checkedListAuthorship.includes("doi")} {...getColumnSearchProps("doi")}/>
      <Column title="Corresponding author" dataIndex="coau" key="coau" hidden={!checkedListAuthorship.includes("coau")} {...getColumnSearchProps("coau")}/>
      <Column title="Email of the corresponding author" dataIndex="emau" key="emau" hidden={!checkedListAuthorship.includes("emau")} {...getColumnSearchProps("emau")}/>

      </ColumnGroup>
      <ColumnGroup title="Kind of material" hidden={hiddenMaterial}>
      <Column title="Cultured" dataIndex="cult" key="cult" hidden={!checkedListMaterial.includes("cult")} {...getColumnSearchProps("cult")}/>
      <Column title="Kind of material" dataIndex="koma" key="koma" hidden={!checkedListMaterial.includes("koma")} {...getColumnSearchProps("koma")}/>
      <Column title="Is for a new taxon?" dataIndex="typn" key="typn" hidden={!checkedListMaterial.includes("typn")} {...getColumnSearchProps("typn")}/>
      <Column title="Type strain" dataIndex="otyp" key="otyp" hidden={!checkedListMaterial.includes("otyp")} {...getColumnSearchProps("otyp")}/>
      <Column title="Taxonumber of the type material" dataIndex="txnt" key="txnt" hidden={!checkedListMaterial.includes("txnt")} {...getColumnSearchProps("txnt")}/>
      <Column title="Submitted to culture collection" dataIndex="ccsu" key="ccsu" hidden={!checkedListMaterial.includes("ccsu")} {...getColumnSearchProps("ccsu")}/>
      <Column title="Designed type strain name" dataIndex="type" key="type" hidden={!checkedListMaterial.includes("type")} {...getColumnSearchProps("type")}/>
      <Column title="Strain collection numbers" dataIndex="coln" key="coln" hidden={!checkedListMaterial.includes("coln")} {...getColumnSearchProps("coln")}/>
      <Column title="Domain name" dataIndex="domain" key="domain" hidden={!checkedListMaterial.includes("domain")} {...getColumnSearchProps("domain")}/>
      <Column title="Kingdom name" dataIndex="kingdom" key="kingdom" hidden={!checkedListMaterial.includes("kingdom")} {...getColumnSearchProps("kingdom")}/>
      <Column title="Phylum name" dataIndex="phylum" key="phylum" hidden={!checkedListMaterial.includes("phylum")} {...getColumnSearchProps("phylum")}/>
      <Column title="Phylum etymology" dataIndex="phylumety" key="phylumety" hidden={!checkedListMaterial.includes("phylumety")} {...getColumnSearchProps("phylumety")}/>
      <Column title="Class name" dataIndex="class" key="class" hidden={!checkedListMaterial.includes("class")} {...getColumnSearchProps("class")}/>
      <Column title="Class etymology" dataIndex="classety" key="classety" hidden={!checkedListMaterial.includes("classety")} {...getColumnSearchProps("classety")}/>
      <Column title="Order name" dataIndex="order" key="order" hidden={!checkedListMaterial.includes("order")} {...getColumnSearchProps("order")}/>
      <Column title="Order etymology" dataIndex="orderety" key="orderety" hidden={!checkedListMaterial.includes("orderety")} {...getColumnSearchProps("orderety")}/>
      <Column title="Family name" dataIndex="family" key="family" hidden={!checkedListMaterial.includes("family")} {...getColumnSearchProps("family")}/>
      <Column title="Family etymology" dataIndex="familyety" key="familyety" hidden={!checkedListMaterial.includes("familyety")} {...getColumnSearchProps("familyety")}/>
      <Column title="Genus name" dataIndex="gena" key="gena" hidden={!checkedListMaterial.includes("gena")} {...getColumnSearchProps("gena")}/>
      <Column title="Genus etymology" dataIndex="gety" key="gety" hidden={!checkedListMaterial.includes("gety")} {...getColumnSearchProps("gety")}/>
      <Column title="Type species of the genus" dataIndex="gent" key="gent" hidden={!checkedListMaterial.includes("gent")} {...getColumnSearchProps("gent")}/>
      <Column title="Specific epithet" dataIndex="spep" key="spep" hidden={!checkedListMaterial.includes("spep")} {...getColumnSearchProps("spep")}/>
      <Column title="Species name" dataIndex="spna" key="spna" hidden={!checkedListMaterial.includes("spna")} {...getColumnSearchProps("spna")}/>
      <Column title="Species etymology" dataIndex="spty" key="spty" hidden={!checkedListMaterial.includes("spty")} {...getColumnSearchProps("spty")}/>
      <Column title="Subspecies name" dataIndex="ssna" key="ssna" hidden={!checkedListMaterial.includes("ssna")} {...getColumnSearchProps("ssna")}/>
      <Column title="Subspecies etymology" dataIndex="ssty" key="ssty" hidden={!checkedListMaterial.includes("ssty")} {...getColumnSearchProps("ssty")}/>
      <Column title="Basonym" dataIndex="baso" key="baso" hidden={!checkedListMaterial.includes("baso")} {...getColumnSearchProps("baso")}/>
      <Column title="Other" dataIndex="coth" key="coth" hidden={!checkedListMaterial.includes("coth")} {...getColumnSearchProps("coth")}/>
      
    </ColumnGroup>
    <ColumnGroup title="Gene and genome information" hidden={hiddenGene}>
    <Column title="16S rRNA gene accession number" dataIndex="sixteensr" key="sixteensr" hidden={!checkedListGene.includes("sixteensr")} {...getColumnSearchProps("sixteensr")}/>
    <Column title="Alternative housekeeping genes" dataIndex="hkgn" key="hkgn" hidden={!checkedListGene.includes("hkgn")} {...getColumnSearchProps("hkgn")}/>
    <Column title="Metagenome accession number" dataIndex="meca" key="meca" hidden={!checkedListGene.includes("meca")} {...getColumnSearchProps("meca")}/>
    <Column title="genome/MAG/SAG accession number [RefSeq]" dataIndex="gare" key="gare" hidden={!checkedListGene.includes("gare")} {...getColumnSearchProps("gare")}/>
    <Column title="genome/MAG/SAG accession number [EMBL]" dataIndex="gaem" key="gaem" hidden={!checkedListGene.includes("gaem")} {...getColumnSearchProps("gaem")}/>
    <Column title="genome/MAG/SAG accession number [other]" dataIndex="binn" key="binn" hidden={!checkedListGene.includes("binn")} {...getColumnSearchProps("binn")}/>
    <Column title="URL" dataIndex="url" key="url" hidden={!checkedListGene.includes("url")} {...getColumnSearchProps("url")}/>
    <Column title="Genome status" dataIndex="gsta" key="gsta" hidden={!checkedListGene.includes("gsta")} {...getColumnSearchProps("gsta")}/>
    <Column title="Completeness" dataIndex="completeness" key="completeness" hidden={!checkedListGene.includes("completeness")} {...getColumnSearchProps("completeness")}/>
    <Column title="Level of contamination" dataIndex="contamination" key="contamination" hidden={!checkedListGene.includes("contamination")} {...getColumnSearchProps("contamination")}/>
    <Column title="Method" dataIndex="method" key="method" hidden={!checkedListGene.includes("method")} {...getColumnSearchProps("method")}/>
    <Column title="Genome size" dataIndex="gsiz" key="gsiz" hidden={!checkedListGene.includes("gsiz")} {...getColumnSearchProps("gsiz")}/>
    <Column title="GC mol %" dataIndex="ggcm" key="ggcm" hidden={!checkedListGene.includes("ggcm")} {...getColumnSearchProps("ggcm")}/>
    <Column title="DNA extraction method" dataIndex="dnae" key="dnae" hidden={!checkedListGene.includes("dnae")} {...getColumnSearchProps("dnae")}/>
    <Column title="Assembly" dataIndex="asem" key="asem" hidden={!checkedListGene.includes("asem")} {...getColumnSearchProps("asem")}/>
    <Column title="Sequencing Technology" dataIndex="seqt" key="seqt" hidden={!checkedListGene.includes("seqt")} {...getColumnSearchProps("seqt")}/>
    <Column title="Binning software" dataIndex="bins" key="bins" hidden={!checkedListGene.includes("bins")} {...getColumnSearchProps("bins")}/>
    <Column title="Assembly software" dataIndex="asft" key="asft" hidden={!checkedListGene.includes("asft")} {...getColumnSearchProps("asft")}/>
    </ColumnGroup>
    <ColumnGroup title="Metadata on the origin of the sample" hidden={hiddenOrigin}>
    <Column title="Country" dataIndex="coun" key="coun" hidden={!checkedListOrigin.includes("coun")} {...getColumnSearchProps("coun")}/>
    <Column title="Region" dataIndex="regi" key="regi" hidden={!checkedListOrigin.includes("regi")} {...getColumnSearchProps("regi")}/>
    <Column title="Geographic location" dataIndex="geol" key="geol" hidden={!checkedListOrigin.includes("geol")} {...getColumnSearchProps("geol")}/>
    <Column title="Latitude" dataIndex="lati" key="lati" hidden={!checkedListOrigin.includes("lati")} {...getColumnSearchProps("lati")}/>
    <Column title="Longitude" dataIndex="long" key="long" hidden={!checkedListOrigin.includes("long")} {...getColumnSearchProps("long")}/>
    <Column title="Altitude" dataIndex="alti" key="alti" hidden={!checkedListOrigin.includes("alti")} {...getColumnSearchProps("alti")}/>
    <Column title="Depth" dataIndex="dept" key="dept" hidden={!checkedListOrigin.includes("dept")} {...getColumnSearchProps("dept")}/>
    <Column title="Source" dataIndex="sour" key="sour" hidden={!checkedListOrigin.includes("sour")} {...getColumnSearchProps("sour")}/>
    <Column title="Sampling date" dataIndex="dats" key="dats" hidden={!checkedListOrigin.includes("dats")} {...getColumnSearchProps("dats")}/>
    <Column title="Hour of collection" dataIndex="hocs" key="hocs" hidden={!checkedListOrigin.includes("hocs")} {...getColumnSearchProps("hocs")}/>
    <Column title="Date of isolation" dataIndex="dati" key="dati" hidden={!checkedListOrigin.includes("dati")} {...getColumnSearchProps("dati")}/>
    <Column title="Date of isolation" dataIndex="datu" key="datu" hidden={!checkedListOrigin.includes("datu")} {...getColumnSearchProps("datu")}/>
    <Column title="Temperature" dataIndex="tems" key="tems" hidden={!checkedListOrigin.includes("tems")} {...getColumnSearchProps("tems")}/>
    <Column title="pH" dataIndex="phsa" key="phsa" hidden={!checkedListOrigin.includes("phsa")} {...getColumnSearchProps("phsa")}/>
    <Column title="Salinity" dataIndex="sals" key="sals" hidden={!checkedListOrigin.includes("sals")} {...getColumnSearchProps("sals")}/>
    </ColumnGroup>
    <ColumnGroup title="Basic metabolic traits determined nder culture conditions" hidden={hiddenMetabolic}>
    <Column title="Energy metabolism" dataIndex="emet" key="emet" hidden={!checkedListMetabolic.includes("emet")} {...getColumnSearchProps("emet")}/>
    <Column title="Relationship to O2" dataIndex="orel" key="orel" hidden={!checkedListMetabolic.includes("orel")} {...getColumnSearchProps("orel")}/>
    <Column title="Terminal electron acceptor" dataIndex="elac" key="elac" hidden={!checkedListMetabolic.includes("elac")} {...getColumnSearchProps("elac")}/>
    <Column title="Temperature optimum" dataIndex="temo" key="temo" hidden={!checkedListMetabolic.includes("temo")} {...getColumnSearchProps("temo")}/>
    <Column title="Lowest temperature" dataIndex="teml" key="teml" hidden={!checkedListMetabolic.includes("teml")} {...getColumnSearchProps("teml")}/>
    <Column title="Highest temperature" dataIndex="temh" key="temh" hidden={!checkedListMetabolic.includes("temh")} {...getColumnSearchProps("temh")}/>
    <Column title="Temperature category" dataIndex="temc" key="temc" hidden={!checkedListMetabolic.includes("temc")} {...getColumnSearchProps("temc")}/>
    <Column title="pH optimum" dataIndex="phop" key="phop" hidden={!checkedListMetabolic.includes("phop")} {...getColumnSearchProps("phop")}/>
    <Column title="Lowest pH" dataIndex="phlo" key="phlo" hidden={!checkedListMetabolic.includes("phlo")} {...getColumnSearchProps("phlo")}/>
    <Column title="Highest pH" dataIndex="phhi" key="phhi" hidden={!checkedListMetabolic.includes("phhi")} {...getColumnSearchProps("phhi")}/>
    <Column title="pH category" dataIndex="phca" key="phca" hidden={!checkedListMetabolic.includes("phca")} {...getColumnSearchProps("phca")}/>
    <Column title="Salinity optimum" dataIndex="salo" key="salo" hidden={!checkedListMetabolic.includes("salo")} {...getColumnSearchProps("salo")}/>
    <Column title="Lowest NaCl concentration" dataIndex="sall" key="sall" hidden={!checkedListMetabolic.includes("sall")} {...getColumnSearchProps("sall")}/>
    <Column title="Highest NaCl concentration" dataIndex="salh" key="salh" hidden={!checkedListMetabolic.includes("salh")} {...getColumnSearchProps("salh")}/>
    <Column title="Other salts" dataIndex="salw" key="salw" hidden={!checkedListMetabolic.includes("salw")} {...getColumnSearchProps("salw")}/>
    <Column title="Salinity category" dataIndex="salc" key="salc" hidden={!checkedListMetabolic.includes("salc")} {...getColumnSearchProps("salc")}/>
    </ColumnGroup>
    <ColumnGroup title="Other infomration details on the organism" hidden={hiddenOrganism}>
    <Column title="Biosafety level" dataIndex="bios" key="bios" hidden={!checkedListOrganism.includes("bios")} {...getColumnSearchProps("bios")}/>
    <Column title="Habitat" dataIndex="habt" key="habt" hidden={!checkedListOrganism.includes("habt")} {...getColumnSearchProps("habt")}/>
    <Column title="Biotic relationship" dataIndex="bior" key="bior" hidden={!checkedListOrganism.includes("bior")} {...getColumnSearchProps("bior")}/>
    <Column title="Symbiosis with the host" dataIndex="host" key="host" hidden={!checkedListOrganism.includes("host")} {...getColumnSearchProps("host")}/>
    <Column title="Known pathogenicity" dataIndex="path" key="path" hidden={!checkedListOrganism.includes("path")} {...getColumnSearchProps("path")}/>
    <Column title="Miscellaneous" dataIndex="extr" key="extr" hidden={!checkedListOrganism.includes("extr")} {...getColumnSearchProps("extr")}/>
    </ColumnGroup>
    <ColumnGroup title="Sample information" hidden={hiddenSample}>
    <Column title="Sample name" dataIndex="name" key="name" hidden={!checkedListSample.includes("name")} {...getColumnSearchProps("name")}/>
    <Column title="Sample type" dataIndex="stype" key="stype" hidden={!checkedListSample.includes("stype")} {...getColumnSearchProps("stype")}/>
    <Column title="Sample size" dataIndex="ssize" key="ssize" hidden={!checkedListSample.includes("ssize")} {...getColumnSearchProps("ssize")}/>
    <Column title="Sample size unity" dataIndex="ssizeunit" key="ssizeunit" hidden={!checkedListSample.includes("ssizeunit")} {...getColumnSearchProps("ssizeunit")}/>
    <Column title="Keywords" dataIndex="keywords" key="keywords" hidden={!checkedListSample.includes("keywords")} {...getColumnSearchProps("keywords")}/>
    </ColumnGroup>
    <ColumnGroup title="Sequencing information" hidden={hiddenSequencing}>
    <Column title="Sequenced fraction" dataIndex="sfrac" key="sfrac" hidden={!checkedListSequencing.includes("sfrac")} {...getColumnSearchProps("sfrac")}/>
    <Column title="Sequencing depth" dataIndex="seqdepth" key="seqdepth" hidden={!checkedListSequencing.includes("seqdepth")} {...getColumnSearchProps("seqdepth")}/>
    <Column title="Target nucleic acid" dataIndex="target" key="target" hidden={!checkedListSequencing.includes("target")} {...getColumnSearchProps("target")}/>
    <Column title="Raw reads" dataIndex="rreads" key="rreads" hidden={!checkedListSequencing.includes("rreads")} {...getColumnSearchProps("rreads")}/>
    <Column title="Raw reads NCBI accession code" dataIndex="rreadacc" key="rreadacc" hidden={!checkedListSequencing.includes("rreadacc")} {...getColumnSearchProps("rreadacc")}/>
    <Column title="Name of the original file" dataIndex="rrname" key="rrname" hidden={!checkedListSequencing.includes("rrname")} {...getColumnSearchProps("rrname")}/>
    <Column title="Raw reads number" dataIndex="rreadsnum" key="rreadsnum" hidden={!checkedListSequencing.includes("rreadsnum")} {...getColumnSearchProps("rreadsnum")}/>
    <Column title="Trimmed reads" dataIndex="treads" key="treads" hidden={!checkedListSequencing.includes("treads")} {...getColumnSearchProps("treads")}/>
    <Column title="File containing trimmed reads" dataIndex="trname" key="trname" hidden={!checkedListSequencing.includes("trname")} {...getColumnSearchProps("trname")}/>
    <Column title="Trimmed reads number" dataIndex="treadsnum" key="treadsnum" hidden={!checkedListSequencing.includes("treadsnum")} {...getColumnSearchProps("treadsnum")}/>
    <Column title="Coverage" dataIndex="coverage" key="coverage" hidden={!checkedListSequencing.includes("coverage")} {...getColumnSearchProps("coverage")}/>
    <Column title="Assembled file identifier" dataIndex="assembled" key="assembled" hidden={!checkedListSequencing.includes("assembled")} {...getColumnSearchProps("assembled")}/>
    <Column title="Assembled file name" dataIndex="assname" key="assname" hidden={!checkedListSequencing.includes("assname")} {...getColumnSearchProps("assname")}/>
    <Column title="Assembly size" dataIndex="asize" key="asize" hidden={!checkedListSequencing.includes("asize")} {...getColumnSearchProps("asize")}/>
    <Column title="Number of contigs" dataIndex="contignumber" key="contignumber" hidden={!checkedListSequencing.includes("contignumber")} {...getColumnSearchProps("contignumber")}/>
    <Column title="Predicted genes file identifier" dataIndex="pgenes" key="pgenes" hidden={!checkedListSequencing.includes("pgenes")} {...getColumnSearchProps("pgenes")}/>
    <Column title="Predicted genes file name" dataIndex="pgenesname" key="pgenesname" hidden={!checkedListSequencing.includes("pgenesname")} {...getColumnSearchProps("pgenesname")}/>
    <Column title="235 rRNA gene accession number" dataIndex="twentythreesr" key="twentythreesr" hidden={!checkedListSequencing.includes("twentythreesr")} {...getColumnSearchProps("twentythreesr")}/>
    <Column title="Nagoya Protocol" dataIndex="nagoya" key="nagoya" hidden={!checkedListSequencing.includes("nagoya")} {...getColumnSearchProps("nagoya")}/>
    <Column title="Sequrl" dataIndex="sequrl" key="sequrl" hidden={!checkedListSequencing.includes("sequrl")} {...getColumnSearchProps("sequrl")}/>
    <Column title="Strain collection number" dataIndex="strccol" key="strccol" hidden={!checkedListSequencing.includes("strccol")} {...getColumnSearchProps("strccol")}/>
    </ColumnGroup>
    
      </Table>
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