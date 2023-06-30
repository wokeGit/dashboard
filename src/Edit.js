import Panel from './components/Panel';
import EditCreateForm from './components/EditCreateForm';

export const Edit = () => {
    return (<>
        <Panel title="Edit Form" content={<EditCreateForm />} />
    </>)
}

export default Edit;