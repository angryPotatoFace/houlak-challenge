import { Field, Form } from 'formik';
import { Handler_Error } from '../../../constants/form'

function FormFields(props: Handler_Error) {
    return ( 
    <Form className=''>
        <div className='pt-3'>
            <Field  className='p-2 rounded artistField text-center' 
                    id="firstName" 
                    name="artist" 
                    placeholder="Insert your favorite Artist" 
            />
            <div>
                {   props.errors.artist && 
                    props.touched.artist && 
                    <div className='alert alert-danger error-form pt-2 pb-4 error-form'>{ props.errors.artist }</div> 
                }
            </div>
        </div>
        <button className='btn btn-success mt-3' type="submit">Search</button>
    </Form>
    );
}




export default FormFields;