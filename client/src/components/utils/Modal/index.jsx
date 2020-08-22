import React from 'react';
import { Header, Modal } from 'semantic-ui-react';

const MyModal = ({ TriggerComponent, headerText, headerIcon, children, cta, open, setOpen }) => {

  return (
    <Modal
      closeIcon
      open={open}
      dimmer="blurring"
      trigger={TriggerComponent}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Header icon={headerIcon} content={headerText} as="h1" />
      <Modal.Content>
        {children}
      </Modal.Content>
      <Modal.Actions>
        {cta}
      </Modal.Actions>
    </Modal>
  );
};

export default MyModal;
