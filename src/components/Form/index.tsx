import { useState } from 'react';
import { Formik } from 'formik';
import { getArtist, getAlbums, getIdsAlbumsByPopularity } from '../../services/api';
import ListDiscography from './List';
import FormFields from './Fields';
import { SignupSchema, initialValues, Values, Api_Responde } from '../../constants/form';

function FormArtist() {

    const MAX_ALBUMS = 50;

    const [albums, setAlbums] = useState([]); 
    const [haveAlbum, setHaveAlbum] = useState(false); 
    
    const onSubmit = async ( values: Values ) => {

        const dataArtist = await getArtist( values.artist );
        const albums = await getAlbums( dataArtist.id, MAX_ALBUMS);
        const ids = albums.map( ( a: Api_Responde) =>  a.id );
        const popularAlbums = await getIdsAlbumsByPopularity(ids);

        setHaveAlbum( !popularAlbums.length );
        setAlbums ( popularAlbums );
     }

    return (
        <>
            <Formik
                initialValues={ initialValues  }
                validationSchema ={ SignupSchema }
                onSubmit={ onSubmit }
            >
            { 
                ( { errors, touched } ) => ( < FormFields errors={errors } touched={touched}  /> )
            }
      
            </Formik>
            
            <ListDiscography haveAlbum={haveAlbum} albums={albums}   />
        </>
     );
}

export default FormArtist;