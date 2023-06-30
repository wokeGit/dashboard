import React from 'react';
import Panel from './components/Panel';
import EditCreateForm from './components/EditCreateForm';

export const AddNew = () => {
  return (<>
    <Panel title="Add New Form" content={<EditCreateForm />} />
   </>)
}

export default AddNew;