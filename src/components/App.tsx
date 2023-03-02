/* eslint-disable jsx-a11y/alt-text */
import { useState } from 'react';
import './App.css'
import { Formik, Field, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import { getArtist, getAlbums } from '../services/api';

function App() {

  interface Values {
    artist: string;
  }

  const SignupSchema = Yup.object().shape({
    artist: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
  });

  const [artista , setArtista ] = useState({ id: '' });
  const [albums, setAlbums] = useState([]); 

  return (
    <div className="App container mt-3 badge bg-secondary">

      {/* ----------------------- HEADER ----------------------------------- */}
      <header className="App-header p-5 text-white container">
            <h1 className='fw-bold' > Houlak - Challenge </h1>
            <p className='fs-6 pt-3' > This is applicaction that connect with the api of Spotify and you can have information about your favorites artists.</p>
      </header>

      {/* --------------------------- FORM ------------------------- */}


      <div>
      <h3 className='fw-bold'> Spotify API </h3>
      <p className='mt-3'>
        With this API You can see the discography about your favorites artists
      </p>
      <Formik
        initialValues={ { artist: ''} }
        validationSchema ={ SignupSchema }
        onSubmit={ async ( values: Values, )=> {
            const data = await getArtist( values.artist );
            console.log( data );
            const info = await getAlbums( data.id, 50);
            setArtista( data );
            setAlbums ( info );
          }
        }

      >
      { ( { errors, touched } ) => (
         <Form className=''>
          
         <div className='pt-3'>
           <Field className='p-2 rounded artistField text-center' 
                  id="firstName" 
                  name="artist" 
                  placeholder="Insert your favorite Artist" 
            />
           { errors.artist && touched.artist ? 
               <div className='text-danger pt-2 pb-4'>{errors.artist}</div> 
             : 
               null
           }
         </div>

         <button className='btn btn-success mt-3' type="submit">Search</button>
       </Form>
      )}
      
      </Formik>
    </div>
  
    {/* --------------------------- ARTISTA ------------------------- */}
          

    <div className='mt-5'>
          <h3> Lista </h3>
          {
            albums.length ? 
            albums.map( (alb: any, index) => {
                if( alb.album_group === 'album' ){
                  return(
                    <div className='albums' key={ index }> 
                    
                      <div className='d-flex flex-column bd-highlight mb-3 justify-content-center '>
    
                          <div className='p-2 pt-4 container'>
                            <a className='text' href={ alb.external_urls.spotify } target='_blank' rel="noreferrer" >
                              <img src={ alb.images[1].url } height={ alb.images[1].height} width={ alb.images[1].width} />
                            </a>
                          </div>
    
                          <div className='p-2 container'>
                            <h5 className='fw-bold responsive-font-example' >{ alb.name}</h5>
                            <p className='album-description'>
                              <span className='text-capitalize'> { alb.type } </span>
                                 •
                              <span className='text-capitalize' >  { moment( alb.release_date ).format(" MMMM YYYY ")  } </span>
                                •
                              <span className='text-capitalize'> { alb.total_tracks } Tracks </span>
                            </p>
                          </div>
                   
                      </div>
    
                    </div>
                  )
                }
            })
            :
            <div> Todavia no hay artistas </div>
          }
    </div> 

    {/* --------------------------- FOOTER ------------------------- */}
    <footer className='pb-3 pt-5'> 
      <div className='badge bg-dark bg-secondary'>
        <span className='p-1 text-uppercase'> developed by <span className='fw-bold text-light'>bruno daniel bonino</span> </span> 
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" height='1rem' width='1rem' >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
    </footer>

    </div>
  );
}

export default App;
