import React from 'react';

import { Button, Modal } from 'antd';
import { consoleLogger } from '../utils/logger';

interface GroupProps {
    opened: boolean
    onClose: () => any
  }


const Group = ({opened, onClose}: GroupProps) => {
    consoleLogger('onChange', onClose);
    return (
        <Modal
        title="Groups"
        centered
        open={opened}
        width={1000}
        styles={{body: {height: 630}}}
        onOk={() => onClose && onClose()}
        onCancel={() => onClose && onClose()}
        footer={[
          <Button key="Cancel" onClick={() => onClose && onClose()}>
            Close
          </Button>
        ]}
      >
       
       <h3> Pending invitations</h3>

       <h3> Accepted groups </h3>
      
      </Modal>
    )
}
export default Group