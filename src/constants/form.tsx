import * as Yup from 'yup'; 
import { FormikErrors, FormikTouched } from 'formik';

// ------------------- SCHEMAS ------------------

export const SignupSchema = Yup.object().shape({
    artist: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Artist is Required'),
});


// ------------------ VALUES ------------------

export const initialValues = { 
    artist: ''
};



// ---------------- INTERFACE ------------------

export interface Values {
    artist: string;
}

export interface Api_Responde {
    album_group: string
    album_type: string
    artists: []
    external_urls: object
    href: string
    id: string
    images: []
    name: string
    release_date: string
    release_date_precision: string
    total_tracks: string
    type: string
    uri: string
}

export interface Handler_Error {
    errors: FormikErrors<{
        artist: string;
    }>

    touched: FormikTouched<{
    artist: string;
    }>  
}